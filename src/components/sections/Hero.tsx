import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Download, Sparkles, BarChart2, Code2 } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'
import { Meteors } from '@/components/magicui/meteors'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { BorderBeam } from '@/components/magicui/border-beam'

const roles = [
  'Data Analyst',
  'Full Stack Developer'
]

function RoleRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={roles[index]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="gradient-text"
      >
        {roles[index]}
      </motion.span>
    </AnimatePresence>
  )
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Meteors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Meteors number={12} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open to Internship & Entry-Level Opportunities</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Avatar + Name row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-24 h-24">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-600/50 to-cyan-500/40 border border-violet-500/30 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-violet-500/20">
              PS
            </div>
            <div className="absolute -inset-1 rounded-full">
              <BorderBeam size={100} duration={6} colorFrom="#9E7AFF" colorTo="#38bdf8" />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3 leading-tight">
            <span className="text-white">Hi, I'm </span>
            <SparklesText
              text="Pawan Sain"
              className="inline-block"
              sparklesCount={10}
              colors={{ first: '#9E7AFF', second: '#60a5fa' }}
            />
          </h1>
        </motion.div>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="text-xl md:text-2xl font-semibold text-zinc-300 mb-5 h-9 flex items-center justify-center gap-2"
        >
          <span className="text-zinc-400">I'm a</span>
          <RoleRotator />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.54 }}
          className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline} · JECRC University · Jaipur
        </motion.p>

        {/* Quick skill pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.62 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {['Python', 'SQL', 'Power BI', 'Excel', 'React.js', 'Node.js'].map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          {/* View Work */}
          <button
            onClick={scrollToAbout}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 active:scale-95"
          >
            <BarChart2 className="w-4 h-4" />
            View My Work
          </button>

          {/* Get in touch */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-7 py-3 rounded-xl border border-violet-500/60 bg-violet-600/10 hover:bg-violet-600/20 text-violet-300 hover:text-white font-semibold transition-all duration-300 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <Code2 className="w-4 h-4" />
            Get In Touch
          </button>

          {/* Resume */}
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white font-medium transition-all duration-300 hover:bg-violet-600/10"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.82 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          {[
            { icon: Github, href: personalInfo.github, label: 'GitHub' },
            { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center glass text-zinc-400 hover:text-white hover:border-violet-500/50 transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-zinc-600 hover:text-violet-400 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  )
}
