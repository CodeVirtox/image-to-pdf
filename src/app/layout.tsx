import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Image to PDF Converter - PDFGenie',
  description: 'Convert JPG and PNG images to PDF instantly, securely, and for free.',
  keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'online converter', 'free pdf tool'],
  robots: 'index, follow',
  openGraph: {
    title: 'Image to PDF Converter - PDFGenie',
    description: 'Convert images to PDF quickly and easily with PDFGenie.',
    url: 'https://your-domain.com',
    siteName: 'PDFGenie',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PDFGenie Image to PDF',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
