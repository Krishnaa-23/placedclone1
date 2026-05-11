'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform, Variants, useMotionTemplate } from 'framer-motion'
import { Inter } from 'next/font/google'
import { supabase } from '@/utils/supabase'

const inter = Inter({ subsets: ['latin'] })

// ==========================================
// 🛠️ WHATSAPP SETTINGS
// ==========================================
const WHATSAPP_NUMBER = "919876543210" 
const WHATSAPP_MESSAGE = "Hi PLACED team! I would like to know more about the institutional programs."

// --- THE 7-PHASE METHODOLOGY ---
const PHASES = [
  { id: '01', title: 'Diagnostic Analysis', desc: 'Tech-enabled baseline assessments to evaluate learning gaps.' },
  { id: '02', title: 'Skill Benchmarking', desc: 'Establishing starting points for aptitude and communication.' },
  { id: '03', title: 'Structured Training', desc: 'Progressive learning designed to build real-world readiness.' },
  { id: '04', title: 'Continuous Monitoring', desc: 'Real-time performance tracking for accuracy and consistency.' },
  { id: '05', title: 'Mock Simulations', desc: 'End-to-end processes replicating real selection pressure.' },
  { id: '06', title: 'Outcome Measurement', desc: 'Data-driven evaluation of student performance vs baseline.' },
  { id: '07', title: 'Continuity Planning', desc: 'Focused refinement of weak areas with structured feedback.' }
]

// --- THE PLACED ECOSYSTEM ---
const ECOSYSTEM_PILLARS = [
  { id: 'corporate-readiness', title: 'Corporate Readiness', duration: 'Placement Focus', level: 'Aptitude & Soft Skills', imagePath: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'public-exam', title: 'Public Exam Foundation', duration: 'Govt. Exam Focus', level: 'SSC, RRB & Banking', imagePath: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'academic-navigator', title: 'Academic Navigator', duration: 'Higher Studies', level: 'PG & Professional', imagePath: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
]

const MENTORS = [
  { id: 1, name: 'Alex Rivera', role: 'Senior Dev', company: 'Google', bio: 'Expert in Distributed Systems and Cloud Architecture with 10+ years of experience.', initials: 'AR' },
  { id: 2, name: 'Sarah Chen', role: 'Product lead', company: 'Meta', bio: 'Specializing in growth-driven product design and high-velocity engineering teams.', initials: 'SC' },
  { id: 3, name: 'Marcus Thorne', role: 'Security Architect', company: 'Visa', bio: 'Former pentester turned architect focusing on zero-trust frameworks.', initials: 'MT' },
  { id: 4, name: 'Priya Sharma', role: 'Data Scientist', company: 'Amazon', bio: 'Specializes in predictive modeling, scalable data pipelines, and AI systems.', initials: 'PS' },
]

const COFOUNDERS = [
  { id: 'abhishek', name: 'A S ABHISHEK', role: 'Co-Founder & CEO', imagePath: '/leadership/abhishek.png', bio: 'A S Abhishek leads PLACED, an EdTech platform focused on bridging the gap between students and professional career opportunities.' },
  { id: 'vishnu', name: 'VISHNU MOHAN R', role: 'Co-Founder & COO', imagePath: '/leadership/vishnu.png', bio: 'Vishnu Mohan R brings 12+ years of experience in the EdTech and training industry, mentoring students across competitive exams and placements.' },
  { id: 'arjun', name: 'ARJUN A K', role: 'Co-Founder & CGO', imagePath: '/leadership/arjun.png', bio: 'Arjun A K brings 10+ years of experience in EdTech and competitive exam training, having mentored 25,000+ students across multiple segments.' },
  { id: 'vigneswaran', name: 'VIGNESWARAN A R', role: 'Co-Founder & CAO', imagePath: '/leadership/vigneswaran.png', bio: 'Vigneswaran A R brings 7+ years of experience in EdTech and placement training, having trained 50,000+ students across 50+ colleges.' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

// ==========================================
// 🧊 INTERACTIVE HERO CUBE
// ==========================================
const InteractiveCube = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center [perspective:1200px] cursor-grab active:cursor-grabbing">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-[#0DABAE]/20 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170%] h-[170%] border border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-transparent border-t-[#0DABAE]/40 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0DABAE] rounded-full blur-[10px] animate-pulse" />

      <motion.div
        drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.6}
        style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ rotateX: [-15, 15, -15], rotateY: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        whileDrag={{ scale: 1.1, transition: { duration: 0.2 } }}
        className="relative w-40 h-40 md:w-48 md:h-48 z-10"
      >
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#052742]/90 flex items-center justify-center font-black text-white text-xl md:text-2xl backdrop-blur-md shadow-[0_0_30px_rgba(13,171,174,0.3)]" style={{ transform: "translateZ(96px)" }}>APTITUDE</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#031A2D]/90 flex items-center justify-center font-black text-[#0DABAE] text-xl md:text-2xl backdrop-blur-md" style={{ transform: "rotateY(180deg) translateZ(96px)" }}>SKILLS</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#0DABAE]/90 flex items-center justify-center font-black text-[#052742] text-xl md:text-2xl backdrop-blur-md" style={{ transform: "rotateY(90deg) translateZ(96px)" }}>CAREERS</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-[#0DABAE]/90 flex items-center justify-center font-black text-[#052742] text-xl md:text-2xl backdrop-blur-md" style={{ transform: "rotateY(-90deg) translateZ(96px)" }}>EXAMS</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-white/95 flex items-center justify-center font-black text-[#052742] text-xl md:text-2xl backdrop-blur-md" style={{ transform: "rotateX(90deg) translateZ(96px)" }}>SUCCESS</div>
        <div className="absolute inset-0 border-4 border-[#0DABAE] bg-white/95 flex items-center justify-center font-black text-[#052742] text-xl md:text-2xl backdrop-blur-md" style={{ transform: "rotateX(-90deg) translateZ(96px)" }}>PLACED</div>
      </motion.div>
    </div>
  )
}

// ==========================================
// 🖱️ WORKFLOW SECTION
// ==========================================
const WorkflowSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id="workflow" onMouseMove={handleMouseMove} className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden group">
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(9, 115, 117, 0.45), transparent 70%)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#052742_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] mix-blend-multiply z-0"></div>
      
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto relative z-10">
        <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-black mb-12 md:mb-16 uppercase tracking-tighter text-[#052742]">
          The Placed <span className="text-[#0DABAE]">Journey</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
          {[ 
            { step: '01', title: 'Apply', desc: 'Submit your profile and pass the diagnostic assessment.' },
            { step: '02', title: 'Upskill', desc: 'Progressive, application-focused learning mapped to real needs.' },
            { step: '03', title: 'Simulate', desc: 'Experience end-to-end mock recruitment and exam conditions.' },
            { step: '04', title: 'Outcome', desc: 'Achieve measurable success in placements or higher education.' }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-xl border border-slate-200 shadow-xl hover:border-[#0DABAE] transition-all hover:-translate-y-2 relative overflow-hidden">
              <span className="text-5xl md:text-6xl font-black text-[#0DABAE]/30 transition-colors block mb-2 md:mb-4">{item.step}</span>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-[#052742]">{item.title}</h3>
              <p className="text-slate-600 text-xs md:text-sm font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ==========================================
// ♾️ FAST INTERACTIVE INFINITY LOOP
// ==========================================
const InteractiveInfinity = () => {
  const [activePhase, setActivePhase] = useState(0);

  // Faster Auto-Play (2 seconds)
  useEffect(() => {
    const timer = setInterval(() => { setActivePhase((prev) => (prev + 1) % PHASES.length) }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Precise positions mapped to the SVG path
  const nodePositions = [
    { top: '50%', left: '10%' },    // 1. Left Edge
    { top: '22.5%', left: '25%' },  // 2. Top Left
    { top: '50%', left: '45%' },    // 3. Center (Offset slightly left)
    { top: '77.5%', left: '75%' },  // 4. Bottom Right
    { top: '50%', left: '90%' },    // 5. Right Edge
    { top: '22.5%', left: '75%' },  // 6. Top Right
    { top: '77.5%', left: '25%' },  // 7. Bottom Left
  ];

  return (
    <div className="w-full relative h-[350px] md:h-[400px]">
      {/* The SVG Infinity Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <motion.path 
          d="M 100 200 C 100 50, 400 50, 500 200 C 600 350, 900 350, 900 200 C 900 50, 600 50, 500 200 C 400 350, 100 350, 100 200 Z"
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"
        />
        <motion.path 
          d="M 100 200 C 100 50, 400 50, 500 200 C 600 350, 900 350, 900 200 C 900 50, 600 50, 500 200 C 400 350, 100 350, 100 200 Z"
          fill="none" stroke="#0DABAE" strokeWidth="4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 8px #0DABAE)' }}
        />
      </svg>

      {/* The Expanding Nodes Inside The Loop */}
      {PHASES.map((phase, idx) => {
        const isActive = activePhase === idx;
        return (
          <div 
            key={phase.id} 
            className="absolute z-20 flex items-center justify-center" 
            style={{ top: nodePositions[idx].top, left: nodePositions[idx].left, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              layout
              onClick={() => setActivePhase(idx)}
              className={`cursor-pointer overflow-hidden flex flex-col items-center justify-center rounded-2xl border-2 transition-colors ${isActive ? 'bg-[#052742] border-[#0DABAE] p-4 w-48 md:w-56 shadow-[0_0_25px_rgba(13,171,174,0.4)]' : 'bg-[#031A2D] border-white/20 w-8 h-8 md:w-10 md:h-10 hover:border-[#0DABAE]'}`}
            >
              {isActive ? (
                <motion.div layoutId={`content-${phase.id}`} className="text-center w-full">
                  <span className="text-[#0DABAE] font-black text-xs block mb-1">{phase.id}</span>
                  <h4 className="text-white font-bold text-[10px] md:text-sm leading-tight mb-2">{phase.title}</h4>
                  <p className="text-slate-300 text-[9px] md:text-[10px] leading-relaxed hidden sm:block">{phase.desc}</p>
                </motion.div>
              ) : (
                <motion.span layoutId={`content-${phase.id}`} className="text-white font-black text-[10px] md:text-xs">{phase.id}</motion.span>
              )}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

// ==========================================
// 🎓 MENTORS SECTION
// ==========================================
const MentorsSection = ({ setSelectedMentor }: { setSelectedMentor: (mentor: any) => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id="mentors" onMouseMove={handleMouseMove} className="py-16 md:py-24 px-4 md:px-8 bg-[#052742] relative overflow-hidden text-white border-t border-white/5 group">
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(13, 171, 174, 0.25), transparent 80%)` }}
      />
      
      <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 text-[#0DABAE]/10 text-7xl font-black pointer-events-none">{"{ }"}</motion.div>
      <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-20 text-[#0DABAE]/10 text-8xl font-black pointer-events-none">{"</>"}</motion.div>
      <motion.div animate={{ y: [0, -20, 0], x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/4 text-[#0DABAE]/10 text-6xl font-black pointer-events-none">{"[ ]"}</motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none z-0"></div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-black mb-10 md:mb-16 uppercase tracking-tighter text-white">
          LEARN FROM THE <span className="text-[#0DABAE]">BEST.</span>
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {MENTORS.map((mentor, idx) => (
            <motion.div 
              key={mentor.id} 
              variants={fadeUp} 
              animate={{ y: [0, -8, 0] }} 
              transition={{ duration: 4, repeat: Infinity, delay: idx * 0.4, ease: "easeInOut" }}
              onClick={() => setSelectedMentor(mentor)} 
              className="cursor-pointer bg-[#031A2D]/80 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10 hover:border-[#0DABAE] hover:shadow-[0_0_20px_rgba(13,171,174,0.3)] transition-all group flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0DABAE]/10 text-[#0DABAE] rounded-full flex items-center justify-center text-2xl md:text-3xl font-black mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-[#0DABAE] group-hover:text-[#052742] transition-all duration-300 relative z-10">
                {mentor.initials}
              </div>
              <h3 className="text-base md:text-2xl font-black text-white leading-tight relative z-10">{mentor.name}</h3>
              <p className="text-[#0DABAE] font-bold text-[9px] md:text-sm uppercase mt-1 md:mt-2 relative z-10">{mentor.company}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ==========================================
// 👥 MEET THE TEAM (WHITE + DARK MOUSE SPOTLIGHT)
// ==========================================
const TeamSection = ({ setSelectedFounder }: { setSelectedFounder: (founder: any) => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id="leadership" onMouseMove={handleMouseMove} className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden group border-t border-slate-200">
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(9, 115, 117, 0.45), transparent 70%)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#052742_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0"></div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2 variants={fadeUp} className="text-center text-4xl md:text-5xl font-black mb-10 md:mb-16 uppercase tracking-tighter text-[#052742]">
          Meet the <span className="text-[#0DABAE]">Team</span>
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {COFOUNDERS.map((founder) => (
            <motion.div key={founder.id} variants={fadeUp} className="group cursor-pointer bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-[#0DABAE]" onClick={() => setSelectedFounder(founder)}>
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 md:mb-6 border border-slate-100 transition-all group-hover:shadow-[0_0_20px_rgba(13,171,174,0.2)]">
                <Image src={founder.imagePath} alt={founder.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052742]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <span className="text-white font-bold text-[10px] md:text-sm tracking-widest uppercase">Profile</span>
                </div>
              </div>
              <h3 className="text-base md:text-xl font-black text-[#052742] group-hover:text-[#0DABAE] transition-colors px-1 leading-tight">{founder.name}</h3>
              <p className="text-[10px] md:text-sm font-bold text-slate-500 mt-1 px-1">{founder.role.split(',')[0]}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ==========================================
// 🎓 ALUMNI SECTION (DARK DYNAMIC AURORA BLOBS)
// ==========================================
const AlumniSection = ({ alumniData, alumniIndex, displayedAlumni }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  const blob1X = useTransform(mouseX, [-0.5, 0.5], [80, -80]);
  const blob1Y = useTransform(mouseY, [-0.5, 0.5], [80, -80]);
  const blob2X = useTransform(mouseX, [-0.5, 0.5], [-60, 60]);
  const blob2Y = useTransform(mouseY, [-0.5, 0.5], [-60, 60]);

  return (
    <section id="alumni" onMouseMove={handleMouseMove} className="py-16 md:py-24 bg-[#031A2D] text-white overflow-hidden relative px-4 md:px-8">
      <motion.div style={{ x: blob1X, y: blob1Y }} className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0DABAE]/10 rounded-full blur-[100px] pointer-events-none transition-transform ease-out duration-500" />
      <motion.div style={{ x: blob2X, y: blob2Y }} className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none transition-transform ease-out duration-500" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-6">
           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center md:text-left">
             Alumni <span className="text-[#0DABAE]">Success</span>
           </h2>
           <Link href="/alumni" className="bg-[#0DABAE] hover:bg-white hover:text-[#052742] text-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-[10px] md:text-xs shrink-0 shadow-lg shadow-[#0DABAE]/20 hover:scale-105">
             Read All Stories →
           </Link>
         </div>
         
         {alumniData.length > 0 ? (
           <AnimatePresence mode="wait">
             <motion.div key={alumniIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
               {displayedAlumni.map((alumni: any, index: number) => (
                  alumni && (
                    <div key={`${alumni.id}-${index}`} className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:border-[#0DABAE]/50 transition-colors flex flex-col justify-between group h-full shadow-2xl">
                      <div>
                        <div className="text-3xl md:text-4xl text-[#0DABAE] mb-2 md:mb-4 font-serif group-hover:-translate-y-1 transition-transform">"</div>
                        <p className="italic text-sm leading-relaxed text-slate-300 mb-6">{alumni.short_quote}</p>
                      </div>
                      <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-auto">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#0DABAE] shrink-0 group-hover:scale-105 transition-transform">
                          <Image src={alumni.image_path} alt={alumni.name} fill sizes="(max-width: 768px) 48px, 64px" className="object-cover object-top" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs md:text-sm">{alumni.name}</div>
                          <div className="text-[9px] md:text-[10px] text-[#0DABAE] font-black uppercase tracking-widest">{alumni.company}</div>
                        </div>
                      </div>
                    </div>
                  )
               ))}
             </motion.div>
           </AnimatePresence>
         ) : (
           <div className="text-center text-slate-400 py-10 animate-pulse">Loading alumni stories...</div>
         )}
      </div>
    </section>
  )
}

// ==========================================
// 🚀 MAIN PAGE
// ==========================================
export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [selectedFounder, setSelectedFounder] = useState<any>(null)
  const [showPopup, setShowPopup] = useState(false)
  
  // CMS STATE
  const [alumniData, setAlumniData] = useState<any[]>([])
  const [alumniIndex, setAlumniIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false) }, 1000)
    const handleScroll = () => { if (window.scrollY > 600) setShowPopup(true) }
    window.addEventListener('scroll', handleScroll)
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll) }
  }, [])

  useEffect(() => {
    const fetchAlumni = async () => {
      const { data, error } = await supabase.from('alumni').select('*')
      if (data) setAlumniData(data)
      if (error) console.error("Error fetching alumni:", error)
    }
    fetchAlumni()
  }, [])

  useEffect(() => {
    if (alumniData.length === 0) return
    const carouselTimer = setInterval(() => {
      setAlumniIndex((prev) => (prev + 1) % alumniData.length)
    }, 3000)
    return () => clearInterval(carouselTimer)
  }, [alumniData])

  // Display exactly 4 alumni cards
  const displayedAlumni = alumniData.length > 0 ? [
    alumniData[alumniIndex % alumniData.length],
    alumniData[(alumniIndex + 1) % alumniData.length],
    alumniData[(alumniIndex + 2) % alumniData.length],
    alumniData[(alumniIndex + 3) % alumniData.length],
  ] : []

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className={inter.className}>
      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, y: "-100%", transition: { duration: 0.6, ease: "easeInOut" } }} className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center">
            <motion.svg viewBox="0 0 100 50" className="w-24 md:w-32 h-auto stroke-[#0DABAE] fill-none" style={{ strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <motion.path d="M 25,25 C 10,40 10,10 25,25 C 40,40 60,10 75,25 C 90,40 90,10 75,25 C 60,10 40,40 25,25 Z" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} />
            </motion.svg>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-[#052742] font-black tracking-widest uppercase text-sm">PLACED</motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white text-[#052742] scroll-smooth overflow-x-hidden">
        
        {/* NAVIGATION */}
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: isLoading ? 1.1 : 0 }} 
          className="flex items-center justify-between px-4 md:px-8 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100"
        >
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-full flex flex-col justify-center items-center gap-1 md:gap-1.5 hover:bg-slate-100 border border-slate-200 transition-colors z-50 relative">
              <motion.span animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-4 md:w-5 h-0.5 bg-[#052742] block transition-transform"></motion.span>
              <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 md:w-5 h-0.5 bg-[#052742] block transition-opacity"></motion.span>
              <motion.span animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-4 md:w-5 h-0.5 bg-[#052742] block transition-transform"></motion.span>
            </button>
            <Link href="/" className="relative w-28 md:w-32 h-8 md:h-10">
               <Image src="/placed-logo.jpg" alt="Placed Logo" fill sizes="(max-width: 768px) 100vw, 128px" className="object-contain object-left mix-blend-multiply" priority />
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: isLoading ? 1.2 : 0.1, duration: 0.5 }} className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2 rounded-full shadow-inner">
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

        {/* DROPDOWN MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-[#052742]/30 backdrop-blur-sm z-40" />
              <motion.div initial={{ opacity: 0, scale: 0.95, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: -20 }} transition={{ duration: 0.2, ease: "easeOut" }} className="fixed top-20 left-4 md:top-24 md:left-8 w-56 md:w-64 bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl p-6 md:p-8 border border-slate-100 flex flex-col gap-5 md:gap-6 z-50 text-left">
                <Link href="/programs" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Programs</Link>
                <Link href="/mentors" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Mentors</Link>
                <a href="/#leadership" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Leadership</a>
                <Link href="/alumni" onClick={() => setIsMenuOpen(false)} className="text-lg md:text-xl font-black text-[#052742] hover:text-[#0DABAE] transition-colors uppercase tracking-widest">Alumni</Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section className="bg-[#052742] pt-16 pb-16 md:pt-20 md:pb-24 px-4 md:px-8 relative overflow-hidden bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]">
          <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[#0DABAE]/20 blur-[120px] md:blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: isLoading ? 1.3 : 0.2 }} className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 md:mb-8 uppercase tracking-tighter">
                INFINITE <span className="text-[#0DABAE]">POSSIBILITIES.</span><br/>DEFINITE <span className="text-[#0DABAE]">OUTCOME.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: isLoading ? 1.5 : 0.4 }} className="text-base md:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto md:mx-0 mb-8 md:mb-12 font-medium">
                Combining technology with practical teaching methods to help learners build clarity, confidence, and capability. Real education for real-world contexts.
              </motion.p>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: isLoading ? 1.7 : 0.6 }}>
                <Link href="/programs" className="bg-[#0DABAE] text-white px-8 py-4 md:px-10 md:py-5 rounded-xl font-black text-base md:text-lg hover:scale-105 transition-transform inline-block shadow-2xl shadow-[#0DABAE]/30">
                  EXPLORE PROGRAMS
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: isLoading ? 1.5 : 0.4 }} className="flex justify-center relative mt-10 md:mt-0">
              <InteractiveCube />
              <p className="absolute -bottom-6 md:-bottom-8 text-[#0DABAE] text-[10px] md:text-xs font-bold uppercase tracking-widest pointer-events-none z-20 bg-[#052742]/80 px-3 py-1 rounded-full border border-[#0DABAE]/30">Drag me around</p>
            </motion.div>
          </div>
        </section>

        {/* WORKFLOW */}
        <WorkflowSection />

        {/* 7-PHASE ARCHITECTURE (SPLIT LAYOUT WITH EXACT VERBATIM COMPONENT) */}
        <section id="methodology" className="py-16 md:py-24 px-4 md:px-8 bg-[#052742] relative overflow-hidden text-white border-t border-white/5">
          <motion.div animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #0DABAE 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Our 7-Phase <span className="text-[#0DABAE] block mt-2">Architecture</span>
              </h2>
              <p className="text-slate-300 font-medium text-base md:text-lg max-w-lg mx-auto lg:mx-0">
                We don't just teach. We utilize a highly structured, interactive learning framework designed to build problem-solving ability and real-world readiness from day one.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center w-full">
              <InteractiveInfinity />
            </motion.div>
          </div>
        </section>

        {/* THE ECOSYSTEM */}
        <section id="ecosystem" className="py-16 md:py-24 px-4 md:px-8 bg-[#031A2D] relative overflow-hidden">
          <motion.div animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0DABAE 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto relative z-10">
            <motion.div variants={fadeUp} className="flex flex-col items-center md:items-start mb-10 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white text-center md:text-left">The Placed <span className="text-[#0DABAE]">Ecosystem</span></h2>
              <p className="mt-4 text-slate-400 font-medium max-w-2xl text-center md:text-left text-sm md:text-base">One connected framework supporting students across multiple career options. Move forward based on your goals and progress without fragmented training efforts.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {ECOSYSTEM_PILLARS.map((course) => (
                <motion.div key={course.id} variants={fadeUp}>
                  <Link href={`/programs/${course.id}`} className="block group bg-[#052742] rounded-xl text-white hover:-translate-y-2 shadow-xl hover:shadow-[#0DABAE]/20 relative overflow-hidden h-[280px] md:h-[320px] flex flex-col justify-end p-6 md:p-8 border border-white/5">
                    <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                      <Image src={course.imagePath} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031A2D] via-[#052742]/80 to-transparent z-10"></div>
                    <div className="relative z-20">
                      <span className="text-[10px] md:text-xs font-bold text-[#0DABAE] group-hover:text-white uppercase tracking-widest block mb-2 transition-colors">{course.level}</span>
                      <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight">{course.title}</h3>
                      <div className="flex justify-between items-center text-slate-300 group-hover:text-white font-medium text-xs md:text-sm mt-4 pt-4 border-t border-white/20">
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

        {/* MENTORS */}
        <MentorsSection setSelectedMentor={setSelectedMentor} />

        {/* TEAM (WHITE + DARK SPOTLIGHT) */}
        <TeamSection setSelectedFounder={setSelectedFounder} />

        {/* ALUMNI (DARK + BLOBS) */}
        <AlumniSection alumniData={alumniData} alumniIndex={alumniIndex} displayedAlumni={displayedAlumni} />

        {/* FOOTER */}
        <footer className="bg-[#02111E] py-10 md:py-16 px-4 md:px-8 border-t border-white/5 relative overflow-hidden text-slate-400">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative w-36 h-10 md:w-44 md:h-12 mb-4 bg-white rounded-xl overflow-hidden shadow-lg border border-slate-800">
                 <Image src="/placed-logo.jpg" alt="Placed Logo" fill sizes="200px" className="object-contain p-2" />
              </div>
              <p className="text-slate-400 font-medium leading-relaxed tracking-wide text-xs md:text-sm mb-4 max-w-sm">
                The premier EdTech platform for ambitious students. One system supporting every student's next step.
              </p>
              <span className="text-[#0DABAE] font-bold block text-xs uppercase tracking-widest">Infinite Possibilities.<br/>Definite Outcome.</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-white">Explore</h4>
              <ul className="space-y-2 md:space-y-3 text-sm font-medium">
                <li><Link href="/" className="hover:text-[#0DABAE] transition-colors">Home</Link></li>
                <li><Link href="/programs" className="hover:text-[#0DABAE] transition-colors">Programs</Link></li>
                <li><Link href="/mentors" className="hover:text-[#0DABAE] transition-colors">Mentors</Link></li>
                <li><Link href="/alumni" className="hover:text-[#0DABAE] transition-colors">Alumni Success</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-white">Support</h4>
              <ul className="space-y-2 md:space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-[#0DABAE] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#0DABAE] transition-colors">Help Center & FAQ</a></li>
                <li><a href="#" className="hover:text-[#0DABAE] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#0DABAE] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
              <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-white">Stay Updated</h4>
              <p className="text-xs md:text-sm font-medium mb-4 max-w-xs">Subscribe to get the latest updates on programs and placements.</p>
              <div className="flex w-full max-w-xs mb-6">
                <input type="email" placeholder="Email address" className="w-full bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#0DABAE] focus:bg-white/10 transition-colors" />
                <button className="bg-[#0DABAE] text-[#052742] px-4 py-2 rounded-r-lg font-black text-sm hover:bg-white transition-colors">Join</button>
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0DABAE] hover:text-[#052742] transition-all border border-white/10">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0DABAE] hover:text-[#052742] transition-all border border-white/10">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0DABAE] hover:text-[#052742] transition-all border border-white/10">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0DABAE] hover:text-[#052742] transition-all border border-white/10">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <p>© 2026 PLACED EDU. All rights reserved.</p>
            <p>Designed for the future.</p>
          </div>
        </footer>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[90] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer" aria-label="Chat with us on WhatsApp">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
          <svg className="w-8 h-8 md:w-10 md:h-10 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>

        {/* MODALS */}
        <AnimatePresence>
          {selectedMentor && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#052742]/80 backdrop-blur-md">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-xl p-8 md:p-10 max-w-md w-full shadow-2xl relative">
                <button onClick={() => setSelectedMentor(null)} className="absolute top-5 right-5 text-slate-400 hover:text-[#052742] transition-colors">✕</button>
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-[#0DABAE]/10 text-[#0DABAE] rounded-full flex items-center justify-center text-3xl md:text-4xl font-black mb-4 md:mb-6">{selectedMentor.initials}</div>
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

        <AnimatePresence>
          {showPopup && (
             <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90]">
                <div className="bg-white text-[#052742] p-5 md:p-6 rounded-xl shadow-2xl flex flex-col items-center max-w-[200px] md:max-w-[250px] border border-slate-100">
                   <p className="font-black text-center mb-3 md:mb-4 text-sm md:text-base">Ready to level up?</p>
                   <Link href="/signup" onClick={() => setShowPopup(false)} className="bg-[#052742] text-white px-5 py-2 md:px-6 md:py-2 rounded-lg font-bold text-xs md:text-sm hover:bg-[#0DABAE] transition-colors shadow-lg text-center">Partner With PLACED</Link>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}