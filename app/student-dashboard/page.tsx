'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, GraduationCap } from 'lucide-react'

export default function StudentDashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="w-full h-screen flex flex-col bg-slate-950 overflow-hidden">
      {/* Sleek Native Header Bar for Student Dashboard */}
      <header className="w-full h-12 bg-[#0B132A] text-white px-5 flex items-center justify-between border-b border-slate-800/80 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#00A79D] flex items-center justify-center text-[#052742] font-black text-sm">
            <GraduationCap className="w-4 h-4 text-[#052742]" />
          </div>
          <span className="font-extrabold text-xs text-white tracking-wider uppercase">
            PLACED <span className="text-[#00D2C4] font-semibold">Student Portal</span>
          </span>
        </div>

        {/* Native Red Log Out Button */}
        <button
          onClick={handleLogout}
          className="bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 hover:border-rose-600 font-bold text-xs px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          title="Log Out of Student Portal"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </header>

      {/* Student Dashboard Content Container */}
      <div className="flex-1 w-full h-full relative">
        <iframe
          src="https://placed-student-dashboard.vercel.app/"
          className="w-full h-full border-none"
          title="PLACED Student Dashboard"
        />
      </div>
    </div>
  )
}
