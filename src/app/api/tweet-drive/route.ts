import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

let cachedData: Record<string, any> = {};
let lastFetchTime: Record<string, number> = {};

const CACHE_DURATION = 20 * 1000;
const DEBUG_INTERVAL = 1000;

let countdownIntervals: Record<string, NodeJS.Timeout | null> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId") || "";

  const now = Date.now();

  const remainingTime = Math.max(
    CACHE_DURATION - (now - (lastFetchTime[fileId] || 0)),
    0,
  );

  if (cachedData[fileId] && remainingTime > 0) {
    if (!countdownIntervals[fileId]) {
      countdownIntervals[fileId] = setInterval(() => {
        const timeLeft = Math.max(
          CACHE_DURATION - (Date.now() - (lastFetchTime[fileId] || 0)),
          0,
        );

        if (timeLeft <= 0 && countdownIntervals[fileId]) {
          clearInterval(countdownIntervals[fileId]!);
          countdownIntervals[fileId] = null;
        }
      }, DEBUG_INTERVAL);
    }
    return NextResponse.json(cachedData[fileId], { status: 200 });
  }

  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    cachedData[fileId] = response.data;
    lastFetchTime[fileId] = now;

    if (countdownIntervals[fileId]) {
      clearInterval(countdownIntervals[fileId]!);
      countdownIntervals[fileId] = null;
    }

    countdownIntervals[fileId] = setInterval(() => {
      const timeLeft = Math.max(
        CACHE_DURATION - (Date.now() - (lastFetchTime[fileId] || 0)),
        0,
      );

      if (timeLeft <= 0 && countdownIntervals[fileId]) {
        clearInterval(countdownIntervals[fileId]!);
        countdownIntervals[fileId] = null;
      }
    }, DEBUG_INTERVAL);

    return NextResponse.json(cachedData[fileId], { status: 200 });
  } catch (error: any) {
    console.error(
      `Failed to fetch data for file ${fileId}:`,
      error.response?.data || error.message,
    );
    return NextResponse.json(
      {
        error: `Failed to fetch data: ${
          error.response?.data?.error || error.message || "Unknown error"
        }`,
      },
      { status: error.response?.status || 500 },
    );
  }
}
