'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
  { title: 'Entrance Examinations', desc: 'Structured preparation for highly competitive postgraduate exams including CAT, GATE, GRE, and GMAT.' },
  { title: 'Profile Building', desc: 'Strategic guidance on certifications, internships, and research papers to build a globally competitive academic profile.' },
  { title: 'SOP & Essay Crafting', desc: 'Expert assistance in drafting compelling Statements of Purpose, application essays, and professional resumes.' },
  { title: 'University Selection', desc: 'Data-driven counseling to match students with the right programs, universities, and scholarship opportunities.' }
]

export default function AcademicNavigatorPage() {
  const router = useRouter()

  return (
    <div className={`min-h-screen bg-[#052742] text-white pt-24 pb-24 px-4 md:px-8 relative overflow-hidden ${inter.className}`}>
      
      {/* Animated Grid & Glow Background */}
      <motion.div animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #0DABAE 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#0DABAE]/10 to-transparent blur-[100px] pointer-events-none z-0" />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl mx-auto relative z-10">
        
        {/* Dynamic Back Button */}
        <button 
          onClick={() => router.back()} 
          className="text-[#0DABAE] hover:text-white font-bold text-xs md:text-sm mb-8 inline-block transition-colors uppercase tracking-widest text-left"
        >
          ← Go Back
        </button>
        
        <div className="mb-16 md:mb-24">
          <motion.span variants={fadeUp} className="text-[#052742] font-black tracking-widest uppercase text-xs md:text-sm block mb-4 bg-white w-max px-4 py-1.5 rounded-full">
            Higher Studies Focus
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Academic <span className="text-[#0DABAE]">Navigator</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-300 max-w-3xl text-base md:text-lg leading-relaxed font-medium">
            Not every student takes the same path. We guide students through postgraduate programs, professional courses, and flexible learning pathways so they can make informed academic decisions without confusion. Clarity is the ultimate competitive advantage.
          </motion.p>
        </div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {MODULES.map((mod, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-[#031A2D]/80 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:border-[#0DABAE] transition-all shadow-xl group">
              <div className="w-12 h-12 bg-white/5 text-white font-black rounded-xl flex items-center justify-center text-lg mb-6 group-hover:bg-[#0DABAE] group-hover:text-[#052742] transition-colors">0{idx + 1}</div>
              <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#0DABAE] transition-colors">{mod.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{mod.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="bg-gradient-to-r from-[#031A2D] to-[#052742] border-t border-b border-[#0DABAE]/30 py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-2 h-full bg-[#0DABAE]"></div>
          <div className="px-8 md:px-12">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-white">Guide the Leaders of Tomorrow</h3>
            <p className="font-medium text-slate-400 max-w-xl text-sm">Provide your students with premier counseling and higher education roadmaps.</p>
          </div>
          <div className="px-8 md:px-12">
             <Link href="/signup" className="bg-white text-[#052742] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#0DABAE] transition-colors shrink-0 inline-block shadow-xl">
               Book a Consultation
             </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}