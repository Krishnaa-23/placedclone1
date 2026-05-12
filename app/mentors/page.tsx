'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Inter } from 'next/font/google'
import { supabase } from '@/utils/supabase'

const inter = Inter({ subsets: ['latin'] })

export default function MentorsPage() {
  const [mentorsData, setMentorsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)

  // Mouse Spotlight Effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Fetch from Supabase
  useEffect(() => {
    const fetchMentors = async () => {
      const { data, error } = await supabase.from('mentors').select('*')
      if (data) setMentorsData(data)
      if (error) console.error("Error fetching mentors:", error)
      setIsLoading(false)
    }
    fetchMentors()
  }, [])

  return (
    <div onMouseMove={handleMouseMove} className={`min-h-screen bg-[#052742] text-white pt-24 pb-20 px-4 md:px-8 relative overflow-hidden group ${inter.className}`}>
      
      {/* Interactive Mouse Spotlight */}
      <motion.div 
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 z-0" 
        style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(13, 171, 174, 0.25), transparent 80%)` }} 
      />
      
      {/* Floating Ambient Tech Symbols */}
      <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 left-10 text-[#0DABAE]/10 text-8xl font-black pointer-events-none z-0">{"{ }"}</motion.div>
      <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-40 right-20 text-[#0DABAE]/10 text-9xl font-black pointer-events-none z-0">{"</>"}</motion.div>
      <motion.div animate={{ y: [0, -20, 0], x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/4 text-[#0DABAE]/10 text-7xl font-black pointer-events-none z-0">{"[ ]"}</motion.div>
      
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16 text-center">
          <Link href="/" className="text-[#0DABAE] hover:text-white font-bold text-xs md:text-sm mb-6 inline-block transition-colors uppercase tracking-widest">← Back to Home</Link>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Learn From The <span className="text-[#0DABAE]">Best</span></h1>
          <p className="text-slate-300 max-w-2xl mx-auto font-medium text-sm md:text-base">Industry experts bringing real-world corporate expectations directly to your campus.</p>
        </div>

        {isLoading ? (
          <div className="text-center text-[#0DABAE] font-black animate-pulse py-20 uppercase tracking-widest">Loading Mentors...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {mentorsData.map((mentor, idx) => (
              <motion.div 
                key={mentor.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: [0, -8, 0] }} 
                transition={{ opacity: { delay: idx * 0.1 }, y: { duration: 4, repeat: Infinity, delay: idx * 0.4, ease: "easeInOut" } }} 
                onClick={() => setSelectedMentor(mentor)} 
                className="cursor-pointer bg-[#031A2D]/80 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10 hover:border-[#0DABAE] hover:shadow-[0_0_20px_rgba(13,171,174,0.3)] transition-all group flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <div className="w-20 h-20 bg-[#0DABAE]/10 text-[#0DABAE] rounded-full flex items-center justify-center text-3xl font-black mb-4 group-hover:scale-110 group-hover:bg-[#0DABAE] group-hover:text-[#052742] transition-all duration-300 relative z-10">
                  {mentor.initials}
                </div>
                <h3 className="text-lg md:text-xl font-black text-white leading-tight relative z-10">{mentor.name}</h3>
                <p className="text-[#0DABAE] font-bold text-[10px] md:text-xs uppercase mt-2 relative z-10">{mentor.role} @ {mentor.company}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMentor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#052742]/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-xl p-8 md:p-10 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setSelectedMentor(null)} className="absolute top-5 right-5 text-slate-400 hover:text-[#052742] transition-colors">✕</button>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-[#0DABAE]/10 text-[#0DABAE] rounded-full flex items-center justify-center text-4xl font-black mb-6">{selectedMentor.initials}</div>
                <h3 className="text-3xl font-black mb-1 text-[#052742]">{selectedMentor.name}</h3>
                <p className="text-[#0DABAE] font-black uppercase tracking-widest text-sm mb-6">{selectedMentor.role} @ {selectedMentor.company}</p>
                <p className="text-slate-600 leading-relaxed mb-8">{selectedMentor.bio}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}