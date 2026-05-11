'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform, Variants } from 'framer-motion'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// ==========================================
// 🛠️ WHATSAPP SETTINGS (CHANGE THESE LATER)
// ==========================================
const WHATSAPP_NUMBER = "918927653209" // Do not include '+' or spaces, just the country code and number
const WHATSAPP_MESSAGE = "Hi PLACED team! I would like to know more about the programs."
// ==========================================

// --- EXISTING DATA ---
const MENTORS = [
  { id: 1, name: 'Alex Rivera', role: 'Senior Dev', company: 'Google', bio: 'Expert in Distributed Systems and Cloud Architecture with 10+ years of experience.', initials: 'AR' },
  { id: 2, name: 'Sarah Chen', role: 'Product lead', company: 'Meta', bio: 'Specializing in growth-driven product design and high-velocity engineering teams.', initials: 'SC' },
  { id: 3, name: 'Marcus Thorne', role: 'Security Architect', company: 'Visa', bio: 'Former pentester turned architect focusing on zero-trust frameworks.', initials: 'MT' },
]

const COURSES = [
  { 
    id: 'fullstack', 
    title: 'Full-Stack Engineering', 
    duration: '12 Weeks', 
    level: 'Intermediate',
    imagePath: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'data-science', 
    title: 'Data Science & AI', 
    duration: '10 Weeks', 
    level: 'Beginner-Pro',
    imagePath: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'cyber-security', 
    title: 'Cybersecurity Analyst', 
    duration: '8 Weeks', 
    level: 'Advanced',
    imagePath: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
]

const COFOUNDERS = [
  { id: 'abhishek', name: 'A S ABHISHEK', role: 'Co-Founder & CEO, PLACED', imagePath: '/leadership/abhishek.png', bio: 'A S Abhishek leads PLACED, an EdTech platform focused on bridging the gap between students and professional career opportunities across corporate placements, competitive government exams, and higher education pathways. He has trained 10,000+ students across 40+ colleges in South India in aptitude, communication, and career readiness. As CEO, he drives the company’s strategy, institutional partnerships, and program development.' },
  { id: 'vishnu', name: 'VISHNU MOHAN R', role: 'Co-Founder & COO, PLACED', imagePath: '/leadership/vishnu.png', bio: 'Vishnu Mohan R brings 12+ years of experience in the EdTech and training industry. He has mentored students across mechanical design, competitive government examinations, and career readiness programs for corporate placements and higher education pathways. At PLACED, he leads operations, academic delivery, and program implementation.' },
  { id: 'arjun', name: 'ARJUN A K', role: 'Co-Founder & Chief Growth Officer, PLACED', imagePath: '/leadership/arjun.png', bio: 'Arjun A K brings 10+ years of experience in EdTech and competitive exam training, having mentored 25,000+ students across SSC, RRB, and UPSC segments. With expertise in Quantitative Aptitude, Logical Reasoning, and General Awareness, he brings strong academic and outcome-driven insights. At PLACED, he leads growth strategy, student acquisition, and program expansion, driving scalable impact.' },
  { id: 'vigneswaran', name: 'VIGNESWARAN A R', role: 'Co-Founder & CAO, PLACED', imagePath: '/leadership/vigneswaran.png', bio: 'Vigneswaran A R brings 7+ years of experience in EdTech and placement training, having trained 50,000+ students across 50+ colleges. He specializes in Quantitative Aptitude and Logical Reasoning, with a strong focus on building problem-solving and analytical skills. At PLACED, he leads academic design, curriculum development, and training methodology, creating structured outcome-driven learning programs.' },
]

export const ALUMNI_DATA = [
  { id: 'revathy', name: 'Revathy', company: 'SSC & RRB Scholar', imagePath: '/alumni/revathy.jpg', shortQuote: "Choosing PLACED was one of the best decisions I have ever made.", testimony: "Initially, I had joined a different institute, but they did not consider beginner-level students at all. They promised mentorship and support in the beginning, but in reality, there was no proper guidance. Because of that experience, I had many concerns... However, after joining, all my doubts were completely cleared. I strongly recommend PLACED as the best option 💯" },
  { id: 'sreelakshmi', name: 'Sreelakshmi', company: 'Placed Scholar', imagePath: '/alumni/sreelakshmi.jpg', shortQuote: "The concepts were taught from the basics, making them easy to understand.", testimony: "Initially, I had joined a different institute, but they did not consider beginner-level students at all. They promised mentorship and support in the beginning, but in reality, there was no proper guidance. Because of that experience, I had many concerns... However, after joining, all my doubts were completely cleared. I strongly recommend PLACED as the best option 💯" },
  { id: 'amrutha', name: 'Amrutha P R', company: 'Govt Aspirant', imagePath: '/alumni/amrutha.jpg', shortQuote: "Joining PLACED changed my self-doubt into absolute confidence.", testimony: "Initially, I had joined a different institute, but they did not consider beginner-level students at all. They promised mentorship and support in the beginning, but in reality, there was no proper guidance. Because of that experience, I had many concerns... However, after joining, all my doubts were completely cleared. I strongly recommend PLACED as the best option 💯" },
  { id: 'bhajan', name: 'Bhajan', company: 'Competitive Exams', imagePath: '/alumni/bhajan.jpg', shortQuote: "With their help, there are many positive changes.", testimony: "Initially, I had joined a different institute, but they did not consider beginner-level students at all. They promised mentorship and support in the beginning, but in reality, there was no proper guidance. Because of that experience, I had many concerns... However, after joining, all my doubts were completely cleared. I strongly recommend PLACED as the best option 💯" },
  { id: 'noel', name: 'Noel Varghese', company: 'Federal Bank PO', imagePath: '/alumni/noel.jpg', shortQuote: "Those few hours were worth days. I did crack and am happily placed.", testimony: "Initially, I had joined a different institute, but they did not consider beginner-level students at all. They promised mentorship and support in the beginning, but in reality, there was no proper guidance. Because of that experience, I had many concerns... However, after joining, all my doubts were completely cleared. I strongly recommend PLACED as the best option 💯" },
  { id: 'devi', name: 'Devi', company: 'Gradical', imagePath: '/alumni/devi.jpg', shortQuote: "They broke down even the most complex problems into simple steps.", testimony: "Initially, I had joined a different institute, but they did not consider beginner-level students at all. They promised mentorship and support in the beginning, but in reality, there was no proper guidance. Because of that experience, I had many concerns... However, after joining, all my doubts were completely cleared. I strongly recommend PLACED as the best option 💯" },
  { id: 'abhijitha', name: 'Abhijitha', company: 'UST Global', imagePath: '/alumni/abhijitha.jpg', shortQuote: "He made tricky concepts easy to understand. Cleared UST and TCS.", testimony: "Initially, I had joined a different institute, but they did not consider beginner-level students at all. They promised mentorship and support in the beginning, but in reality, there was no proper guidance. Because of that experience, I had many concerns... However, after joining, all my doubts were completely cleared. I strongly recommend PLACED as the best option 💯" },
]

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

// --- INTERACTIVE RETRO CUBE ---
const InteractiveCube = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center [perspective:1200px] cursor-grab active:cursor-grabbing">
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.6}
        style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ rotateX: [-15, 15, -15], rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        whileDrag={{ scale: 1.1, transition: { duration: 0.2 } }}
        className="relative w-40 h-40 md:w-48 md:h-48"
      >
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#052742]/90 flex items-center justify-center font-black text-white text-2xl md:text-3xl backdrop-blur-md shadow-[0_0_30px_rgba(13,171,174,0.3)]" style={{ transform: "translateZ(96px)" }}>CODE</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#031A2D]/90 flex items-center justify-center font-black text-[#0DABAE] text-2xl md:text-3xl backdrop-blur-md" style={{ transform: "rotateY(180deg) translateZ(96px)" }}>LEARN</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#0DABAE]/90 flex items-center justify-center font-black text-[#052742] text-2xl md:text-3xl backdrop-blur-md" style={{ transform: "rotateY(90deg) translateZ(96px)" }}>BUILD</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#0DABAE]/90 flex items-center justify-center font-black text-[#052742] text-2xl md:text-3xl backdrop-blur-md" style={{ transform: "rotateY(-90deg) translateZ(96px)" }}>GROW</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-white/95 flex items-center justify-center font-black text-[#052742] text-2xl md:text-3xl backdrop-blur-md" style={{ transform: "rotateX(90deg) translateZ(96px)" }}>HIRED</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-white/95 flex items-center justify-center font-black text-[#052742] text-2xl md:text-3xl backdrop-blur-md" style={{ transform: "rotateX(-90deg) translateZ(96px)" }}>WIN</div>
      </motion.div>
    </div>
  )
}

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [selectedFounder, setSelectedFounder] = useState<any>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [alumniIndex, setAlumniIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false) }, 1000)
    const handleScroll = () => { if (window.scrollY > 600) setShowPopup(true) }
    window.addEventListener('scroll', handleScroll)
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll) }
  }, [])

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setAlumniIndex((prev) => (prev + 1) % ALUMNI_DATA.length)
    }, 3000)
    return () => clearInterval(carouselTimer)
  }, [])

  const displayedAlumni = [
    ALUMNI_DATA[alumniIndex % ALUMNI_DATA.length],
    ALUMNI_DATA[(alumniIndex + 1) % ALUMNI_DATA.length],
    ALUMNI_DATA[(alumniIndex + 2) % ALUMNI_DATA.length],
  ]

  // Construct the WhatsApp URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className={inter.className}>
      {/* 1-SECOND INFINITY PRE-LOADER */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%", transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center"
          >
            <motion.svg
              viewBox="0 0 100 50"
              className="w-24 md:w-32 h-auto stroke-[#0DABAE] fill-none"
              style={{ strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              <motion.path
                d="M 25,25 C 10,40 10,10 25,25 C 40,40 60,10 75,25 C 90,40 90,10 75,25 C 60,10 40,40 25,25 Z"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.svg>
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="mt-4 text-[#052742] font-black tracking-widest uppercase text-sm"
            >
              PLACED
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white text-[#052742] scroll-smooth overflow-x-hidden">
        
        {/* 1. NAVIGATION */}
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: isLoading ? 1.1 : 0 }} 
          className="flex items-center justify-between px-4 md:px-8 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100"
        >
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-full flex flex-col justify-center items-center gap-1 md:gap-1.5 hover:bg-slate-100 border border-slate-200 transition-colors z-50 relative"
            >
              <motion.span animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-4 md:w-5 h-0.5 bg-[#052742] block transition-transform"></motion.span>
              <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 md:w-5 h-0.5 bg-[#052742] block transition-opacity"></motion.span>
              <motion.span animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-4 md:w-5 h-0.5 bg-[#052742] block transition-transform"></motion.span>
            </button>

            <Link href="/" className="relative w-28 md:w-32 h-8 md:h-10">
               <Image src="/placed-logo.jpg" alt="Placed Logo" fill sizes="(max-width: 768px) 100vw, 128px" className="object-contain object-left mix-blend-multiply" priority />
            </Link>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: isLoading ? 1.2 : 0.1, duration: 0.5 }}
            className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2 rounded-full shadow-inner"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0DABAE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0DABAE]"></span>
            </span>
            <span className="text-xs font-bold text-[#052742] uppercase tracking-widest">2026 Admissions Open</span>
          </motion.div>

          <div className="flex items-center">
            <Link href="/signup" className="bg-[#052742] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-xl font-bold hover:bg-[#0DABAE] transition-all shadow-xl text-xs md:text-sm">
              <span className="hidden sm:inline">Book an Institutional Demo</span>
              <span className="sm:hidden">Book Demo</span>
            </Link>
          </div>
        </motion.nav>

        {/* --- DROPDOWN MENU OVERLAY --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-[#052742]/30 backdrop-blur-sm z-40" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: -20 }} transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed top-20 left-4 md:top-24 md:left-8 w-56 md:w-64 bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl p-6 md:p-8 border border-slate-100 flex flex-col gap-5 md:gap-6 z-50 text-left"
              >
                <Link href="/courses" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Courses</Link>
                <Link href="/mentors" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Mentors</Link>
                <a href="/#leadership" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Leadership</a>
                <Link href="/alumni" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Alumni</Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 2. HERO */}
        <section className="bg-[#052742] pt-16 pb-16 md:pt-20 md:pb-24 px-4 md:px-8 relative overflow-hidden bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[#0DABAE]/20 blur-[120px] md:blur-[150px] rounded-full pointer-events-none"
          />
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: isLoading ? 1.3 : 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 md:mb-8 uppercase tracking-tighter"
              >
                INFINITE <span className="text-[#0DABAE]">POSSIBILITIES.</span><br/>DEFINITE <span className="text-[#0DABAE]">OUTCOME.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: isLoading ? 1.5 : 0.4 }}
                className="text-base md:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto md:mx-0 mb-8 md:mb-12 font-medium"
              >
                The premier career accelerator bridging the gap between student potential and professional tech success. Get trained. Get hired.
              </motion.p>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: isLoading ? 1.7 : 0.6 }}>
                <Link href="/courses" className="bg-[#0DABAE] text-white px-8 py-4 md:px-10 md:py-5 rounded-xl font-black text-base md:text-lg hover:scale-105 transition-transform inline-block shadow-2xl shadow-[#0DABAE]/30">
                  EXPLORE PROGRAMS
                </Link>
              </motion.div>
            </div>
            
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: isLoading ? 1.5 : 0.4 }} className="flex justify-center relative mt-10 md:mt-0">
              <InteractiveCube />
              <p className="absolute -bottom-6 md:-bottom-8 text-[#0DABAE]/70 text-[10px] md:text-xs font-bold uppercase tracking-widest pointer-events-none">Drag me around</p>
            </motion.div>
          </div>
        </section>

        {/* 3. WORKFLOW */}
        <section id="workflow" className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
          <motion.div 
             animate={{ x: [0, 150, -50, 0], y: [0, -100, 100, 0], scale: [1, 1.2, 1] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-tr from-[#0DABAE]/20 to-transparent rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-multiply"
          />
          <motion.div 
             animate={{ x: [0, -150, 50, 0], y: [0, 150, -50, 0], scale: [1, 1.3, 1] }}
             transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-bl from-[#052742]/10 to-transparent rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-multiply"
          />
          
          <div className="absolute inset-0 bg-[radial-gradient(#052742_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] mix-blend-multiply"></div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto relative z-10">
            <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-black mb-12 md:mb-16 uppercase tracking-tighter text-[#052742]">
              The Placed <span className="text-[#0DABAE]">Workflow</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
              {[ 
                { step: '01', title: 'Apply', desc: 'Submit your profile and pass the technical assessment.' },
                { step: '02', title: 'Upskill', desc: 'Intensive 12-week training with active industry leads.' },
                { step: '03', title: 'Portfolio', desc: 'Build production-ready apps that impress recruiters.' },
                { step: '04', title: 'Hired', desc: 'Direct referrals to partner companies like Google & Meta.' }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-xl border border-slate-100 shadow-xl hover:border-[#0DABAE] transition-all hover:-translate-y-2 group">
                  <span className="text-5xl md:text-6xl font-black text-[#0DABAE]/20 group-hover:text-[#0DABAE]/60 transition-colors block mb-2 md:mb-4">{item.step}</span>
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-[#052742]">{item.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 4. COURSES SECTION */}
        <section id="courses" className="py-16 md:py-24 px-4 md:px-8 bg-[#031A2D] relative overflow-hidden">
          <motion.div 
            animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#0DABAE 2px, transparent 2px)', backgroundSize: '40px 40px' }}
          />

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto relative z-10">
            <motion.div variants={fadeUp} className="flex justify-center md:justify-start items-end mb-10 md:mb-12">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white text-center md:text-left">Accelerated <span className="text-[#0DABAE]">Programs</span></h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {COURSES.map((course) => (
                <motion.div key={course.id} variants={fadeUp}>
                  <Link href={`/courses/${course.id}`} className="block group bg-[#052742] rounded-xl text-white hover:-translate-y-2 shadow-xl hover:shadow-[#0DABAE]/20 relative overflow-hidden h-[220px] md:h-80 flex flex-col justify-end p-5 md:p-8 border border-white/5">
                    <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                      <Image src={course.imagePath} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031A2D] via-[#052742]/70 to-transparent z-10"></div>
                    <div className="relative z-20">
                      <span className="text-[9px] md:text-xs font-bold text-[#0DABAE] group-hover:text-white uppercase tracking-widest block mb-1 md:mb-2 transition-colors">{course.level}</span>
                      <h3 className="text-xl md:text-3xl font-black mb-1 md:mb-4 leading-tight">{course.title}</h3>
                      <div className="flex justify-between items-center text-slate-300 group-hover:text-white font-medium text-xs md:text-base mt-2 md:mt-0">
                        <span>{course.duration}</span>
                        <span className="text-lg md:text-2xl transition-transform group-hover:translate-x-2 text-[#0DABAE]">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. MENTORS SECTION */}
        <section id="mentors" className="py-16 md:py-24 px-4 md:px-8 bg-[#052742] relative overflow-hidden text-white">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-gradient-to-br from-[#0DABAE]/10 to-transparent blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-[30%] -right-[10%] w-[80%] h-[80%] bg-gradient-to-tl from-slate-600/10 to-transparent blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none"></div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto text-center relative z-10">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-10 md:mb-16 uppercase tracking-tighter text-white">
              LEARN FROM THE <span className="text-[#0DABAE]">BEST.</span>
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {MENTORS.map(mentor => (
                <motion.div key={mentor.id} variants={fadeUp} onClick={() => setSelectedMentor(mentor)} className="cursor-pointer bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10 hover:border-[#0DABAE] transition-all group shadow-xl flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0DABAE]/10 text-[#0DABAE] rounded-full flex items-center justify-center text-2xl md:text-3xl font-black mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-[#0DABAE] group-hover:text-[#052742] transition-all duration-300">
                    {mentor.initials}
                  </div>
                  <h3 className="text-base md:text-2xl font-black text-white leading-tight">{mentor.name}</h3>
                  <p className="text-[#0DABAE] font-bold text-[9px] md:text-sm uppercase mt-1 md:mt-2">{mentor.company}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6. LEADERSHIP / CO-FOUNDERS */}
        <section id="leadership" className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
          <motion.div animate={{ x: ["0%", "-50%", "0%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-[#0DABAE]/10 to-transparent pointer-events-none mix-blend-multiply" />

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto text-center relative z-10">
            <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-black mb-10 md:mb-16 uppercase tracking-tighter text-[#052742]">
              Meet the <span className="text-[#0DABAE]">Team</span>
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {COFOUNDERS.map((founder) => (
                <motion.div key={founder.id} variants={fadeUp} className="group cursor-pointer bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-[#0DABAE]" onClick={() => setSelectedFounder(founder)}>
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4 md:mb-6 border border-slate-100 transition-all group-hover:shadow-lg">
                    <Image src={founder.imagePath} alt={founder.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#052742]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 md:p-6">
                      <span className="text-white font-bold text-[10px] md:text-sm tracking-widest uppercase text-center">Profile</span>
                    </div>
                  </div>
                  <h3 className="text-base md:text-xl font-black text-[#052742] group-hover:text-[#0DABAE] transition-colors px-1 md:px-2 leading-tight">{founder.name}</h3>
                  <p className="text-[10px] md:text-sm font-bold text-slate-500 mt-1 px-1 md:px-2 pb-1 md:pb-2">{founder.role.split(',')[0]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7. ALUMNI */}
        <section id="alumni" className="py-16 md:py-24 bg-[#031A2D] text-white overflow-hidden relative px-4 md:px-8">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#052742] via-[#031A2D] to-[#031A2D]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
             <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-6">
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center md:text-left">
                 Alumni <span className="text-[#0DABAE]">Success</span>
               </h2>
               <Link href="/alumni" className="bg-[#0DABAE] hover:bg-white hover:text-[#052742] text-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-[10px] md:text-xs shrink-0 shadow-lg shadow-[#0DABAE]/20 hover:scale-105">
                 Read All 11 Stories →
               </Link>
             </div>
             
             <AnimatePresence mode="wait">
               <motion.div 
                 key={alumniIndex}
                 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}
                 className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
               >
                 {displayedAlumni.map((alumni, index) => (
                    <div key={`${alumni.id}-${index}`} className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:border-[#0DABAE]/50 transition-colors flex flex-col justify-between group h-full">
                      <div>
                        <div className="text-3xl md:text-4xl text-[#0DABAE] mb-2 md:mb-4 font-serif group-hover:-translate-y-1 transition-transform">"</div>
                        <p className="italic text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed text-slate-300">{alumni.shortQuote}</p>
                      </div>
                      <div className="flex items-center gap-4 border-t border-white/10 pt-4 md:pt-6 mt-auto">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#0DABAE] shrink-0 group-hover:scale-105 transition-transform">
                          <Image src={alumni.imagePath} alt={alumni.name} fill sizes="(max-width: 768px) 48px, 64px" className="object-cover object-top" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm md:text-base">{alumni.name}</div>
                          <div className="text-[10px] md:text-xs text-[#0DABAE] font-black uppercase tracking-widest">{alumni.company}</div>
                        </div>
                      </div>
                    </div>
                 ))}
               </motion.div>
             </AnimatePresence>
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer className="bg-[#02111E] py-12 md:py-20 px-4 md:px-8 border-t border-white/5 relative overflow-hidden text-slate-400">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0DABAE]/30 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 items-start relative z-10">
            <div className="col-span-1 md:col-span-2 text-center md:text-left">
              <div className="relative w-40 md:w-48 h-12 md:h-14 mb-6 bg-white rounded-xl overflow-hidden shadow-lg border border-slate-800 mx-auto md:mx-0">
                 <Image src="/placed-logo.jpg" alt="Placed Logo" fill sizes="200px" className="object-contain p-2" />
              </div>
              <p className="text-slate-400 max-w-sm mx-auto md:mx-0 font-medium leading-relaxed tracking-wide text-sm md:text-base">
                The premier EdTech platform for ambitious students ready to break into tech. <span className="text-[#0DABAE] font-bold block mt-2">Infinite Possibilities, Definite Outcome.</span>
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-black mb-4 uppercase text-[10px] md:text-xs tracking-widest text-slate-200">Support</h4>
              <ul className="space-y-2 text-xs md:text-sm font-medium">
                <li><a href="#" className="hover:text-[#0DABAE] transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-[#0DABAE] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#0DABAE] transition-colors">Terms of Use</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <h4 className="font-black mb-4 uppercase text-[10px] md:text-xs tracking-widest text-slate-200">Connect</h4>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#0DABAE] text-xs md:text-sm font-bold transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-[#0DABAE] text-xs md:text-sm font-bold transition-colors">X</a>
                <a href="#" className="hover:text-[#0DABAE] text-xs md:text-sm font-bold transition-colors">Discord</a>
              </div>
            </div>
          </div>
        </footer>

        {/* ========================================== */}
        {/* 🟢 FLOATING WHATSAPP BUTTON */}
        {/* ========================================== */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[90] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer"
          aria-label="Chat with us on WhatsApp"
        >
          {/* Subtle pulse ring behind the button */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
          
          {/* WhatsApp SVG Icon */}
          <svg className="w-8 h-8 md:w-10 md:h-10 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
        {/* ========================================== */}

        {/* ANIMATED MODALS */}
        <AnimatePresence>
          {selectedMentor && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#052742]/80 backdrop-blur-md">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-xl p-8 md:p-10 max-w-md w-full shadow-2xl relative">
                <button onClick={() => setSelectedMentor(null)} className="absolute top-5 right-5 text-slate-400 hover:text-[#052742] transition-colors">✕</button>
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-[#0DABAE]/10 text-[#0DABAE] rounded-full flex items-center justify-center text-3xl md:text-4xl font-black mb-4 md:mb-6">
                    {selectedMentor.initials}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-1 text-[#052742]">{selectedMentor.name}</h3>
                  <p className="text-[#0DABAE] font-black uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6">{selectedMentor.role} @ {selectedMentor.company}</p>
                  <p className="text-slate-600 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">{selectedMentor.bio}</p>
                  <button className="w-full bg-[#052742] text-white py-3 md:py-4 rounded-xl font-bold hover:bg-[#0DABAE] transition-colors text-sm md:text-base">Book a Session</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedFounder && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#052742]/90 backdrop-blur-md">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-xl p-6 md:p-12 max-w-3xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
                <button onClick={() => setSelectedFounder(null)} className="absolute top-4 right-4 md:top-8 md:right-8 text-slate-400 hover:text-[#052742] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-slate-100 z-50 transition-colors">✕</button>
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <div className="w-full md:w-2/5 shrink-0 flex flex-col justify-start">
                     <div className="relative w-3/4 mx-auto md:w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl border border-slate-200">
                        <Image src={selectedFounder.imagePath} alt={selectedFounder.name} fill sizes="(max-width: 768px) 75vw, 33vw" className="object-cover object-top" />
                     </div>
                  </div>

                  <div className="w-full md:w-3/5 flex flex-col justify-center text-center md:text-left">
                     <h3 className="text-2xl md:text-4xl font-black text-[#052742] leading-tight">{selectedFounder.name}</h3>
                     <p className="text-xs md:text-sm font-extrabold text-[#0DABAE] mt-1 md:mt-2 uppercase tracking-widest mb-4 md:mb-6">{selectedFounder.role}</p>
                     
                     <div className="w-12 h-1 bg-[#0DABAE] mb-4 md:mb-6 rounded-full mx-auto md:mx-0"></div>
                     
                     <p className="text-slate-700 leading-relaxed text-sm md:text-base font-medium whitespace-pre-line">{selectedFounder.bio}</p>
                     
                     <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100">
                        <button className="text-[10px] md:text-xs font-black text-[#0DABAE] hover:text-[#052742] uppercase tracking-widest transition-colors">LinkedIn Profile</button>
                     </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCROLL POPUP */}
        <AnimatePresence>
          {showPopup && (
             <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90]">
                <div className="bg-white text-[#052742] p-5 md:p-6 rounded-xl shadow-2xl flex flex-col items-center max-w-[200px] md:max-w-[250px] border border-slate-100">
                   <p className="font-black text-center mb-3 md:mb-4 text-sm md:text-base">Ready to level up?</p>
                   <Link href="/partner" onClick={() => setShowPopup(false)} className="bg-[#052742] text-white px-5 py-2 md:px-6 md:py-2 rounded-lg font-bold text-xs md:text-sm hover:bg-[#0DABAE] transition-colors shadow-lg text-center">Partner With PLACED</Link>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}