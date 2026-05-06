'use client'

import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import Link from 'next/link'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  // 1. Add state to track if submission was successful
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() 
    setLoading(true)
    
    if (!email && !phone) {
      alert("Please provide either an email or a phone number!")
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, phone }])

    if (error) {
      alert("Uh oh! Something went wrong: " + error.message)
      setLoading(false)
    } else {
      // 2. Instead of an alert, we trigger the success UI
      setIsSubmitted(true)
      setLoading(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/[^0-9]/g, ''))
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-2 transition-colors">
          ← Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-[0_0_50px_rgba(20,184,166,0.15)] relative overflow-hidden">
        
        {/* 3. CONDITIONAL RENDERING: If submitted, show Thank You. Otherwise, show Form. */}
        {isSubmitted ? (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              ✅
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Application Received!</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Thanks for applying, <span className="text-slate-900 font-bold">{name}</span>! Our admissions team will review your profile and contact you soon.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-500 transition-all"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-teal-500 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg shadow-teal-500/30">P</div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Join the Cohort</h2>
              <p className="text-gray-500 mt-2 font-medium">Start your journey to a tech career.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="john doe"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink-0 mx-4 text-slate-300 text-[10px] font-black uppercase tracking-widest">Or</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="9876543210"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-slate-900 hover:bg-teal-500 text-white font-black py-5 px-4 rounded-2xl transition-all transform active:scale-95 shadow-xl disabled:opacity-50 uppercase tracking-widest text-sm"
              >
                {loading ? 'Processing...' : 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}