'use client'

import React from 'react'

export default function StudentDashboardPage() {
  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden">
      <iframe
        src="https://placed-student-dashboard.vercel.app/"
        className="w-full h-full border-none"
        title="PLACED Student Dashboard"
      />
    </div>
  )
}
