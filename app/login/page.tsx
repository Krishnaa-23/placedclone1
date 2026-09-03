'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  GraduationCap,
  ShieldAlert,
  Lock,
  User,
  ArrowRight,
  ChevronLeft,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react'

type RoleType = 'tpo' | 'student' | 'admin' | null

const ROLES = [
  {
    id: 'tpo' as RoleType,
    label: 'Faculty / TPO',
    description: 'Placement Officer & Faculty Command Center',
    icon: ShieldCheck,
    demoUser: 'tpo@placed.edu',
    demoPass: 'admin123',
    route: '/tpo-dashboard'
  },
  {
    id: 'student' as RoleType,
    label: 'Student',
    description: 'Career Readiness & Drive Applications',
    icon: GraduationCap,
    demoUser: '2026CS108',
    demoPass: 'student123',
    route: '/student-dashboard'
  },
  {
    id: 'admin' as RoleType,
    label: 'Admin',
    description: 'System Administration & Governance',
    icon: ShieldAlert,
    demoUser: 'admin@placed.edu',
    demoPass: 'system123',
    route: '/admin-dashboard'
  }
]

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<RoleType>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const activeRole = ROLES.find(r => r.id === selectedRole)

  const handleSelectRole = (role: RoleType) => {
    setSelectedRole(role)
    setErrorMsg('')
    const r = ROLES.find(item => item.id === role)
    if (r) {
      setUsername(r.demoUser)
      setPassword(r.demoPass)
    }
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (selectedRole === 'student' || selectedRole === 'admin') {
      setErrorMsg('This portal dashboard is being updated with the latest repository changes by the team.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (activeRole) {
        router.push(activeRole.route)
      }
    }, 700)
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#052742] font-sans selection:bg-[#00A79D] selection:text-white">

      {/* ============================================================ */}
      {/* LEFT PANEL — PLACED Brand (hidden on mobile, shown on lg+)   */}
      {/* ============================================================ */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 xl:p-16 relative overflow-hidden">

        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00A79D18_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        {/* Glow blobs */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00A79D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#00A79D]/8 rounded-full blur-2xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00A79D] flex items-center justify-center shadow-lg shadow-[#00A79D]/30">
            <GraduationCap className="w-6 h-6 text-[#052742]" />
          </div>
          <div>
            <span className="text-xl font-black text-white tracking-wider">PLACED</span>
            <p className="text-[10px] text-[#00A79D] font-bold uppercase tracking-widest">Career Intelligence</p>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A79D]/15 border border-[#00A79D]/30 text-[#00A79D] text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A79D] animate-pulse" />
            Institutional Multi-Role Gateway
          </div>

          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight uppercase">
            INFINITE<br />
            <span className="text-[#00A79D]">POSSIBILITIES.</span><br />
            DEFINITE<br />
            <span className="text-[#00A79D]">OUTCOME.</span>
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed font-medium max-w-sm">
            Empowering institutions with structured career readiness, placement competency assessments, and corporate hiring intelligence.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { value: '10K+', label: 'Students Trained' },
              { value: '40+', label: 'Colleges' },
              { value: '95%', label: 'Placement Rate' }
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-xl font-black text-[#00A79D]">{stat.value}</div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-slate-500 font-medium">
          © 2026 PLACED Platform · All Rights Reserved
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT PANEL — White login panel (full width on mobile)       */}
      {/* ============================================================ */}
      <div className="w-full lg:w-[460px] xl:w-[500px] bg-white flex flex-col min-h-screen lg:min-h-0 lg:h-screen relative z-10 overflow-y-auto">

        {/* Scrollable inner content */}
        <div className="flex flex-col justify-between flex-1 p-6 sm:p-8 md:p-10">

          {/* Mobile-only top header */}
          <div className="flex lg:hidden items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00A79D] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-black text-[#052742] tracking-wider">PLACED</span>
                <p className="text-[9px] text-[#00A79D] font-bold uppercase tracking-widest leading-none">Career Intelligence</p>
              </div>
            </div>
            {/* Live badge */}
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Online
            </span>
          </div>

          {/* Mobile hero strip (shows only on small screens) */}
          <div className="lg:hidden mb-6 p-4 rounded-2xl bg-[#052742] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#00A79D18_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="relative z-10 space-y-1">
              <p className="text-[10px] text-[#00A79D] font-bold uppercase tracking-widest">Institutional Access Portal</p>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase leading-tight">
                INFINITE <span className="text-[#00A79D]">POSSIBILITIES.</span>
              </h2>
              <div className="flex gap-3 pt-2">
                {[
                  { value: '10K+', label: 'Students' },
                  { value: '40+', label: 'Colleges' },
                  { value: '95%', label: 'Placed' }
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-sm font-black text-[#00A79D]">{s.value}</div>
                    <div className="text-[9px] text-slate-400 uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ——— MAIN INTERACTIVE AREA ——— */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!selectedRole ? (
                /* STEP 1: ROLE CARDS */
                <motion.div
                  key="role-cards"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#052742] tracking-tight uppercase">
                      Welcome Back
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Select your role to access your portal
                    </p>
                  </div>

                  <div className="space-y-3">
                    {ROLES.map((role) => {
                      const Icon = role.icon
                      return (
                        <button
                          key={role.id}
                          onClick={() => handleSelectRole(role.id)}
                          className="w-full group bg-white active:scale-[0.98] hover:bg-[#052742] border border-slate-200 hover:border-[#052742] rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#052742]/8 group-hover:bg-white/15 flex items-center justify-center transition-colors shrink-0">
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#052742] group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-left">
                              <div className="text-sm font-bold text-[#052742] group-hover:text-white transition-colors">
                                {role.label} Login
                              </div>
                              <div className="text-[11px] text-slate-400 group-hover:text-white/60 transition-colors font-medium hidden sm:block">
                                {role.description}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                        </button>
                      )
                    })}
                  </div>

                  <p className="text-[11px] text-slate-400 text-center font-medium">
                    Need help? Contact <span className="text-[#00A79D] font-bold">support@placed.edu</span>
                  </p>
                </motion.div>
              ) : (
                /* STEP 2: CREDENTIAL FORM */
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Back button */}
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#052742] active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Switch Role
                  </button>

                  {/* Role banner */}
                  <div className="flex items-center gap-3 p-3.5 sm:p-4 bg-[#052742] rounded-2xl">
                    {activeRole && (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                        <activeRole.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A79D]" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-black text-white">{activeRole?.label} Login</div>
                      <div className="text-[11px] text-slate-400 font-medium hidden sm:block">{activeRole?.description}</div>
                    </div>
                  </div>

                  {/* Error */}
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5 sm:space-y-4">
                    {/* Username */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                        {selectedRole === 'student' ? 'Roll No / Email' : 'Email / Username'}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder={activeRole?.demoUser}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#052742] placeholder:text-slate-400 focus:outline-none focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Password</label>
                        <a href="#" className="text-[11px] text-[#00A79D] hover:underline font-semibold">Forgot Password?</a>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#052742] placeholder:text-slate-400 focus:outline-none focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20 transition-all font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded accent-[#00A79D]"
                      />
                      <span className="text-xs text-slate-500 font-medium">Keep me signed in</span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 sm:py-3.5 rounded-xl bg-[#052742] hover:bg-[#00A79D] active:scale-[0.98] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Sign In to {activeRole?.label} Portal</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Demo credentials */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-center text-slate-500 font-mono break-all">
                    Demo: <strong className="text-[#052742]">{username}</strong> · <strong className="text-[#052742]">{password}</strong>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="text-center text-[10px] text-slate-400 font-medium pt-6 mt-4 border-t border-slate-100">
            © 2026 PLACED · Placement & Career Intelligence Platform
          </div>
        </div>
      </div>
    </div>
  )
}
