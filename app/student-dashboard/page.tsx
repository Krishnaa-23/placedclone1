'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default function StudentDashboardPage() {
  return (
    <div className="w-full h-screen flex flex-col bg-slate-950 overflow-hidden">
      {/* Top Bar Banner for Main Site Integration */}
      <div className="w-full bg-[#052742] text-white px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="flex items-center gap-1.5 font-bold text-slate-300 hover:text-[#00A79D] transition-colors bg-white/10 px-3 py-1 rounded-lg border border-white/15"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
          <span className="font-extrabold text-white hidden sm:inline-block">
            PLACED <span className="text-[#00A79D]">Student Career Portal</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Kavya's Live Dashboard Connected
          </span>
          <a
            href="https://placed-student-dashboard.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-[#00A79D] hover:underline"
          >
            <span>Open Standalone</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Embed Kavya's Live Student Dashboard */}
      <div className="flex-1 w-full h-full relative">
        <iframe
          src="https://placed-student-dashboard.vercel.app/"
          className="w-full h-full border-none shadow-inner"
          title="PLACED Student Dashboard"
        />
      </div>
    </div>
  )
}
