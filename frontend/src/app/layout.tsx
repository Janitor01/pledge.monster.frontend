'use client'

import { Metadata, Viewport } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PropsWithChildren, useEffect, useState } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import themedark from 'public/icons/themedark.svg'
import themelight from 'public/icons/themelight.svg'

import { ToastConfig } from '@/app/toast-config'
import { TooltipProvider } from '@/components/ui/tooltip'
import { env } from '@/config/environment'
import { cn } from '@/utils/cn'

import { HomeTopBar } from './components/home-top-bar'
import './globals.css'
import ClientProviders from './providers'

const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

const metadata: Metadata = {
  title: 'The Monster Pledge',
  description: 'Client for the First Crowdfund dApp on AlephZero',
  metadataBase: new URL(env.url),
  robots: env.isProduction ? 'all' : 'noindex,nofollow',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: env.url,
    siteName: 'pledge.monster',
    images: [
      {
        url: '/images/inkathon-og-banner.jpg',
        width: 1280,
        height: 640,
      },
    ],
  },
  twitter: {
    site: '@pledge.monster',
    creator: '@pledge.monster',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.body.className = savedTheme
  }, [])

  const themeIcon = theme === 'light' ? themedark : themelight
  const themeLabel = theme === 'light' ? 'Dark' : 'Light'

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.className = newTheme
  }

  return (
    <html lang="en" className={cn('dark', GeistSans.variable, GeistMono.variable)}>
      <Head>
        <title>The Monster Pledge</title>
      </Head>
      <body>
        <ClientProviders>
          <HomeTopBar />
          <TooltipProvider>{children}</TooltipProvider>
          <ToastConfig />
        </ClientProviders>

        {!!env.isProduction && <Analytics />}

        <p className="mb-4 mt-4 text-center font-mono text-xs text-gray-600">
          pledge.monster <br />
          decentralized fundraising
        </p>

        <div className="flex items-center justify-center">
          <button onClick={toggleTheme} className="theme-toggle">
            <Image
              src={themeIcon}
              priority
              height={18}
              width={18}
              alt={`${themeLabel} Theme Icon`}
            />
          </button>
        </div>
      </body>
    </html>
  )
}
