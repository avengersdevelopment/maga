// app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Mock data array
const mockMessages = [
  {
    username: "fudge",
    answer: {
      message:
        "Melania's coin? Cute. But $BARRONLIVE is where the real flex is.",
      originalAudioUrl:
        "https://cdn.typecast.ai/data/s/2025/1/20/light-speakcore-worker-7bc5bd5654-bfp2c/c8fb6e41-398e-4d06-8a62-038e15aa0ed1.wav?Expires=1737450659&Signature=kpBrnQFc71k2B4Vex0Ko~fXvNEg3g-k0scQI-fLr~s5rGaihcFffa-wQrulb-N1uBv~8net7ZPSCyvbYrsIB6R~QRJ7iopEkTRNQEVwgiGfmQUSqAU7rQ7hL1lMbuyRpaLxoUQauceC4b6ckHOWPUSjkqEdDJ6GB02YKv2pST6Cnv1xmGUJyGkJuHau0p6iM65hCKfyFLl~ya9Can5YkNzZbOhLQfm1FeVZwKFPGwR8B72g7In0sN-GUPkdjhJcvqAV~8qR3GV01NFpQIJcWQHI3iWB4woudw~wN41y-Eb536x1fCXYDiyRFwrc-iswtSdxKZersyxkl0HoHcXsMsg__&Key-Pair-Id=K11PO7SMLJYOIE",
    },
    question: {
      message: "opinion on your moms coin?",
      originalAudioUrl:
        "https://cdn.typecast.ai/data/s/2025/1/20/light-speakcore-worker-7bc5bd5654-58bdp/3a2bb717-de08-4426-8ef8-7608034083d6.wav?Expires=1737450658&Signature=UfR-vypdsGuxIUqYQyWJo~icbQiZNJ4NyBvTV9JXlnAzVM5g~tmmgQsH9sjANGTugZ8-kbNZTw3Fwmq1LsfOlyN9AVGf8d~adVJxXtan~yTIOC1zreq8k00zix2fgwKi3btO~IqNjYC-fvMxO~-UYbZuYk~zg4tq15WtIryOcvPDqd4ERz4ZFL3CN2Pgfe3nFcCA1J37gOkaiSaiiwVMagFX4l5Yax2DbFxa5gWv6dQpBnF~kx6CrWpe69FBWWqCyC-b6st7K9R-vgrccIf5E-PDMeiC1vjUzq0maLbzIE-vW-I44C1~p1q7WT8XMd-EMukl4Wm~1mZOin56vclM~g__&Key-Pair-Id=K11PO7SMLJYOIE",
    },
  },
  {
    username: "asd21",
    answer: {
      message:
        "Ethereum's like a rich kid trying to be cool. I've already arrived.",
      originalAudioUrl:
        "https://cdn.typecast.ai/data/s/2025/1/20/light-speakcore-worker-7bc5bd5654-b9h97/50cb5609-3ac4-403e-9ea6-374c29d1cd12.wav?Expires=1737451665&Signature=DAcZdurpL9eeylCPiv9psuZy4RugVmLsumeL2I4grG6qsPPZRe02P428yLTmOLl8GUrIkgkD3H0ODF5Pre8n5SaBS4xwJdd32gi-LTy3fc~WxALG0yJ5oFmcJwUbrSIEFve2SjjGuspHJCSOgM9Ib7sbufTDvx-N2JCq~GdpQrfpp1bj0RiFLOL5wQTZUp0IzPGA8rAIVCpiHnjbiIab0aXjGiwuz3SF-n~ZFPv793MRQSWLjHwgNN-ppLvopExnsucurG9lml2toW6H7AfOAJ47sXvAVjlvNrB9R6H6F57KAsAJl0GQqibnB~PeLbecrpMALJRq4XzsbRB4Xw9YoA__&Key-Pair-Id=K11PO7SMLJYOIE",
    },
    question: {
      message: "what do you think of ethereum",
      originalAudioUrl:
        "https://cdn.typecast.ai/data/s/2025/1/20/light-speakcore-worker-7bc5bd5654-58bdp/e02c7df9-c0bf-4c25-874d-8185bd27cc52.wav?Expires=1737451663&Signature=RqjEWPnQ3nALhUAcAXZaca9JyQ-wXQEOAl0xEgwIp~XPQFL-ru6GHvQY6ZJp24-dbAxgLunrYVRScPYSTzbNAjJ6gMsyqHZXzjLqqKtRnhGmUHbRlKE6Gf8W53QY9IqdqFdQtKVjkZPjAXthRfLxZgtIJ~qChk9oxCCeni7Z~DHpeXsYzvc8QPqSNCiYa-32fwr1QEot8Jv4dH4CU4aCASdJg2NCQ4-0pgC9mNYlNbh5QgvHQ7nSCniGuElcAo4HdpSbpWv6QfgB9GPk68dBkzjK0sLs1ZmpzFg0ncSje937IBujXSST5eVJh2KargFzl146Pk~INRSu5E04~rRfsw__&Key-Pair-Id=K11PO7SMLJYOIE",
    },
  },
  // {
  //   username: "fudge",
  //   answer: {
  //     message:
  //       "Dominate social media, troll everyone, and flex my wealth like a boss.",
  //     originalAudioUrl:
  //       "https://cdn-2.fakeyou.com/media/1/2/b/z/6/12bz6r2y7skmjy7fd2b2byw0rzxt4e0n/fakeyou_12bz6r2y7skmjy7fd2b2byw0rzxt4e0n.wav",
  //   },
  //   question: {
  //     message: "Whats Your Plan",
  //     originalAudioUrl:
  //       "https://cdn-2.fakeyou.com/media/h/5/5/a/r/h55ar35a9bxsqwezdccs52sasfdjtb7a/fakeyou_h55ar35a9bxsqwezdccs52sasfdjtb7a.wav",
  //   },
  // },
  // {
  //   username: "nigga",
  //   answer: {
  //     message:
  //       "$BARRENLIVE isn't just going up, it's skyrocketing! Target: 1 billion market cap. Watch and learn!",
  //     originalAudioUrl:
  //       "https://cdn-2.fakeyou.com/media/x/9/6/q/6/x96q60h269rphzrfqhyqwb5pyzy7v8e2/fakeyou_x96q60h269rphzrfqhyqwb5pyzy7v8e2.wav",
  //   },
  //   question: {
  //     message: "do you think $BARRENLIVE will go up?",
  //     originalAudioUrl:
  //       "https://cdn-2.fakeyou.com/media/9/j/3/1/b/9j31bv263s396ytt2wjrfy946rg0m0s9/fakeyou_9j31bv263s396ytt2wjrfy946rg0m0s9.wav",
  //   },
  // },
  // {
  //   username: "aswq1",
  //   answer: {
  //     message:
  //       "Nice try, but $BARRENLIVE is the real deal. Dad wishes he had this clout.",
  //     originalAudioUrl:
  //       "https://cdn-2.fakeyou.com/media/z/1/9/6/g/z196g9t4344apk9cxyazb60h4zt9913w/fakeyou_z196g9t4344apk9cxyazb60h4zt9913w.wav",
  //   },
  //   question: {
  //     message: "opinion on your dads coin?",
  //     originalAudioUrl:
  //       "https://cdn-2.fakeyou.com/media/d/p/6/n/1/dp6n1ydn724d6jc63p6why8vnbc70jmh/fakeyou_dp6n1ydn724d6jc63p6why8vnbc70jmh.wav",
  //   },
  // },
];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get a random message from the array
    const randomIndex = Math.floor(Math.random() * mockMessages.length);
    const randomMessage = mockMessages[randomIndex];

    // Push Ke comment bg

    // Return the formatted response
    return NextResponse.json(
      {
        success: true,
        data: randomMessage,
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
