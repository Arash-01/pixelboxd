import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import YouDied from "../components/YouDied";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pixelboxd — Track games you've played.",
  description: 'The social platform for gamers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <YouDied />
        {children}
      </body>
    </html>
  );
}