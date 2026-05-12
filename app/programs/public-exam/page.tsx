'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const MODULES = [
  { title: 'Banking (IBPS, SBI)', desc: 'High-speed quantitative analysis, logical reasoning, and financial awareness tailored for modern banking examinations.' },
  { title: 'SSC & Central Govt', desc: 'Comprehensive coverage of general intelligence, quantitative aptitude, English comprehension, and general awareness.' },
  { title: 'Railway Exams (RRB)', desc: 'Focused preparation on technical aptitude, general science, and rapid problem-solving frameworks.' },
  { title: 'State Level PSC', desc: 'Customized curriculum addressing state-specific history, geography, and administrative structures.' }
]

export default function PublicExamPage() {
  const router = useRouter()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e
    const { width, height, left, top } = currentTarget.getBoundingClientRect()
    mouseX.set((clientX - left) / width - 0.5)
    mouseY.set((clientY - top) / height - 0.5)
  }

  const blob1X = useTransform(mouseX, [-0.5, 0.5], [80, -80])
  const blob1Y = useTransform(mouseY, [-0.5, 0.5], [80, -80])
  const blob2X = useTransform(mouseX, [-0.5, 0.5], [-60, 60])
  const blob2Y = useTransform(mouseY, [-0.5, 0.5], [-60, 60])

  return (
    <div onMouseMove={handleMouseMove} className={`min-h-screen bg-[#031A2D] text-white pt-24 pb-24 px-4 md:px-8 relative overflow-hidden ${inter.className}`}>
      {/* Floating Aurora Blobs */}
      <motion.div style={{ x: blob1X, y: blob1Y }} className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#0DABAE]/15 rounded-full blur-[120px] pointer-events-none transition-transform ease-out duration-500" />
      <motion.div style={{ x: blob2X, y: blob2Y }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none transition-transform ease-out duration-500" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl mx-auto relative z-10">
        
        {/* Dynamic Back Button */}
        <button 
          onClick={() => router.back()} 
          className="text-[#0DABAE] hover:text-white font-bold text-xs md:text-sm mb-8 inline-block transition-colors uppercase tracking-widest text-left"
        >
          ← Go Back
        </button>
        
        <div className="mb-16 md:mb-24">
          <motion.span variants={fadeUp} className="text-white font-black tracking-widest uppercase text-xs md:text-sm block mb-4 border border-white/20 bg-white/5 w-max px-4 py-1.5 rounded-full">
            Govt. Exam Focus
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Public Exam <span className="text-[#0DABAE]">Foundation</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-300 max-w-3xl text-base md:text-lg leading-relaxed font-medium">
            Designed to help students build a strong foundation for highly competitive public sector exams. We introduce students early to the structure and demands of national-level government careers through timed drills, concept-based exercises, and simulated test environments.
          </motion.p>
        </div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {MODULES.map((mod, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-[#052742]/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:border-[#0DABAE]/50 transition-colors shadow-2xl">
              <div className="w-12 h-12 border-2 border-[#0DABAE] text-[#0DABAE] font-black rounded-full flex items-center justify-center text-lg mb-6">0{idx + 1}</div>
              <h3 className="text-xl font-black text-white mb-3">{mod.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{mod.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-white">Empower Public Sector Aspirants</h3>
            <p className="font-medium text-slate-400 max-w-xl text-sm">Bring structured public exam preparation directly to your institution.</p>
          </div>
          <Link href="/signup" className="bg-[#0DABAE] text-[#052742] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white transition-colors shrink-0 shadow-[0_0_20px_rgba(13,171,174,0.3)]">
            Schedule a Demo
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}