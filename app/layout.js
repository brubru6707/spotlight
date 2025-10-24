'use client';
import { AuthProvider } from '../context/AuthContext';
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${beVietnamPro.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
