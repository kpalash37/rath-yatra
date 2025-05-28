import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rath Yatra 2025 - Festival of Divine Chariots",
  icons: {
    icon: "🛕",},
  description:
    "Experience the sacred journey of Lord Jagannath, Balabhadra, and Subhadra in the most magnificent festival of chariots. Join millions of devotees in this divine celebration.",
  keywords: "Rath Yatra, Jagannath, Puri, Festival, Chariots, Hindu Festival, Devotion",
    generator: 'techexpan.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
