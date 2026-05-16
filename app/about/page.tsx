'use client'

import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function AboutPage() {
  const router = useRouter()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div onMouseMove={handleMouseMove} className={`min-h-screen bg-white text-[#052742] pt-24 pb-24 px-4 md:px-8 relative overflow-hidden group ${inter.className}`}>
      
      {/* Soft Layout Spotlight Accent */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(13, 171, 174, 0.08), transparent 70%)` }}
      />
      
      {/* Clean Grid Infrastructure */}
      <div className="absolute inset-0 bg-[radial-gradient(#052742_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none z-0"></div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-5xl mx-auto relative z-10">
        
        {/* Minimal Return Action */}
        <button 
          onClick={() => router.back()} 
          className="text-[#052742]/60 hover:text-[#0DABAE] font-black text-xs md:text-sm mb-16 inline-block transition-colors uppercase tracking-[0.2em] text-left"
        >
          ← Go Back
        </button>
        
        {/* LANDSCAPE HERO HEADER */}
        <div className="mb-14 border-b border-slate-100 pb-8">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-tight">
            About <span className="text-[#0DABAE]">Us</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-slate-600 text-base md:text-xl leading-relaxed font-medium tracking-wide max-w-4xl text-justify">
            PLACED is built on a simple belief: education should be accessible, relevant, and capable of leading to real outcomes for the people who engage with it. As learning and careers continue to change, it’s clear that education can no longer rely on rigid systems or outdated methods. The way people learn, grow, and prepare for the future has evolved and PLACED exists to grow with that change. We focus on rethinking how learning is delivered and applied, so it remains useful beyond the classroom and meaningful in real-world contexts.
          </motion.p>
        </div>

        {/* RESTRUCTURED MISSION & VISION SECTION WITH SVG GRAPHIC LOGOS */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-6 mb-20">
          
          {/* OUR VISION COMPONENT */}
          <motion.div variants={fadeUp} className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-4">
              {/* Vision Vector Graphic Logo */}
              <div className="w-12 h-12 rounded-xl bg-[#0DABAE]/10 flex items-center justify-center text-[#0DABAE] shrink-0 border border-[#0DABAE]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#052742]">Our Vision</h3>
            </div>
            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed text-justify pl-1">
              Our vision is to build an inclusive education platform that allows learners from different backgrounds to explore possibilities through learning that adapts to their needs and the world around them. We believe quality education should not be restricted by location, format, or circumstance. When used with intent, technology has the power to widen access, improve relevance, and create lasting impact.
            </p>
          </motion.div>
          
          {/* OUR MISSION COMPONENT */}
          <motion.div variants={fadeUp} className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-4">
              {/* Mission Vector Graphic Logo */}
              <div className="w-12 h-12 rounded-xl bg-[#052742]/5 flex items-center justify-center text-[#052742] shrink-0 border border-[#052742]/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#052742]">Our Mission</h3>
            </div>
            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed text-justify pl-1">
              At PLACED, our mission is simple: to design education that leads to tangible outcomes. By combining technology with practical, engaging teaching methods, we aim to help learners build clarity, confidence, and capability. We focus on understanding and application, so learning translates into progress academically, professionally, and personally.
            </p>
          </motion.div>
          
        </motion.div>

        {/* CLOSING ANCHOR ROW */}
        <motion.div variants={fadeUp} className="border-t border-slate-100 pt-10 text-center space-y-6">
          <p className="max-w-3xl mx-auto font-medium text-slate-500 text-sm md:text-base leading-relaxed italic">
            Education will continue to evolve, and PLACED is committed to evolving alongside it. By staying grounded in purpose while adapting to emerging needs, we work toward making outcome-driven education accessible to all, without losing sight of structure, responsibility, or long-term impact.
          </p>
          <div className="font-black uppercase text-[#0DABAE] tracking-[0.25em] text-sm md:text-lg pt-2">
            Infinite Possibilities, Definitive Outcome.
          </div>
        </motion.div>

        {/* SOCIAL MEDIA HUB & PHONE BLOCK */}
        <motion.div variants={fadeUp} className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center space-y-6">
          <div className="flex gap-4 items-center justify-center">
            {/* LinkedIn Link */}
            <a href="https://www.linkedin.com/company/placedtech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0DABAE] hover:text-white border border-slate-200/60 transition-all shrink-0 shadow-sm" aria-label="LinkedIn Profile">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            {/* Instagram Link */}
            <a href="https://www.instagram.com/placed.official?igsh=MTU5ZzBiOGtyYzRneQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0DABAE] hover:text-white border border-slate-200/60 transition-all shrink-0 shadow-sm" aria-label="Instagram Profile">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* Telegram Link */}
            <a href="https://t.me/placed_community" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0DABAE] hover:text-white border border-slate-200/60 transition-all shrink-0 shadow-sm" aria-label="Telegram Community">
              <svg className="w-4 h-4 pl-[1px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.87 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.536-.204.1.13.136.708z"/></svg>
            </a>
          </div>
          
          <div className="text-xs md:text-sm font-black uppercase text-slate-400 tracking-widest">
            Official Line: <a href="tel:+917907597197" className="text-[#052742] hover:text-[#0DABAE] font-bold font-mono tracking-wide transition-colors ml-1">+91 89276 53209</a>
          </div>
        </motion.div>
        
      </motion.div>
    </div>
  )
}