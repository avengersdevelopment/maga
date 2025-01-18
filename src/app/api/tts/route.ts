// app/api/tts/route.ts
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Types
interface MessageResponse {
  text: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    message: string;
    originalAudioUrl: string;
  };
  error?: string;
}

// Store session cookie (Note: will reset on server restart)
let sessionCookie: string | null = null;

// Function to authenticate with FakeYou
async function authenticate(): Promise<boolean> {
  try {
    const response = await axios.post('https://api.fakeyou.com/v1/login', {
      username_or_email: process.env.FAKEYOU_USERNAME,
      password: process.env.FAKEYOU_PASSWORD
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.success) {
      throw new Error('Authentication failed');
    }

    // Extract and store session cookie
    const cookie = response.headers['set-cookie']?.[0].split(';')[0];
    if (!cookie) {
      throw new Error('No cookie received');
    }
    sessionCookie = cookie;
    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

// Function to make TTS request
async function makeTTSRequest(text: string): Promise<string> {
  try {
    // Ensure we're authenticated
    if (!sessionCookie) {
      await authenticate();
    }

    // Step 1: Make inference request
    const inferenceResponse = await axios.post('https://api.fakeyou.com/tts/inference', {
      uuid_idempotency_token: uuidv4(),
      tts_model_token: process.env.FAKEYOU_MODEL_TOKEN,
      inference_text: text
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie
      }
    });

    if (!inferenceResponse.data.success) {
      throw new Error('TTS inference request failed');
    }

    const jobToken = inferenceResponse.data.inference_job_token;
    
    // Step 2: Poll for completion
    let attempts = 0;
    const maxAttempts = 60; // 30 seconds with 500ms interval
    
    while (attempts < maxAttempts) {
      const pollResponse = await axios.get(`https://api.fakeyou.com/tts/job/${jobToken}`, {
        headers: {
          'Cookie': sessionCookie
        }
      });

      const status = pollResponse.data.state.status;
      
      if (status === 'complete_success') {
        const audioPath = pollResponse.data.state.maybe_public_bucket_wav_audio_path;
        return `https://cdn-2.fakeyou.com${audioPath}`;
      } else if (status === 'complete_failure' || status === 'dead') {
        throw new Error('TTS generation failed');
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    throw new Error('TTS generation timeout');
  } catch (error) {
    console.error('TTS request error:', error);
    throw error;
  }
}

// Main API handler
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse the request body
    const body = await request.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Message is required'
      }, { status: 400 });
    }

    console.log("Sampe Sini")
    // Step 1: Get response from the message API
    const messageResponse = await axios.post<MessageResponse>(
      "https://flow.soluvion.com/api/v1/prediction/18acbc60-7a2a-47a0-8d3e-4a29e74b25b3",
      {
        question: message
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Step 2: Generate TTS for the response
    const audioUrl = await makeTTSRequest(messageResponse.data.text);

    // Step 3: Return formatted response
    return NextResponse.json({
      success: true,
      data: {
        message: messageResponse.data.text,
        originalAudioUrl: audioUrl
      }
    }, { status: 200 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}