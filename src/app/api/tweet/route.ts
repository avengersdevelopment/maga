import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

let cachedData: Record<string, any> = {};
let lastFetchTime: Record<string, number> = {};

const CACHE_DURATION = 15 * 60 * 1000;
const DEBUG_INTERVAL = 1000;

let countdownIntervals: Record<string, NodeJS.Timeout | null> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

  const now = Date.now();

  const remainingTime = Math.max(
    CACHE_DURATION - (now - (lastFetchTime[userId] || 0)),
    0,
  );

  if (cachedData[userId] && remainingTime > 0) {
    if (!countdownIntervals[userId]) {
      countdownIntervals[userId] = setInterval(() => {
        const timeLeft = Math.max(
          CACHE_DURATION - (Date.now() - (lastFetchTime[userId] || 0)),
          0,
        );

        if (timeLeft <= 0 && countdownIntervals[userId]) {
          clearInterval(countdownIntervals[userId]!);
          countdownIntervals[userId] = null;
        }
      }, DEBUG_INTERVAL);
    }
    return NextResponse.json(cachedData[userId], { status: 200 });
  }

  const url = `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=text&user.fields=username`;

  if (!process.env.NEXT_PUBLIC_X_TOKEN) {
    return NextResponse.json(
      { error: "Twitter Bearer Token not set." },
      { status: 500 },
    );
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_X_TOKEN}`,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    cachedData[userId] = response.data;
    lastFetchTime[userId] = now;

    if (countdownIntervals[userId]) {
      clearInterval(countdownIntervals[userId]!);
      countdownIntervals[userId] = null;
    }

    countdownIntervals[userId] = setInterval(() => {
      const timeLeft = Math.max(
        CACHE_DURATION - (Date.now() - (lastFetchTime[userId] || 0)),
        0,
      );
      
      if (timeLeft <= 0 && countdownIntervals[userId]) {
        clearInterval(countdownIntervals[userId]!);
        countdownIntervals[userId] = null;
      }
    }, DEBUG_INTERVAL);

    return NextResponse.json(cachedData[userId], { status: 200 });
  } catch (error: any) {
    console.error(
      `Failed to fetch tweets for user ${userId}:`,
      error.response?.data || error.message,
    );
    return NextResponse.json(
      {
        error: `Failed to fetch tweets: ${
          error.response?.data?.error || error.message || "Unknown error"
        }`,
      },
      { status: error.response?.status || 500 },
    );
  }
}
