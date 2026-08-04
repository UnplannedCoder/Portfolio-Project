import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills, techStack } from '@/data/portfolio'
import { Marquee } from '@/components/magicui/marquee'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function SkillBar({ name, level, icon, delay = 0 }: { name: string; level: number; icon: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <span>{icon}</span> {name}
        </span>
        <span className="text-violet-400 font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
        />
      </div>
    </div>
  )
}

function TechBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-zinc-300 text-sm font-medium whitespace-nowrap hover:border-violet-500/40 hover:text-white transition-colors cursor-default">
      <span className="w-2 h-2 rounded-full bg-violet-400" />
      {name}
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const firstRow = techStack.slice(0, Math.ceil(techStack.length / 2))
  const secondRow = techStack.slice(Math.ceil(techStack.length / 2))

  return (
    <section id="skills" className="relative py-24 bg-zinc-950/50">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
              What I Work With
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills & <span className="gradient-text">Tech Stack</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto" />
          </motion.div>

          {/* Marquee tech stack */}
          <motion.div variants={itemVariants} className="mb-16 overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] mb-3" repeat={3}>
              {firstRow.map((tech) => (
                <TechBadge key={tech.name} name={tech.name} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:25s]" repeat={3}>
              {secondRow.map((tech) => (
                <TechBadge key={tech.name} name={tech.name} />
              ))}
            </Marquee>
          </motion.div>

          {/* Skill categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category, catIdx) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="relative p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/30 transition-colors overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <h3 className={cn(
                  'text-lg font-bold mb-6 flex items-center gap-2',
                  'text-white',
                )}>
                  <span className={cn(
                    'w-2 h-5 rounded-full',
                    catIdx % 4 === 0 ? 'bg-violet-500' :
                    catIdx % 4 === 1 ? 'bg-cyan-500' :
                    catIdx % 4 === 2 ? 'bg-pink-500' : 'bg-amber-500',
                  )} />
                  {category.category}
                </h3>

                <div className="space-y-4">
                  {category.items.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      delay={i * 0.1 + catIdx * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
