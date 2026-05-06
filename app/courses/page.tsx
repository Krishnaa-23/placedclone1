'use client'

import Link from 'next/link'
import Image from 'next/image'
// Added "Variants" to the import
import { motion, Variants } from 'framer-motion'
// Imports from the data.ts file we created earlier!
import { COURSES } from '../data'

// Explicitly typed as Variants to fix the warning
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Simple Header */}
      <nav className="px-8 py-6 bg-white border-b border-slate-100 flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors font-bold text-xl">←</Link>
        <span className="text-xl font-black uppercase tracking-tighter">All Programs</span>
      </nav>

      {/* Hero */}
      <header className="py-20 px-8 text-center max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          Accelerate Your <span className="text-teal-500">Career.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-500 font-medium">
          Industry-vetted curriculums designed to take you from a learner to a high-earning professional.
        </motion.p>
      </header>

      {/* Course Grid */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <motion.div key={course.id} variants={fadeUp}>
            <Link href={`/courses/${course.id}`} className="block group bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-teal-500/20 hover:-translate-y-2 transition-all border border-slate-100 flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <Image src={course.imagePath} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-teal-600 shadow-lg">
                  {course.level}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black mb-3 text-slate-900">{course.title}</h3>
                <p className="text-slate-500 mb-6 text-sm font-medium leading-relaxed flex-grow">{course.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
                  <span className="font-bold text-slate-400">{course.duration}</span>
                  <span className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold group-hover:bg-teal-500 transition-colors shadow-md">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}