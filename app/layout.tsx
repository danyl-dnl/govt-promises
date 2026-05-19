import type { Metadata } from "next"
import { DM_Sans, Playfair_Display, Noto_Sans_Malayalam } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
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

export const metadata: Metadata = {
  title: "Sarkar Watch · Kerala | UDF Promise Tracker",
  description: "An independent citizen-maintained ledger tracking the promises made by the UDF in Kerala.",
  openGraph: {
    title: "Sarkar Watch · Kerala",
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
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable} ${notoSansMalayalam.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground font-ui">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
