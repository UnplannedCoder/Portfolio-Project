import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Download, Sparkles, BarChart2, Code2, CreditCard, EyeOff } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'
import { Meteors } from '@/components/magicui/meteors'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { LanyardErrorBoundary } from '@/components/lanyard/LanyardErrorBoundary'
import Lanyard from '@/components/lanyard/Lanyard'
// Preload the GLB model so it's cached before the card is shown
import { useGLTF } from '@react-three/drei'
import cardGLB from '@/assets/lanyard/card.glb'

// Kick off GLB download immediately when the module loads —
// by the time the user clicks Show Card the model is already in memory
useGLTF.preload(cardGLB as string)

const roles = [
  'Data Analyst',
  'Full Stack Developer',
]

function RoleRotator() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex(p => (p + 1) % roles.length), 2800)
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
  const [showCard, setShowCard] = useState(false)

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  // Preload photo and lanyard texture so they're cached before Show Card is clicked
  useEffect(() => {
    const assets = ['/photo/photo.jpg', '/skills/../assets/lanyard/lanyard.png']
    assets.forEach(src => {
      const img = new Image()
      img.src = src
    })
    // Also prefetch the photo via fetch so it lands in the HTTP cache
    fetch('/photo/photo.jpg', { priority: 'low' } as RequestInit).catch(() => {})
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-zinc-950"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Meteors number={12} />
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

          {/* ── LEFT: text content ── */}
          <div className={`flex flex-col items-center text-center transition-all duration-500 ${showCard ? 'lg:items-start lg:text-left lg:w-1/2' : 'w-full'}`}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open to Internship &amp; Entry-Level Opportunities</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>



            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 leading-tight">
                <span className="text-white">Hi, I'm </span>
                <SparklesText
                  text="Pawan Sain"
                  className="inline-block"
                  sparklesCount={10}
                  colors={{ first: '#9E7AFF', second: '#60a5fa' }}
                />
              </h1>
            </motion.div>

            {/* Role rotator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="text-xl md:text-2xl font-semibold text-zinc-300 mb-4 h-9 flex items-center gap-2"
            >
              <span className="text-zinc-400">I'm a</span>
              <RoleRotator />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="text-base text-zinc-500 max-w-xl mb-8 leading-relaxed"
            >
              {personalInfo.tagline} · JECRC University · Jaipur
            </motion.p>

            {/* Skill pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
            >
              {['Python', 'SQL', 'Power BI', 'Excel', 'React.js', 'Node.js'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {s}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 active:scale-95"
              >
                <BarChart2 className="w-4 h-4" />
                View My Work
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-violet-500/60 bg-violet-600/10 hover:bg-violet-600/20 text-violet-300 hover:text-white font-semibold transition-all duration-300 hover:border-violet-400"
              >
                <Code2 className="w-4 h-4" />
                Get In Touch
              </button>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                download="Pawan_Sain_Resume.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white font-medium transition-all duration-300 hover:bg-violet-600/10"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>

              {/* ── Show / Hide Card button ── */}
              <motion.button
                onClick={() => setShowCard(v => !v)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                  showCard
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gradient-to-r from-cyan-600/20 to-violet-600/20 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:from-cyan-600/30 hover:to-violet-600/30'
                }`}
              >
                {showCard
                  ? <><EyeOff className="w-4 h-4" /> Hide Card</>
                  : <><CreditCard className="w-4 h-4" /> Show Card</>
                }
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.82 }}
              className="flex items-center justify-center lg:justify-start gap-3"
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
          </div>

          {/* ── RIGHT: Lanyard 3-D card ── */}
          <AnimatePresence>
            {showCard && (
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.92 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full lg:w-1/2 shrink-0"
                style={{ height: '700px' }}
              >
                <LanyardErrorBoundary
                  key="lanyard-card"
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                        <CreditCard className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                        <p className="text-zinc-400 text-sm font-medium mb-1">Card failed to load</p>
                        <p className="text-zinc-600 text-xs">Check browser console for details</p>
                      </div>
                    </div>
                  }
                >
                  <Lanyard
                    position={[0, 0, 17]}
                    gravity={[0, -40, 0]}
                    fov={16}
                    transparent={true}
                    frontImage="/photo/photo.jpg"
                    imageFit="cover"
                  />
                </LanyardErrorBoundary>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll cue — centered below both columns */}
        <motion.div className="flex justify-center mt-12">
          <motion.button
            onClick={scrollToProjects}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="text-zinc-600 hover:text-violet-400 transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
