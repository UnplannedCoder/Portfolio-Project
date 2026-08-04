import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Calendar, BookOpen } from 'lucide-react'
import { certificates } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// Issuer accent colours
const issuerAccent: Record<string, { border: string; text: string }> = {
  'Google / Coursera':    { border: 'hover:border-red-500/40',     text: 'text-red-400' },
  'Microsoft / Coursera': { border: 'hover:border-blue-500/40',    text: 'text-blue-400' },
  'Deloitte / Forage':    { border: 'hover:border-green-500/40',   text: 'text-green-400' },
  'Meta / Coursera':      { border: 'hover:border-indigo-500/40',  text: 'text-indigo-400' },
  'HP LIFE':              { border: 'hover:border-cyan-500/40',    text: 'text-cyan-400' },
  'HackerRank':           { border: 'hover:border-emerald-500/40', text: 'text-emerald-400' },
  'GeeksforGeeks':        { border: 'hover:border-lime-500/40',    text: 'text-lime-400' },
}
const defaultAccent = { border: 'hover:border-violet-500/40', text: 'text-violet-400' }

type Cert = typeof certificates[0]

function CertCard({ cert }: { cert: Cert }) {
  const accent = issuerAccent[cert.issuer] ?? defaultAccent

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40',
        accent.border,
      )}
    >
      {/* ── Certificate image (the star of the show) ── */}
      <div className="relative w-full overflow-hidden bg-white">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
        />
        {/* Subtle dark fade at the bottom to blend into card body */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900/60 to-transparent pointer-events-none" />
      </div>

      {/* ── Card body ── */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-bold text-white leading-snug group-hover:text-violet-200 transition-colors">
          {cert.title}
        </h3>

        <p className={cn('text-xs font-semibold', accent.text)}>{cert.issuer}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {cert.date}
          </span>
          {cert.courses && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {cert.courses} courses
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs bg-zinc-800 text-zinc-400 border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Certificates() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certificates" className="relative py-24 bg-zinc-950/60">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
              Credentials & Achievements
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="gradient-text">Certificates</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-violet-400 shrink-0" />
              {certificates.length} professional certifications from Google, Microsoft, Meta, Deloitte &amp; more
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto mt-4" />
          </motion.div>

          {/* Grid — 4 columns on lg, 2 on md, 1 on sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificates.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
