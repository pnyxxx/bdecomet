"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Play, RotateCcw, Trophy } from "lucide-react"

interface GameObject {
  x: number
  y: number
  size: number
  speed: number
  type: "comet" | "asteroid" | "star"
  rotation: number
  rotationSpeed: number
}

const CANVAS_W = 400
const CANVAS_H = 560
const PLAYER_SIZE = 36
const SPAWN_INTERVAL_START = 800
const SPAWN_INTERVAL_MIN = 350

export function CometGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef({
    playerX: CANVAS_W / 2,
    objects: [] as GameObject[],
    score: 0,
    lives: 3,
    isRunning: false,
    lastSpawn: 0,
    spawnInterval: SPAWN_INTERVAL_START,
    stars: [] as { x: number; y: number; size: number; opacity: number }[],
  })

  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const animRef = useRef<number>(0)
  const pointerXRef = useRef(CANVAS_W / 2)

  // Initialize background stars
  useEffect(() => {
    const state = gameStateRef.current
    state.stars = []
    for (let i = 0; i < 60; i++) {
      state.stars.push({
        x: Math.random() * CANVAS_W,
        y: Math.random() * CANVAS_H,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }
  }, [])

  const spawnObject = useCallback(() => {
    const state = gameStateRef.current
    const rand = Math.random()
    let type: "comet" | "asteroid" | "star"
    if (rand < 0.4) type = "comet"
    else if (rand < 0.75) type = "asteroid"
    else type = "star"

    const speedMult = 1 + state.score / 200

    state.objects.push({
      x: Math.random() * (CANVAS_W - 40) + 20,
      y: -30,
      size: type === "asteroid" ? 22 + Math.random() * 14 : type === "star" ? 14 : 18,
      speed: (type === "asteroid" ? 1.8 : type === "star" ? 2.5 : 2.2) * speedMult,
      type,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
    })
  }, [])

  const drawComet = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    // Glow
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 1.5)
    grad.addColorStop(0, "rgba(100, 220, 255, 0.5)")
    grad.addColorStop(1, "rgba(100, 220, 255, 0)")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, size * 1.5, 0, Math.PI * 2)
    ctx.fill()

    // Core
    ctx.fillStyle = "#4deefc"
    ctx.beginPath()
    ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
    ctx.fill()

    // Inner bright
    ctx.fillStyle = "#b0f4ff"
    ctx.beginPath()
    ctx.arc(x, y, size * 0.3, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawAsteroid = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    ctx.fillStyle = "#564070"
    ctx.beginPath()
    const points = 7
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2
      const r = size * (0.7 + Math.sin(i * 2.5) * 0.3)
      const px = Math.cos(angle) * r
      const py = Math.sin(angle) * r
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "#7b5ea0"
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.restore()
  }

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)

    // Glow
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2)
    grad.addColorStop(0, "rgba(180, 130, 255, 0.4)")
    grad.addColorStop(1, "rgba(180, 130, 255, 0)")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(0, 0, size * 2, 0, Math.PI * 2)
    ctx.fill()

    // Star shape
    ctx.fillStyle = "#c084fc"
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
      const px = Math.cos(angle) * size
      const py = Math.sin(angle) * size
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number) => {
    const y = CANVAS_H - 50
    // Glow
    const grad = ctx.createRadialGradient(x, y, 0, x, y, PLAYER_SIZE * 1.5)
    grad.addColorStop(0, "rgba(120, 80, 220, 0.3)")
    grad.addColorStop(1, "rgba(120, 80, 220, 0)")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, PLAYER_SIZE * 1.5, 0, Math.PI * 2)
    ctx.fill()

    // Rocket body
    ctx.fillStyle = "#a78bfa"
    ctx.beginPath()
    ctx.moveTo(x, y - PLAYER_SIZE)
    ctx.lineTo(x - PLAYER_SIZE * 0.5, y + PLAYER_SIZE * 0.3)
    ctx.lineTo(x + PLAYER_SIZE * 0.5, y + PLAYER_SIZE * 0.3)
    ctx.closePath()
    ctx.fill()

    // Nose
    ctx.fillStyle = "#c4b5fd"
    ctx.beginPath()
    ctx.moveTo(x, y - PLAYER_SIZE)
    ctx.lineTo(x - PLAYER_SIZE * 0.25, y - PLAYER_SIZE * 0.3)
    ctx.lineTo(x + PLAYER_SIZE * 0.25, y - PLAYER_SIZE * 0.3)
    ctx.closePath()
    ctx.fill()

    // Flame
    ctx.fillStyle = "#4deefc"
    ctx.beginPath()
    ctx.moveTo(x - 6, y + PLAYER_SIZE * 0.3)
    ctx.lineTo(x, y + PLAYER_SIZE * 0.3 + 12 + Math.random() * 6)
    ctx.lineTo(x + 6, y + PLAYER_SIZE * 0.3)
    ctx.closePath()
    ctx.fill()
  }

  const gameLoop = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      const state = gameStateRef.current
      if (!state.isRunning) return

      // Clear
      ctx.fillStyle = "#0e0b1a"
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

      // Background stars
      state.stars.forEach((s) => {
        s.opacity += (Math.random() - 0.5) * 0.01
        s.opacity = Math.max(0.15, Math.min(0.7, s.opacity))
        ctx.fillStyle = `rgba(200, 180, 255, ${s.opacity})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Smooth player follow
      state.playerX += (pointerXRef.current - state.playerX) * 0.15
      state.playerX = Math.max(PLAYER_SIZE, Math.min(CANVAS_W - PLAYER_SIZE, state.playerX))

      // Spawn
      if (timestamp - state.lastSpawn > state.spawnInterval) {
        spawnObject()
        state.lastSpawn = timestamp
        state.spawnInterval = Math.max(SPAWN_INTERVAL_MIN, SPAWN_INTERVAL_START - state.score * 3)
      }

      // Update & draw objects
      const playerY = CANVAS_H - 50
      state.objects = state.objects.filter((obj) => {
        obj.y += obj.speed
        obj.rotation += obj.rotationSpeed

        // Collision check
        const dx = obj.x - state.playerX
        const dy = obj.y - playerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const hitDist = obj.size + PLAYER_SIZE * 0.5

        if (dist < hitDist) {
          if (obj.type === "comet") {
            state.score += 10
            setScore(state.score)
            return false
          } else if (obj.type === "star") {
            state.score += 25
            setScore(state.score)
            return false
          } else {
            state.lives -= 1
            setLives(state.lives)
            if (state.lives <= 0) {
              state.isRunning = false
              setGameOver(true)
              setHighScore((prev) => Math.max(prev, state.score))
            }
            return false
          }
        }

        // Off screen
        if (obj.y > CANVAS_H + 40) {
          if (obj.type === "comet") {
            // Penalty for missing comets
          }
          return false
        }

        // Draw
        if (obj.type === "comet") drawComet(ctx, obj.x, obj.y, obj.size)
        else if (obj.type === "asteroid") drawAsteroid(ctx, obj.x, obj.y, obj.size, obj.rotation)
        else drawStar(ctx, obj.x, obj.y, obj.size, obj.rotation)

        return true
      })

      // Draw player
      drawPlayer(ctx, state.playerX)

      // HUD border glow
      ctx.strokeStyle = "rgba(120, 80, 220, 0.3)"
      ctx.lineWidth = 2
      ctx.strokeRect(1, 1, CANVAS_W - 2, CANVAS_H - 2)

      animRef.current = requestAnimationFrame(gameLoop)
    },
    [spawnObject]
  )

  const startGame = useCallback(() => {
    const state = gameStateRef.current
    state.playerX = CANVAS_W / 2
    state.objects = []
    state.score = 0
    state.lives = 3
    state.isRunning = true
    state.lastSpawn = 0
    state.spawnInterval = SPAWN_INTERVAL_START
    pointerXRef.current = CANVAS_W / 2
    setScore(0)
    setLives(3)
    setGameOver(false)
    setGameStarted(true)
    animRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  // Pointer / touch handling
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!gameStarted || gameOver) return
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const scaleX = CANVAS_W / rect.width
      pointerXRef.current = (e.clientX - rect.left) * scaleX
    },
    [gameStarted, gameOver]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (!gameStarted || gameOver) return
      e.preventDefault()
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const scaleX = CANVAS_W / rect.width
      pointerXRef.current = (e.touches[0].clientX - rect.left) * scaleX
    },
    [gameStarted, gameOver]
  )

  return (
    <div className="flex flex-col items-center">
      {/* Game HUD */}
      <div className="w-full max-w-[400px] flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-colors ${
                i < lives ? "bg-primary shadow-[0_0_8px_rgba(120,80,220,0.5)]" : "bg-secondary"
              }`}
            />
          ))}
        </div>
        <div className="font-display font-bold text-foreground">
          Score : <span className="text-accent">{score}</span>
        </div>
        {highScore > 0 && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Trophy size={12} /> {highScore}
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-border shadow-[0_0_30px_rgba(120,80,220,0.15)]">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="w-full max-w-[400px] touch-none bg-background"
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
        />

        {/* Start screen overlay */}
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Catch the Comete
            </h3>
            <p className="text-sm text-muted-foreground mb-2 text-center px-6">
              Attrape les cometes et les etoiles, evite les asteroides !
            </p>
            <div className="flex flex-col gap-1 mb-6 text-xs text-muted-foreground">
              <span>Comete (bleu) = +10 pts</span>
              <span>Etoile (violet) = +25 pts</span>
              <span>Asteroide = -1 vie</span>
            </div>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(120,80,220,0.3)]"
            >
              <Play size={18} />
              Jouer
            </button>
          </div>
        )}

        {/* Game over overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Game Over
            </h3>
            <div className="font-display text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
              {score} pts
            </div>
            {score >= highScore && score > 0 && (
              <span className="text-xs font-medium text-accent mb-4">
                Nouveau record !
              </span>
            )}
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(120,80,220,0.3)]"
            >
              <RotateCcw size={18} />
              Rejouer
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Deplace ta souris ou ton doigt pour piloter la fusee
      </p>
    </div>
  )
}
