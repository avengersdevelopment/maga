import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import https from 'https';

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Types
interface MessageResponse {
  text: string;
}

interface AudioData {
  originalAudioUrl: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    message: string;
    answer: AudioData;
    question: AudioData;
  };
  error?: string;
}

// Create a custom axios instance for flow.soluvion.com with SSL verification disabled
const soluvionAxios = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    checkServerIdentity: (hostname, cert) => {
      return undefined; // Bypass hostname verification
    }
  })
});

// Function to make TTS request using Typecast
async function makeTTSRequest(text: string): Promise<string> {
  try {
    // Step 1: Initiate speech synthesis
    const synthesisResponse = await axios.post(
      `${process.env.TYPECAST_API_URL}/speak`,
      {
        text,
        lang: 'auto',
        actor_id: process.env.TYPECAST_ACTOR_ID,
        xapi_hd: true,
        model_version: 'latest'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.TYPECAST_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const speakUrl = synthesisResponse.data.result.speak_v2_url;

    // Step 2: Poll for completion
    let audioUrl = null;
    let attempts = 0;
    const maxAttempts = 120; // 2 minutes with 1-second intervals

    while (attempts < maxAttempts) {
      const statusResponse = await axios.get(speakUrl, {
        headers: { 'Authorization': `Bearer ${process.env.TYPECAST_API_TOKEN}` }
      });
      
      const result = statusResponse.data.result;
      
      if (result.status === 'done') {
        audioUrl = result.audio_download_url;
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      attempts++;
    }

    if (!audioUrl) {
      throw new Error('Speech synthesis timed out');
    }

    return audioUrl;
  } catch (error) {
    console.error("TTS request error:", error);
    throw error;
  }
}

// Main API handler
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse the request body
    const body = await request.json();
    const message = body.message;

    console.log("1", message);

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required",
        },
        { status: 400 },
      );
    }

    console.log("2", message);
    // Step 1: Get response from the message API using the custom axios instance
    const messageResponse = await soluvionAxios.post<MessageResponse>(
      "https://web3-flowise.7b0fqh.easypanel.host/api/v1/prediction/65138135-7c71-4ff8-98bc-b1d7a5c9744e",
      {
        question: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log("3", messageResponse.data.text);

    // Step 2: Generate TTS for both question and answer in parallel
    const [questionAudioUrl, answerAudioUrl] = await Promise.all([
      makeTTSRequest(message),
      makeTTSRequest(messageResponse.data.text),
    ]);

    console.log("4", questionAudioUrl, answerAudioUrl);

    // Step 3: Return formatted response
    return NextResponse.json(
      {
        success: true,
        data: {
          message: messageResponse.data.text,
          answer: {
            originalAudioUrl: answerAudioUrl,
          },
          question: {
            originalAudioUrl: questionAudioUrl,
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}