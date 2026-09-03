'use client'

import React from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowLeft } from 'lucide-react'

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#052742] text-white flex flex-col items-center justify-center p-6 font-sans relative">
      <div className="text-center space-y-4 max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-[#00A79D] flex items-center justify-center mx-auto shadow-lg shadow-[#00A79D]/30">
          <GraduationCap className="w-7 h-7 text-[#052742]" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Student Portal Updating</h1>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          The Student Dashboard is currently being updated with the latest repository changes.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A79D] hover:bg-[#00D2C4] text-[#052742] font-black text-xs uppercase tracking-wider transition-all cursor-pointer mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login Portal</span>
        </Link>
      </div>
    </div>
  )
}
