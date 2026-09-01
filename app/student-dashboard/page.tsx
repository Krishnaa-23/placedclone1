'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function StudentDashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden relative">
      {/* Log Out button styled identically to the Admin Log Out button image */}
      <button
        onClick={handleLogout}
        className="fixed top-3.5 right-[255px] xl:right-[265px] z-50 bg-[#FEF2F2] hover:bg-rose-100 text-[#EF4444] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-rose-300 shadow-sm transition-all cursor-pointer active:scale-95"
        title="Log Out of Student Session"
      >
        Log Out
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
