import type { Metadata } from "next";
import { Patrick_Hand, Playfair_Display } from "next/font/google";
import "./globals.css";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "For you",
  description: "A little book for us",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${patrickHand.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}