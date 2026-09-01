'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function StudentDashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden relative">
      {/* Logout Button placed cleanly in the top header row right near the notification & settings icons */}
      <button
        onClick={handleLogout}
        className="fixed top-3 right-44 sm:right-48 z-50 bg-[#052742] hover:bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-500 shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        title="Log Out of Student Session"
      >
        <LogOut className="w-3.5 h-3.5 text-rose-400 group-hover:text-white transition-colors" />
        <span>Log Out</span>
      </button>

      {/* Student Dashboard Iframe */}
      <iframe
        src="https://placed-student-dashboard.vercel.app/"
        className="w-full h-full border-none"
        title="PLACED Student Dashboard"
      />
    </div>
  )
}
