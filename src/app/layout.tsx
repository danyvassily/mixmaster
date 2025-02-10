import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RootLayoutClient } from "@/components/layout/RootLayoutClient";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cocktail App',
  description: 'Découvrez les meilleurs cocktails et bars à Paris',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
