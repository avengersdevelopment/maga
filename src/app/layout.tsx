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
      path: "../../public/fonts/futura.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/futura.otf",
      weight: "700",
    },
  ],
  variable: "--font-futura",
});

export const metadata: Metadata = {
  title: "TrumpLive",
  description: "Interact With The Sensational Donald Trump",
  openGraph: {
    title: "TrumpLive",
    description: "Interact With The Sensational Donald Trump",
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
            "bg-[#061936] font-futura antialiased",
          )}
        >
          <Providers config={configs?.[0] || null}>{children}</Providers>
        </body>
      </html>
    </>
  );
}
