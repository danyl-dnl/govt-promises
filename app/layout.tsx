import type { Metadata } from "next"
import { Inter, Lora, Noto_Sans_Malayalam } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

import AuthProvider from "@/components/auth/AuthProvider"

export const metadata: Metadata = {
  title: "Vaaku Paalicho | UDF Promise Tracker",
  description: "An independent citizen-maintained ledger tracking the promises made by the UDF in Kerala.",
  openGraph: {
    title: "Vaaku Paalicho",
    description: "Independent citizen-maintained ledger tracking UDF election promises.",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${notoSansMalayalam.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground font-ui">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow bg-slate-50/30">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
