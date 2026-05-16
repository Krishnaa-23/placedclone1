'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Inter } from 'next/font/google'
import { supabase } from '@/utils/supabase' // Connects to the file we just made

const inter = Inter({ subsets: ['latin'] })

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // State to hold the user's typed input
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: ''
  })

  // The REAL Supabase submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Send data to the 'leads' table in Supabase
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          full_name: formData.fullName, 
          email: formData.email, 
          phone: formData.phone, 
          user_type: formData.userType 
        }
      ])

    setIsSubmitting(false)

    if (error) {
      alert("Something went wrong: " + error.message)
      console.error(error)
    } else {
      setIsSuccess(true)
    }
  }

  return (
    <div className={`min-h-screen flex bg-slate-50 ${inter.className}`}>
      
      {/* LEFT SIDE - BRANDING */}
      <div className="hidden lg:flex w-1/2 bg-[#052742] text-white flex-col justify-between p-16 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#0DABAE]/20 blur-[100px] rounded-full pointer-events-none"
        />

        <div className="relative z-10">
          <Link href="/" className="inline-block mb-16 hover:opacity-80 transition-opacity">
            <div className="relative w-32 h-10 bg-white rounded-lg p-2">
               <Image src="/placed-logo.jpg" alt="Placed Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl font-black mb-6 leading-tight">
            Empowering Institutions. <span className="text-[#0DABAE]">Advancing Student Outcomes.</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-slate-300 text-lg mb-12 max-w-md font-medium">
            PLACED partners with colleges and academic institutions to deliver structured career readiness programs, competitive exam preparation frameworks, and industry-oriented student development initiatives designed for long-term student success.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-6">
            {["Corporate Readiness & Employability Training", "Competitive Exam & Aptitude Development", " Industry-Aligned Career Progression Support"].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[#0DABAE]/20 flex items-center justify-center text-[#0DABAE] shrink-0 font-bold">✓</div>
                <p className="text-sm font-bold tracking-wide">{feature}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 text-xs font-bold text-slate-500 uppercase tracking-widest">
          © 2026 PLACED. Infinite Possibilities.
        </div>
      </div>

      {/* RIGHT SIDE - THE FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 relative">
        <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-400 hover:text-[#052742] transition-colors">
          ✕ Close
        </Link>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-3xl font-black text-[#052742] mb-3">Partner With Us</h2>
                  <p className="text-slate-500 text-sm font-medium">Share your institution details and our partnership team will connect with you to explore collaboration opportunities.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#052742] uppercase tracking-widest">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#0DABAE] focus:ring-2 focus:ring-[#0DABAE]/20 transition-all font-medium" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#052742] uppercase tracking-widest">OFFICIAL Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#0DABAE] focus:ring-2 focus:ring-[#0DABAE]/20 transition-all font-medium" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#052742] uppercase tracking-widest">cONTACT Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#0DABAE] focus:ring-2 focus:ring-[#0DABAE]/20 transition-all font-medium" 
                    />
                  </div>
                  

                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#052742] uppercase tracking-widest">I am a...</label>
                    <select 
                      required 
                      value={formData.userType}
                      onChange={(e) => setFormData({...formData, userType: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#0DABAE] focus:ring-2 focus:ring-[#0DABAE]/20 transition-all font-medium appearance-none"
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="student">College Representative</option>
                      <option value="Training">Training & Placement Officer</option>
                      <option value="institution">Institution Administrator</option>
                      <option value="faculty">Faculty coordinator</option>
                      <option value="academic">Academic Partner</option>
                      <option value="Corporate">Corporate Partner</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#052742] text-white py-4 rounded-xl font-black text-sm hover:bg-[#0DABAE] transition-colors shadow-lg mt-4 flex justify-center items-center h-14 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "SUBMIT APPLICATION"
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-[#0DABAE]/10 text-[#0DABAE] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
                <h2 className="text-3xl font-black text-[#052742] mb-4">Request Sent!</h2>
                <p className="text-slate-500 font-medium mb-8">Thank you for your interest in PLACED. Our team will reach out to you within 24 hours.</p>
                <Link href="/" className="inline-block bg-[#052742] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#0DABAE] transition-colors shadow-lg">
                  Return to Home
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}