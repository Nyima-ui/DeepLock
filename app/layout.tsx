import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/context/ToastContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepLock",
  description:
    "DeepLock — Lock your distractions away. Store app passwords behind a time-locked vault you can't break into early, no matter how tempted you are.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
