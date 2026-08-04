import { useEffect, useState, useRef, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

const generateSparkle = (color: string): Sparkle => ({
  id: Math.random().toString(36).substr(2, 9),
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  color,
  delay: Math.random() * 2,
  scale: Math.random() * 1 + 0.5,
  lifespan: Math.random() * 10 + 5,
})

interface SparklesTextProps {
  text: string
  sparklesCount?: number
  colors?: { first: string; second: string }
  className?: string
}

export function SparklesText({
  text,
  sparklesCount = 10,
  colors = { first: '#9E7AFF', second: '#FE8BBB' },
  className,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const sparklesRef = useRef(sparkles)

  useEffect(() => {
    sparklesRef.current = sparkles
  })

  useEffect(() => {
    const generateInitialSparkles = () => {
      const initial: Sparkle[] = Array.from({ length: sparklesCount }, (_, i) =>
        generateSparkle(i % 2 === 0 ? colors.first : colors.second),
      )
      setSparkles(initial)
    }

    generateInitialSparkles()

    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        const newSparkles = currentSparkles.map((sparkle) => ({
          ...sparkle,
          lifespan: sparkle.lifespan - 0.1,
        }))
        const filtered = newSparkles.filter((s) => s.lifespan > 0)
        while (filtered.length < sparklesCount) {
          const colorIndex = filtered.length % 2
          filtered.push(generateSparkle(colorIndex === 0 ? colors.first : colors.second))
        }
        return filtered
      })
    }, 100)

    return () => clearInterval(interval)
  }, [sparklesCount, colors.first, colors.second])

  return (
    <span
      className={cn('relative inline-block', className)}
      style={
        {
          '--sparkle-first-color': colors.first,
          '--sparkle-second-color': colors.second,
        } as CSSProperties
      }
    >
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="pointer-events-none absolute"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: `scale(${sparkle.scale})`,
            opacity: Math.min(1, sparkle.lifespan / 5),
            animationDelay: `${sparkle.delay}s`,
          }}
          width="21"
          height="21"
          viewBox="0 0 21 21"
        >
          <path
            d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 13.3916 5.45617 14.6946 6.32981L16.3998 7.43082C16.9839 7.82228 16.9839 8.67772 16.3998 9.06918L14.6946 10.1702C13.3916 11.0438 12.4006 12.3077 11.8618 13.7797L11.1746 15.6562C10.9446 16.2848 10.0553 16.2848 9.82531 15.6562L9.13812 13.7797C8.59932 12.3077 7.60838 11.0438 6.30539 10.1702L4.60014 9.06918C4.01608 8.67772 4.01608 7.82228 4.60014 7.43082L6.30539 6.32981C7.60838 5.45617 8.59932 4.19229 9.13812 2.72026L9.82531 0.843845Z"
            fill={sparkle.color}
          />
        </svg>
      ))}
      <span className="relative z-10">{text}</span>
    </span>
  )
}
