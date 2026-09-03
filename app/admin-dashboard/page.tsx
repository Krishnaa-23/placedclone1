'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'LOGOUT' || event.data?.type === 'LOGOUT') {
        router.push('/login')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [router])

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden">
      <iframe
        src="/admin-dashboard.html"
        className="w-full h-full border-none"
        title="PLACED Admin Governance Dashboard"
      />
    </div>
  )
}
