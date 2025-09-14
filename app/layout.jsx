import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "../contexts/auth-context"
import { UploadProvider } from "../components/upload/upload-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata = {
  title: "ContractHub - Professional Contract Management",
  description: "AI-powered contract management dashboard for modern businesses",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <UploadProvider>{children}</UploadProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
