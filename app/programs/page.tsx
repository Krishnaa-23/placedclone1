'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const ECOSYSTEM_PILLARS = [
  { 
    id: 'corporate-readiness', 
    title: 'Corporate Readiness', 
    duration: 'Placement Focus', 
    level: 'Aptitude & Soft Skills', 
    imagePath: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    desc: 'Preparing students for real placement success. We bring aptitude, communication, and interview preparation into one structured learning process. Focuses on Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Mock Simulations.'
  },
  { 
    id: 'public-exam', 
    title: 'Public Exam Foundation', 
    duration: 'Govt. Exam Focus', 
    level: 'SSC, RRB & Banking', 
    imagePath: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    desc: 'Designed to help students build a strong foundation for highly competitive exams. Introduces students early to the structure and demands of national-level government careers through timed drills and concept-based exercises.'
  },
  { 
    id: 'academic-navigator', 
    title: 'Academic Navigator', 
    duration: 'Higher Studies', 
    level: 'PG & Professional', 
    imagePath: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    desc: 'Not every student takes the same path. We guide students through postgraduate programs, professional courses, and flexible learning pathways so they can make informed academic decisions without confusion.'
  },
]

export default function ProgramsPage() {
  return (
    <div className={`min-h-screen bg-[#031A2D] text-white pt-24 pb-20 px-4 md:px-8 relative overflow-hidden ${inter.className}`}>
      {/* Background Grid */}
      <motion.div animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0DABAE 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <Link href="/" className="text-[#0DABAE] hover:text-white font-bold text-xs md:text-sm mb-6 inline-block transition-colors uppercase tracking-widest">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            The PLACED <span className="text-[#0DABAE]">Ecosystem</span>
          </h1>
          <p className="text-slate-400 max-w-2xl font-medium text-sm md:text-base mx-auto md:mx-0">
            One connected framework supporting students across multiple career options. Move forward based on your goals and progress without fragmented training efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ECOSYSTEM_PILLARS.map((course, idx) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="flex flex-col h-full">
              {/* Wrapped the card in a Link to make it clickable */}
              <Link href={`/programs/${course.id}`} className="group bg-[#052742] rounded-xl text-white relative overflow-hidden h-[300px] flex flex-col justify-end p-8 border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-300 block cursor-pointer">
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                  <Image src={course.imagePath} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#031A2D] via-[#052742]/80 to-transparent z-10"></div>
                <div className="relative z-20">
                  <span className="text-[10px] font-bold text-[#0DABAE] uppercase tracking-widest block mb-2">{course.level}</span>
                  <h3 className="text-2xl font-black mb-2 leading-tight group-hover:text-[#0DABAE] transition-colors">{course.title}</h3>
                  <span className="text-slate-300 font-medium text-xs block border-t border-white/20 pt-4">{course.duration}</span>
                </div>
              </Link>
              
              <div className="mt-6 px-2 flex flex-col h-full">
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">{course.desc}</p>
                {/* Updated button to act as a Link to the specific program page */}
                <Link href={`/programs/${course.id}`} className="text-[#0DABAE] text-xs font-black uppercase tracking-widest hover:text-white transition-colors w-max">
                  Explore Program →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}