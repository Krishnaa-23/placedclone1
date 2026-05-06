'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ALUMNI_DATA } from '../page'

export default function AlumniPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navbar Minimal */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-slate-900 group-hover:bg-teal-500 transition-colors rounded-lg flex items-center justify-center text-white font-bold text-xl">←</div>
          <span className="text-xl font-black text-slate-900">Back to Placed.</span>
        </Link>
      </nav>

      {/* Header */}
      <header className="bg-slate-900 text-white py-24 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 relative z-10">
          The Wall of <span className="text-teal-400">Success.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10">
          Real stories from real students who transformed their careers through our intensive mentorship and training programs.
        </p>
      </header>

      {/* Testimonials Grid */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {ALUMNI_DATA.map((alumni) => (
            <div key={alumni.id} className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
              
              {/* Top Row: Image & Name */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                {/* FIXED: Added shrink-0 and object-top */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-teal-50 shadow-lg shrink-0">
                  <Image src={alumni.imagePath} alt={alumni.name} fill className="object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{alumni.name}</h3>
                  <div className="inline-block mt-2 px-3 py-1 bg-teal-50 text-teal-600 font-black text-xs uppercase tracking-widest rounded-full">
                    {alumni.company}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Full Testimony */}
              <div className="relative flex-grow">
                <div className="absolute -top-4 -left-4 text-6xl text-slate-100 font-serif font-black pointer-events-none">"</div>
                <p className="text-slate-600 leading-relaxed relative z-10 font-medium text-lg whitespace-pre-line">
                  {alumni.testimony}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-teal-500 py-24 px-8 text-center text-white">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Ready to be our next success story?</h2>
        <Link href="/signup" className="bg-slate-900 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform inline-block shadow-2xl">
          APPLY FOR THE COHORT
        </Link>
      </section>

    </div>
  )
}