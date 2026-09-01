'use client'

import React from 'react'

export default function AdminDashboardPage() {
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
