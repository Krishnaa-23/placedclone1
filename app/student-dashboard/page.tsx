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
      {/* Log Out button placed cleanly to the left of the notification bell in the student dashboard top header */}
      <button
        onClick={handleLogout}
        className="fixed top-3.5 right-[205px] sm:right-[220px] z-50 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-300 hover:border-rose-300 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        title="Log Out of Student Session"
      >
        <LogOut className="w-3.5 h-3.5 text-rose-500" />
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
