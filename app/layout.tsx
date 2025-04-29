import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";


const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lakshya",
  description: "Interview prep made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
      className={`${monaSans.className} antialiased`}
      >
      {children}
      </body>
    </html>
  );
}
