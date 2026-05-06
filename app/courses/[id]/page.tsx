'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
// Import from the data file
import { COURSES, Course } from '../../data'

export default function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params properly for Next.js App Router
  const { id } = React.use(params)

  // Find the exact course data based on the URL id
  const course = COURSES.find((c: Course) => c.id === id)

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans text-slate-900">
         <h1 className="text-3xl font-black mb-4">Course not found.</h1>
         <Link href="/courses" className="text-teal-500 font-bold underline hover:text-slate-900">Go back to all courses</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-32">
      {/* Navigation */}
      <nav className="px-8 py-6 bg-transparent absolute top-0 left-0 w-full z-50">
        <Link href="/courses" className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full font-bold text-sm shadow-xl hover:bg-teal-500 hover:text-white transition-all">
          ← Back to Courses
        </Link>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full flex items-end pb-16 px-8">
        <Image 
           src={course.imagePath} 
           alt={course.title} 
           fill 
           sizes="100vw"
           className="object-cover" 
           priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 mb-4">
            <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">{course.level}</span>
            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">{course.duration}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white leading-tight mb-4 max-w-4xl">
            {course.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-300 max-w-2xl font-medium">
            {course.desc}
          </motion.p>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-16">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">What you will learn</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((module) => (
              <div key={module} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-teal-500 shadow-sm shrink-0">
                  {module}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Module Overview {module}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">Detailed breakdown of the technologies, workflows, and production practices taught in this phase of the program. Expect intense hands-on building.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="bg-slate-900 text-white rounded-[32px] p-8 h-fit sticky top-8 shadow-2xl">
          <h3 className="text-2xl font-black mb-6">Technologies</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {course.tags.map((tag: string) => (
              <span key={tag} className="bg-white/10 px-4 py-2 rounded-lg text-sm font-bold text-teal-400">{tag}</span>
            ))}
          </div>
          <hr className="border-white/10 mb-8" />
          <div className="space-y-4 mb-8 text-sm font-medium text-slate-300">
             <p className="flex justify-between"><span>Format:</span> <span className="text-white font-bold">100% Online</span></p>
             <p className="flex justify-between"><span>Commitment:</span> <span className="text-white font-bold">15 hrs/week</span></p>
             <p className="flex justify-between"><span>Mentorship:</span> <span className="text-white font-bold">1-on-1 Included</span></p>
          </div>
          <button className="w-full bg-teal-500 text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg shadow-teal-500/30">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  )
}