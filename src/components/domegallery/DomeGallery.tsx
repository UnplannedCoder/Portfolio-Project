import { useEffect, useMemo, useRef, useCallback } from 'react'
import { useGesture } from '@use-gesture/react'
import './DomeGallery.css'

interface ImageItem {
  src: string
  alt?: string
  label?: string
}

interface DomeGalleryProps {
  images?: (string | ImageItem)[]
  fit?: number
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height'
  minRadius?: number
  maxRadius?: number
  padFactor?: number
  overlayBlurColor?: string
  maxVerticalRotationDeg?: number
  dragSensitivity?: number
  enlargeTransitionMs?: number
  segments?: number
  dragDampening?: number
  openedImageWidth?: string
  openedImageHeight?: string
  imageBorderRadius?: string
  openedImageBorderRadius?: string
  grayscale?: boolean
}

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360
  return a - 180
}

interface TileItem {
  x: number
  y: number
  sizeX: number
  sizeY: number
  src: string
  alt: string
  label: string
}

function buildItems(pool: ImageItem[], seg: number): TileItem[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2)
  const evenYs = [-4, -2, 0, 2, 4]
  const oddYs = [-3, -1, 1, 3, 5]
  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }))
  })
  const totalSlots = coords.length
  if (pool.length === 0) return coords.map(c => ({ ...c, src: '', alt: '', label: '' }))
  const usedImages = Array.from({ length: totalSlots }, (_, i) => pool[i % pool.length])
  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt || '',
    label: usedImages[i].label || usedImages[i].alt || '',
  }))
}

function computeItemBaseRotation(
  offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number
) {
  const unit = 360 / segments / 2
  const rotateY = unit * (offsetX + (sizeX - 1) / 2)
  const rotateX = unit * (offsetY - (sizeY - 1) / 2)
  return { rotateX, rotateY }
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#09090b',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '250px',
  openedImageHeight = '250px',
  imageBorderRadius = '20px',
  openedImageBorderRadius = '20px',
  grayscale = false,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const focusedElRef = useRef<HTMLElement | null>(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const startRotRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef<{ x: number; y: number } | null>(null)
  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const inertiaRAF = useRef<number | null>(null)
  const openingRef = useRef(false)
  const openStartedAtRef = useRef(0)
  const lastDragEndAt = useRef(0)
  const scrollLockedRef = useRef(false)
  const lockedRadiusRef = useRef<number | null>(null)

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return
    scrollLockedRef.current = true
    document.body.classList.add('dg-scroll-lock')
  }, [])

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return
    scrollLockedRef.current = false
    document.body.classList.remove('dg-scroll-lock')
  }, [])

  const normalizedPool: ImageItem[] = useMemo(() =>
    images.map(img =>
      typeof img === 'string' ? { src: img, alt: '', label: '' } : img
    ), [images])

  const items = useMemo(() => buildItems(normalizedPool, segments), [normalizedPool, segments])

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current
    if (el) el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect
      const w = Math.max(1, cr.width), h = Math.max(1, cr.height)
      const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h
      let basis: number
      switch (fitBasis) {
        case 'min': basis = minDim; break
        case 'max': basis = maxDim; break
        case 'width': basis = w; break
        case 'height': basis = h; break
        default: basis = aspect >= 1.3 ? w : minDim
      }
      let radius = basis * fit
      radius = Math.min(radius, h * 1.35)
      radius = clamp(radius, minRadius, maxRadius)
      lockedRadiusRef.current = Math.round(radius)
      const viewerPad = Math.max(8, Math.round(minDim * padFactor))
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`)
      root.style.setProperty('--viewer-pad', `${viewerPad}px`)
      root.style.setProperty('--overlay-blur-color', overlayBlurColor)
      root.style.setProperty('--tile-radius', imageBorderRadius)
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius)
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none')
      applyTransform(rotationRef.current.x, rotationRef.current.y)
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius])

  useEffect(() => { applyTransform(0, 0) }, [])

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) { cancelAnimationFrame(inertiaRAF.current); inertiaRAF.current = null }
  }, [])

  const startInertia = useCallback((vx: number, vy: number) => {
    const MAX_V = 1.4
    let vX = clamp(vx, -MAX_V, MAX_V) * 80
    let vY = clamp(vy, -MAX_V, MAX_V) * 80
    let frames = 0
    const d = clamp(dragDampening ?? 0.6, 0, 1)
    const frictionMul = 0.94 + 0.055 * d
    const stopThreshold = 0.015 - 0.01 * d
    const maxFrames = Math.round(90 + 270 * d)
    const step = () => {
      vX *= frictionMul; vY *= frictionMul
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) { inertiaRAF.current = null; return }
      if (++frames > maxFrames) { inertiaRAF.current = null; return }
      const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg)
      const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200)
      rotationRef.current = { x: nextX, y: nextY }
      applyTransform(nextX, nextY)
      inertiaRAF.current = requestAnimationFrame(step)
    }
    stopInertia()
    inertiaRAF.current = requestAnimationFrame(step)
  }, [dragDampening, maxVerticalRotationDeg, stopInertia])

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return
        stopInertia()
        const evt = event as PointerEvent
        draggingRef.current = true
        movedRef.current = false
        startRotRef.current = { ...rotationRef.current }
        startPosRef.current = { x: evt.clientX, y: evt.clientY }
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return
        const evt = event as PointerEvent
        const dxTotal = evt.clientX - startPosRef.current.x
        const dyTotal = evt.clientY - startPosRef.current.y
        if (!movedRef.current) {
          if (dxTotal * dxTotal + dyTotal * dyTotal > 16) movedRef.current = true
        }
        const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg)
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity)
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY }
          applyTransform(nextX, nextY)
        }
        if (last) {
          draggingRef.current = false
          let [vMagX, vMagY] = velocity
          const [dirX, dirY] = direction
          let vx = vMagX * dirX, vy = vMagY * dirY
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement as number[]
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2)
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2)
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy)
          if (movedRef.current) lastDragEndAt.current = performance.now()
          movedRef.current = false
        }
      },
    },
    { target: mainRef, eventOptions: { passive: true } }
  )

  // Scrim close handler — simplified (no expand animation needed for skill icons)
  useEffect(() => {
    const scrim = scrimRef.current
    if (!scrim) return
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return
      const el = focusedElRef.current
      if (!el) return
      const parent = el.parentElement!
      const overlay = viewerRef.current?.querySelector('.enlarge')
      if (!overlay) return
      overlay.remove()
      parent.style.setProperty('--rot-y-delta', '0deg')
      parent.style.setProperty('--rot-x-delta', '0deg')
      el.style.visibility = ''
      el.style.zIndex = '0'
      focusedElRef.current = null
      rootRef.current?.removeAttribute('data-enlarging')
      openingRef.current = false
      unlockScroll()
    }
    scrim.addEventListener('click', close)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => { scrim.removeEventListener('click', close); window.removeEventListener('keydown', onKey) }
  }, [unlockScroll])

  const openItemFromElement = useCallback((el: HTMLElement) => {
    if (openingRef.current) return
    openingRef.current = true
    openStartedAtRef.current = performance.now()
    lockScroll()
    const parent = el.parentElement!
    focusedElRef.current = el
    const offsetX = parseFloat(parent.dataset.offsetX ?? '0')
    const offsetY = parseFloat(parent.dataset.offsetY ?? '0')
    const sizeX = parseFloat(parent.dataset.sizeX ?? '2')
    const sizeY = parseFloat(parent.dataset.sizeY ?? '2')
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments)
    const parentY = normalizeAngle(parentRot.rotateY)
    const globalY = normalizeAngle(rotationRef.current.y)
    let rotY = -(parentY + globalY) % 360
    if (rotY < -180) rotY += 360
    const rotX = -parentRot.rotateX - rotationRef.current.x
    parent.style.setProperty('--rot-y-delta', `${rotY}deg`)
    parent.style.setProperty('--rot-x-delta', `${rotX}deg`)
    const frameR = frameRef.current?.getBoundingClientRect()
    const mainR = mainRef.current?.getBoundingClientRect()
    if (!mainR || !frameR) { openingRef.current = false; focusedElRef.current = null; unlockScroll(); return }
    el.style.visibility = 'hidden'
    el.style.zIndex = '0'
    const overlay = document.createElement('div')
    overlay.className = 'enlarge'
    overlay.style.cssText = `position:absolute;left:${frameR.left - mainR.left}px;top:${frameR.top - mainR.top}px;width:${openedImageWidth};height:${openedImageHeight};opacity:0;z-index:30;transition:opacity ${enlargeTransitionMs}ms ease;border-radius:${openedImageBorderRadius};overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;background:rgba(15,15,20,0.95);border:1px solid rgba(139,92,246,0.3);`
    const img = document.createElement('img')
    img.src = parent.dataset.src || el.querySelector('img')?.src || ''
    img.style.cssText = 'width:70%;height:70%;object-fit:contain;'
    overlay.appendChild(img)
    viewerRef.current?.appendChild(overlay)
    // Center it
    const centeredLeft = frameR.left - mainR.left + frameR.width / 2 - parseFloat(openedImageWidth) / 2
    const centeredTop = frameR.top - mainR.top + frameR.height / 2 - parseFloat(openedImageHeight) / 2
    overlay.style.left = `${centeredLeft}px`
    overlay.style.top = `${centeredTop}px`
    setTimeout(() => {
      overlay.style.opacity = '1'
      rootRef.current?.setAttribute('data-enlarging', 'true')
    }, 16)
  }, [enlargeTransitionMs, lockScroll, openedImageWidth, openedImageHeight, openedImageBorderRadius, segments, unlockScroll])

  const onTileClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingRef.current || movedRef.current) return
    if (performance.now() - lastDragEndAt.current < 80) return
    if (openingRef.current) return
    openItemFromElement(e.currentTarget)
  }, [openItemFromElement])

  useEffect(() => () => { document.body.classList.remove('dg-scroll-lock') }, [])

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ['--segments-x' as string]: segments,
        ['--segments-y' as string]: segments,
        ['--overlay-blur-color' as string]: overlayBlurColor,
        ['--tile-radius' as string]: imageBorderRadius,
        ['--enlarge-radius' as string]: openedImageBorderRadius,
        ['--image-filter' as string]: grayscale ? 'grayscale(1)' : 'none',
      } as React.CSSProperties}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={{
                  ['--offset-x' as string]: it.x,
                  ['--offset-y' as string]: it.y,
                  ['--item-size-x' as string]: it.sizeX,
                  ['--item-size-y' as string]: it.sizeY,
                }}
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || 'Open image'}
                  onClick={onTileClick}
                >
                  <img src={it.src} draggable={false} alt={it.alt} />
                  {it.label && <span className="item__label">{it.label}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />
        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  )
}
