'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const EXPANDED_MENTORS = [
  { id: 1, name: 'Alex Rivera', role: 'Senior Software Engineer', company: 'Google', emoji: '👨‍💻', expertise: ['Cloud Architecture', 'Distributed Systems', 'Go'], bio: 'Alex has spent the last decade building scalable backend systems for millions of users. He specializes in breaking down complex cloud architecture into digestible, actionable lessons.' },
  { id: 2, name: 'Sarah Chen', role: 'Lead Product Designer', company: 'Meta', emoji: '👩‍💻', expertise: ['UI/UX', 'Design Systems', 'Growth'], bio: 'Sarah leads design initiatives that bridge the gap between engineering and user psychology. She helps students build portfolios that actually get recruiters to click "Hire".' },
  { id: 3, name: 'Marcus Thorne', role: 'Security Architect', company: 'Visa', emoji: '🕵️', expertise: ['Penetration Testing', 'Zero-Trust', 'Network Sec'], bio: 'Formerly a white-hat hacker, Marcus now designs zero-trust frameworks for global financial institutions. His mentorship focuses on practical, real-world defensive coding.' },
  { id: 4, name: 'Priya Sharma', role: 'Data Scientist', company: 'Netflix', emoji: '👩🏽‍🔬', expertise: ['Machine Learning', 'Python', 'A/B Testing'], bio: 'Priya builds recommendation algorithms. She loves mentoring students on how to tell compelling stories using massive datasets.' },
  { id: 5, name: 'David Kim', role: 'DevOps Lead', company: 'Amazon', emoji: '👨🏻‍🔧', expertise: ['AWS', 'CI/CD pipelines', 'Kubernetes'], bio: 'David automates everything. If you want to learn how code goes from a developer\'s laptop to a live production server flawlessly, he is your mentor.' },
  { id: 6, name: 'Emily Carter', role: 'Frontend Architect', company: 'Vercel', emoji: '👩🏼‍🚀', expertise: ['React', 'Next.js', 'Performance'], bio: 'Emily is obsessed with web performance and fluid animations. She mentors students on building blazing fast, accessible, and beautiful web applications.' },
]

export default function MentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState<any>(null)

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white pb-24 relative overflow-hidden">
      {/* Background Styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 mix-blend-screen"></div>

      {/* Header */}
      <nav className="px-8 py-6 relative z-10 flex items-center gap-4">
        <Link href="/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors font-bold text-xl backdrop-blur-md text-white">←</Link>
        <span className="text-xl font-black tracking-widest uppercase">Expert Mentors</span>
      </nav>

      <header className="py-20 px-8 text-center max-w-4xl mx-auto relative z-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          Learn from the <span className="text-teal-400">Top 1%.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-400 font-medium">
          Get 1-on-1 guidance, portfolio reviews, and mock interviews from industry leaders who actually hire people.
        </motion.p>
      </header>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {EXPANDED_MENTORS.map((mentor, idx) => (
          <motion.div 
            key={mentor.id}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedMentor(mentor)}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl cursor-pointer hover:bg-white/10 hover:border-teal-500/50 transition-all group shadow-2xl"
          >
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform origin-left">{mentor.emoji}</div>
            <h3 className="text-2xl font-black mb-1">{mentor.name}</h3>
            <p className="text-teal-400 font-bold text-sm uppercase tracking-widest mb-6">{mentor.role} @ {mentor.company}</p>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.slice(0, 2).map(skill => (
                <span key={skill} className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-slate-300">{skill}</span>
              ))}
              {mentor.expertise.length > 2 && <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-slate-300">+1</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Mentor Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            >
              <button onClick={() => setSelectedMentor(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-50 font-bold">✕</button>
              
              {/* Left Color Block */}
              <div className="bg-teal-500 p-12 md:w-1/3 flex flex-col justify-center items-center text-center">
                <div className="text-8xl md:text-9xl mb-6 bg-white rounded-full p-4 shadow-xl">{selectedMentor.emoji}</div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">{selectedMentor.name}</h3>
                <p className="text-white font-bold uppercase tracking-widest text-sm">{selectedMentor.company}</p>
              </div>

              {/* Right Content */}
              <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center text-slate-900">
                <h4 className="text-2xl font-black mb-4">About {selectedMentor.name.split(' ')[0]}</h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">{selectedMentor.bio}</p>
                
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedMentor.expertise.map((skill: string) => (
                     <span key={skill} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200">{skill}</span>
                  ))}
                </div>

                <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-teal-500 transition-colors shadow-xl text-sm">
                  📅 Schedule Meeting
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}