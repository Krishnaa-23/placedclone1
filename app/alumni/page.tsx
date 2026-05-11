'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Inter } from 'next/font/google'
import { supabase } from '@/utils/supabase'

const inter = Inter({ subsets: ['latin'] })

export default function AlumniPage() {
  const [alumniData, setAlumniData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    const fetchAlumni = async () => {
      const { data } = await supabase.from('alumni').select('*')
      if (data) setAlumniData(data)
      setIsLoading(false)
    }
    fetchAlumni()
  }, [])

  return (
    <div onMouseMove={handleMouseMove} className={`min-h-screen bg-[#031A2D] text-white pt-24 pb-20 px-4 md:px-8 relative overflow-hidden ${inter.className}`}>
      {/* Floating Aurora Blobs */}
      <motion.div style={{ x: blob1X, y: blob1Y }} className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0DABAE]/10 rounded-full blur-[120px] pointer-events-none transition-transform ease-out duration-500" />
      <motion.div style={{ x: blob2X, y: blob2Y }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none transition-transform ease-out duration-500" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <Link href="/" className="text-[#0DABAE] hover:text-white font-bold text-xs md:text-sm mb-6 inline-block transition-colors uppercase tracking-widest">← Back to Home</Link>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Alumni <span className="text-[#0DABAE]">Success</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">Read the inspiring stories of our scholars who bridged the gap to their dream careers.</p>
        </div>

        {isLoading ? (
          <div className="text-center text-[#0DABAE] font-black animate-pulse py-20 uppercase tracking-widest">Loading success stories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {alumniData.map((alumni) => (
              <div key={alumni.id} className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-md hover:border-[#0DABAE]/50 transition-colors flex flex-col justify-between shadow-2xl hover:-translate-y-2 duration-300">
                <div>
                  <div className="text-4xl text-[#0DABAE] mb-2 font-serif">"</div>
                  <p className="italic text-sm leading-relaxed text-slate-300 mb-8">{alumni.testimony || alumni.short_quote}</p>
                </div>
                <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0DABAE] shrink-0">
                    <Image src={alumni.image_path} alt={alumni.name} fill className="object-cover object-top" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{alumni.name}</div>
                    <div className="text-[10px] text-[#0DABAE] font-black uppercase tracking-widest">{alumni.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}