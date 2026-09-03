'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#052742] text-white flex flex-col items-center justify-center p-6 font-sans relative">
      <div className="text-center space-y-4 max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
          <ShieldAlert className="w-7 h-7 text-[#052742]" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Admin Governance Updating</h1>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          The Admin Governance Dashboard has been removed and is currently being updated with a new version.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#052742] font-black text-xs uppercase tracking-wider transition-all cursor-pointer mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login Portal</span>
        </Link>
      </div>
    </div>
  )
}
