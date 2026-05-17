'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type Message = { sender: 'user' | 'bot'; text: string }

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hi there! I am EduBuddy, your PLACED assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }])
    setInput('')
    setIsTyping(true)

    try {
      // 🚀 UPDATED: Pointing to your live Render backend!
      // Note: Make sure '/chat' matches the exact route in your friend's app_fastapi.py
      const response = await fetch('https://edubuddy-api-0wsz.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }), 
      })

      const data = await response.json()
      
      const botReply = data.answer || data.response || "I received your message, but my response format needs a quick tweak!"

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { sender: 'bot', text: 'Oops! I cannot reach the server right now. Is the FastAPI backend running?' }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Header */}
      <div className="bg-[#052742] text-white p-4 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-[#0DABAE] rounded-full flex items-center justify-center font-black text-[#052742] text-xl border-2 border-[rgba(255,255,255,0.2)]">
          E
        </div>
        <div>
          <h3 className="font-black text-lg leading-tight text-[#0DABAE]">EduBuddy</h3>
          <p className="text-[10px] text-slate-300 font-medium tracking-widest uppercase">Placed Assistant</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-[#0DABAE] text-[#052742] font-medium rounded-tr-sm' 
                : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 flex gap-1 shadow-sm">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#0DABAE] rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#0DABAE] rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#0DABAE] rounded-full" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-200 shrink-0 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..." 
          className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm text-[#052742] focus:outline-none focus:ring-2 focus:ring-[#0DABAE]/50 transition-all"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isTyping}
          className="bg-[#052742] text-[#0DABAE] p-2.5 rounded-xl hover:bg-[#0DABAE] hover:text-[#052742] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </form>
    </div>
  )
}