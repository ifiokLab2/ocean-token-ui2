import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
//import { OceanProvider } from "./context/OceanContext";
import { OceanProvider } from "./context/OceanContext"; // Adjust path as needed
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 'Crypto Wallet Dashboard',
  description: 'Manage your tokens, transfers, and block rewards',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      > 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Wrap everything in the OceanProvider */}
          <OceanProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            {/* Added Toaster here so notifications work globally */}
            <Toaster position="bottom-right" />
          </OceanProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}