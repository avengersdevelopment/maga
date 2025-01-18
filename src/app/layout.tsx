import Aos from "@/components/aos";
import Providers from "@/components/providers";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const fontFutura = localFont({
  src: [
    {
      path: "../../public/fonts/futura.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/futura.ttf",
      weight: "700",
    },
  ],
  variable: "--font-futura",
});

const fontFuturaBold = localFont({
  src: [
    {
      path: "../../public/fonts/futura-bold.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/futura-bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-futura-bold",
});

export const metadata: Metadata = {
  title: "TrumpLive",
  description: "The voice of the 47th President. Watch my Livestream! 🇺🇸",
  openGraph: {
    title: "TrumpLive",
    description: "The voice of the 47th President. Watch my Livestream! 🇺🇸",
    url: "/",
    images: [
      {
        url: "/banner.png",
        alt: "App Preview",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: configs } = await supabase.from("configs").select();

  return (
    <>
      <Aos />
      <html lang="en" className="relative">
        <body
          className={twMerge(
            fontFutura.variable,
            fontFuturaBold.variable,
            "font-futura bg-[#061936] antialiased",
          )}
        >
          <Providers config={configs?.[0] || null}>{children}</Providers>
        </body>
      </html>
    </>
  );
}
