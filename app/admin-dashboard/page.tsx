'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'LOGOUT' || event.data?.type === 'LOGOUT') {
        router.push('/login')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [router])

  useEffect(() => {
    // Safety fallback: ensure loader fades out smoothly even if onLoad triggered early
    const timer = setTimeout(() => setIframeLoaded(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen bg-[#052742] overflow-hidden relative">
      {/* Seamless transition loader: matches login page background (#052742) to eliminate white/black flash */}
      <div
        className={"absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#052742] transition-opacity duration-300 pointer-events-none " + (iframeLoaded ? "opacity-0" : "opacity-100")}
      >
        <div className="w-12 h-12 rounded-2xl bg-white p-2 shadow-2xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/20">
          <Image
            src="/placed-official-logo.jpg"
            alt="PLACED Logo"
            fill
            className="object-contain p-1"
            priority
          />
        </div>
        <div className="flex items-center gap-2.5 text-[#00A79D] font-bold text-xs uppercase tracking-widest">
          <div className="w-3.5 h-3.5 border-2 border-[#00A79D] border-t-transparent rounded-full animate-spin"></div>
          <span>Launching Admin Intelligence...</span>
        </div>
      </div>

      <iframe
        src="/admin-dashboard.html"
        className="w-full h-full border-none"
        title="PLACED Admin Governance Dashboard"
        onLoad={() => setIframeLoaded(true)}
      />
    </div>
  )
}
