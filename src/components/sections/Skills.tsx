import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const BASE_TILES = [
  { src: '/skills/python.png',     label: 'Python'     },
  { src: '/skills/javascript.png', label: 'JavaScript' },
  { src: '/skills/react.png',      label: 'React.js'   },
  { src: '/skills/nodejs.png',     label: 'Node.js'    },
  { src: '/skills/express.png',    label: 'Express.js' },
  { src: '/skills/html5.png',      label: 'HTML5'      },
  { src: '/skills/css3.png',       label: 'CSS3'       },
  { src: '/skills/mysql.png',      label: 'MySQL'      },
  { src: '/skills/mongodb.png',    label: 'MongoDB'    },
  { src: '/skills/git.png',        label: 'Git'        },
  { src: '/skills/github.png',     label: 'GitHub'     },
  { src: '/skills/powerbi.png',    label: 'Power BI'   },
  { src: '/skills/excel.png',      label: 'Excel'      },
  { src: '/skills/typescript.png', label: 'TypeScript' },
]

// Repeat 3× so carousel is dense
const SKILL_TILES = [...BASE_TILES, ...BASE_TILES, ...BASE_TILES]

// Pre-computed random Y offsets — seeded so they stay stable
const RANDOM_Y_OFFSETS = SKILL_TILES.map((_, i) => {
  const seed = (i * 137.508) % 1  // golden ratio pseudo-random
  return (seed - 0.5) * 180       // spread ±90px vertically
})

const TILE_W     = 72
const TILE_H     = 72
const RADIUS     = 380   // circle radius — fits inside ~760px wide box
const AUTO_SPEED = 0.04  // deg/frame

function SkillCarousel() {
  const angleRef = useRef(0)
  const [angle, setAngle]  = useState(0)
  const rafRef   = useRef<number | null>(null)
  const dragging = useRef(false)
  const lastX    = useRef(0)
  const velRef   = useRef(AUTO_SPEED)

  const N = SKILL_TILES.length

  useEffect(() => {
    const step = () => {
      if (!dragging.current) {
        velRef.current = velRef.current * 0.97 + AUTO_SPEED * 0.03
      }
      angleRef.current = (angleRef.current + velRef.current + 360) % 360
      setAngle(angleRef.current)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    lastX.current    = e.clientX
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    velRef.current = -dx * 0.3
  }
  const onMouseUp = () => { dragging.current = false }

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true
    lastX.current    = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return
    const dx = e.touches[0].clientX - lastX.current
    lastX.current = e.touches[0].clientX
    velRef.current = -dx * 0.3
  }
  const onTouchEnd = () => { dragging.current = false }

  // BOX dimensions — matches heading width (~680px, centred)
  const BOX_W = 680
  const BOX_H = 300

  return (
    <div className="flex justify-center">
      <div
        style={{
          width: BOX_W,
          height: BOX_H,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 20,
          cursor: 'grab',
          userSelect: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Left / right edge fades */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          background: 'linear-gradient(to right, #09090b 0%, transparent 12%, transparent 88%, #09090b 100%)',
        }} />
        {/* Top / bottom edge fades */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          background: 'linear-gradient(to bottom, #09090b 0%, transparent 14%, transparent 86%, #09090b 100%)',
        }} />

        {/* 3-D stage — centred inside the box */}
        <div style={{
          position: 'absolute',
          left: BOX_W / 2,
          top:  BOX_H / 2,
          transformStyle: 'preserve-3d',
          perspective: 900,
          width: 0,
          height: 0,
        }}>
          {SKILL_TILES.map((tile, i) => {
            const baseAngle = (i / N) * 360
            const deg  = baseAngle + angle
            const rad  = (deg * Math.PI) / 180
            const x    = Math.sin(rad) * RADIUS
            const z    = Math.cos(rad) * RADIUS
            // Random Y — each tile has a fixed random vertical offset
            const y    = RANDOM_Y_OFFSETS[i]

            const depth   = (z + RADIUS) / (RADIUS * 2)       // 0–1
            const scale   = 0.5 + depth * 0.55                // 0.5–1.05
            const opacity = 0.3 + depth * 0.7                 // 0.3–1.0

            return (
              <div
                key={`${tile.label}-${i}`}
                style={{
                  position: 'absolute',
                  width:  TILE_W,
                  height: TILE_H,
                  left:  -TILE_W / 2,
                  top:   -TILE_H / 2,
                  transform: `translate3d(${x}px,${y}px,${z}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(depth * 100),
                  willChange: 'transform',
                }}
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-1 rounded-[15px]"
                  style={{
                    background: '#15151a',
                    border:     '1px solid rgba(255,255,255,0.08)',
                    boxShadow:  '0 3px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  <img
                    src={tile.src}
                    alt={tile.label}
                    draggable={false}
                    style={{
                      width:  '50%',
                      height: '50%',
                      objectFit: 'contain',
                      pointerEvents: 'none',
                    }}
                  />
                  <span style={{
                    fontSize:      6.5,
                    fontWeight:    700,
                    color:         'rgba(255,255,255,0.45)',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    lineHeight:    1,
                    pointerEvents: 'none',
                  }}>
                    {tile.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function SkillBar({ name, level, icon, delay = 0 }: {
  name: string; level: number; icon: string; delay?: number
}) {
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

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
              What I Work With
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills & <span className="gradient-text">Tech Stack</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto" />
          </motion.div>

          {/* Carousel */}
          <motion.div variants={itemVariants} className="mb-2">
            <SkillCarousel />
          </motion.div>
          <motion.p variants={itemVariants} className="text-center text-zinc-700 text-xs mb-12">
            Drag to rotate
          </motion.p>

          {/* Skill bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category, catIdx) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="relative p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/30 transition-colors overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                  <span className={cn(
                    'w-2 h-5 rounded-full',
                    catIdx % 4 === 0 ? 'bg-violet-500' :
                    catIdx % 4 === 1 ? 'bg-cyan-500'   :
                    catIdx % 4 === 2 ? 'bg-pink-500'   : 'bg-amber-500',
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
