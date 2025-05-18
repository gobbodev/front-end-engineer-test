import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getServerSession } from "next-auth";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { SessionProvider } from "../components/providers/SessionProvider";

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
  title: "TigerShot - Tiro Certeiro nas melhores odds!",
  description: "Compare as melhores odds de apostas esportivas do Brasil",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col max-w-7xl mx-auto">
          <div className="flex w-full">
            <Sidebar />
            <div className="w-full max-w-[78%]">
              <SessionProvider session={session}>
                <Header />
                <main className="p-4 flex flex-1 min-h-[calc(100vh-8rem)]">
                  {children}
                </main>
              </SessionProvider>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html >
  );
}
