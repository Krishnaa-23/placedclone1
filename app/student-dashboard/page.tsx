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
      {/* Dedicated Log Out button returning directly to /login portal */}
      <button
        onClick={handleLogout}
        className="fixed top-[15px] right-[300px] xl:right-[320px] z-50 h-[34px] bg-[#FEF2F2] hover:bg-rose-100 text-[#EF4444] font-extrabold text-xs px-3.5 rounded-xl border border-rose-200 shadow-xs transition-all flex items-center justify-center cursor-pointer active:scale-95 leading-none"
        title="Log Out to Login Portal"
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
