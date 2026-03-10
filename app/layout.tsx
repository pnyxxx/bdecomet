import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { withBasePath } from '@/lib/with-base-path'

import './globals.css'

const _spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'BDE Comete - Bureau Des Etudiants',
  description:
    'Decouvrez le BDE Comete, notre equipe, nos objectifs et notre programme. Ensemble, faisons briller cette annee !',
  icons: {
    icon: withBasePath('/images/logo_bde_bg.png'),
    shortcut: withBasePath('/images/logo_bde_bg.png'),
    apple: withBasePath('/images/logo_bde_bg.png'),
  },
}

export const viewport: Viewport = {
  themeColor: '#0e0b1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${_spaceGrotesk.variable} ${_inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
