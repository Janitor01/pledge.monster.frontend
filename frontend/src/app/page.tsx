'use client'

import { useEffect, useState } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import themedark from 'public/icons/themedark.svg'
import themelight from 'public/icons/themelight.svg'
import { toast } from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './globals.css'
import Projects from './pages/projects/page'

export default function HomePage() {
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

  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <div className="relative mt-0">{/* <HomeTopBar /> */}</div>
      <Projects />
    </>
  )
}
