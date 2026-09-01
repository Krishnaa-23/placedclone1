'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden relative">
      {/* Floating Logout Button (Top-Right Overlay) */}
      <button
        onClick={handleLogout}
        className="fixed top-3.5 right-6 z-50 bg-slate-900/90 hover:bg-rose-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-700 hover:border-rose-500 shadow-xl transition-all flex items-center gap-2 cursor-pointer group"
        title="Log Out of Admin Session"
      >
        <LogOut className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors" />
        <span className="hidden sm:inline">Log Out</span>
      </button>

      {/* Admin Governance Dashboard Iframe */}
      <iframe
        src="/admin-dashboard.html"
        className="w-full h-full border-none"
        title="PLACED Admin Governance Dashboard"
      />
    </div>
  )
}
