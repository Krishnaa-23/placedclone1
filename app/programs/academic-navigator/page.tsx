'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
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
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div onMouseMove={handleMouseMove} className={`min-h-screen bg-[#02111E] text-white pt-24 pb-24 px-4 md:px-8 relative overflow-hidden group ${inter.className}`}>
      {/* Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(13, 171, 174, 0.15), transparent 70%)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0"></div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl mx-auto relative z-10">
        
        {/* Dynamic Back Button */}
        <button 
          onClick={() => router.back()} 
          className="text-[#0DABAE] hover:text-white font-bold text-xs md:text-sm mb-8 inline-block transition-colors uppercase tracking-widest text-left"
        >
          ← Go Back
        </button>
        
        <div className="mb-16 md:mb-24">
          <motion.span variants={fadeUp} className="text-[#0DABAE] font-black tracking-widest uppercase text-xs md:text-sm block mb-4 border border-[#0DABAE]/30 bg-[#0DABAE]/10 w-max px-4 py-1.5 rounded-full">
            Higher Studies Focus
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Academic <span className="text-[#0DABAE]">Navigator</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-400 max-w-3xl text-base md:text-lg leading-relaxed font-medium">
            Not every student takes the same path. We guide students through postgraduate programs, professional courses, and flexible learning pathways so they can make informed academic decisions without confusion. Clarity is the ultimate competitive advantage.
          </motion.p>
        </div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {MODULES.map((mod, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-[#0DABAE] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(13,171,174,0.15)] transition-all duration-300 shadow-xl relative z-10 group cursor-default">
              <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#0DABAE] transition-colors">{mod.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{mod.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="bg-[#0DABAE] rounded-2xl p-8 md:p-12 text-[#052742] flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_40px_rgba(13,171,174,0.3)] relative z-10">
          <div>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2">Guide the Leaders of Tomorrow</h3>
            <p className="font-medium text-[#052742]/80 max-w-xl">Provide your students with premier counseling and higher education roadmaps.</p>
          </div>
          <Link href="/signup" className="bg-[#052742] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#052742] transition-colors shrink-0">
            Book a Consultation
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}