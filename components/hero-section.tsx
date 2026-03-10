"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { withBasePath } from "@/lib/with-base-path"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const stars: { x: number; y: number; size: number; speed: number; opacity: number; color: string }[] = []
    const colors = [
      "200, 180, 255",
      "180, 160, 255",
      "140, 230, 255",
      "220, 200, 255",
      "255, 255, 255",
    ]
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.opacity += (Math.random() - 0.5) * 0.02
        star.opacity = Math.max(0.1, Math.min(1, star.opacity))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] bg-gradient-to-t from-background to-transparent" />

      {/* Purple glow accent */}
      <div className="absolute top-1/4 right-1/4 z-[2] w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/3 left-1/4 z-[2] w-64 h-64 rounded-full bg-accent/8 blur-[80px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] w-[500px] h-[500px] rounded-full bg-[hsl(270,60%,30%)]/10 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8">
          <div className="h-2 w-2 rounded-full bg-accent animate-glow-pulse" />
          <span className="text-sm text-primary font-medium">Bureau Des Etudiants 2026-2027</span>
        </div>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src={withBasePath("/images/logo_bde_bg.png")}
            alt="Logo BDE Comete"
            width={280}
            height={280}
            className="drop-shadow-[0_0_40px_rgba(120,80,220,0.4)]"
            priority
          />
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          {
            "Une equipe de 8 passionnes prets a illuminer votre annee etudiante. Evenements, soirees, projets... On vise les etoiles !"
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#equipe"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(120,80,220,0.4)]"
          >
            {"Decouvrir l'equipe"}
          </a>
          <a
            href="#jeux"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-accent/40 text-accent font-display font-semibold text-lg hover:border-accent hover:bg-accent/10 transition-all duration-300"
          >
            Jouer avec nous
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <a href="#equipe" aria-label="Defiler vers le bas">
          <ChevronDown className="text-muted-foreground" size={32} />
        </a>
      </div>
    </section>
  )
}
