"use client"

import { useState } from "react"
import { Gamepad2, HelpCircle, Rocket } from "lucide-react"
import { QuizGame } from "./quiz-game"
import { CometGame } from "./comet-game"

const games = [
  {
    id: "quiz",
    label: "Quiz BDE",
    icon: HelpCircle,
    description: "Teste tes connaissances sur les membres du BDE Comete !",
  },
  {
    id: "arcade",
    label: "Catch the Comete",
    icon: Rocket,
    description: "Mini-jeu d'arcade : attrape les cometes et evite les asteroides !",
  },
]

export function GamesSection() {
  const [activeGame, setActiveGame] = useState<string>("quiz")

  return (
    <section id="jeux" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent uppercase tracking-widest mb-4">
            <Gamepad2 size={16} />
            Decouvre-nous en jouant
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Espace Jeux
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {"Apprends a connaitre le BDE de facon ludique ! Quiz, arcade... a toi de jouer."}
          </p>
        </div>

        {/* Game selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                activeGame === game.id
                  ? "bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(120,80,220,0.2)]"
                  : "bg-card/30 border-border hover:border-primary/30"
              }`}
            >
              <game.icon
                size={20}
                className={activeGame === game.id ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"}
              />
              <div className="text-left">
                <p className={`font-display font-bold text-sm ${activeGame === game.id ? "text-primary" : "text-foreground"}`}>
                  {game.label}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">{game.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Game area */}
        <div className="max-w-2xl mx-auto">
          {activeGame === "quiz" && <QuizGame />}
          {activeGame === "arcade" && <CometGame />}
        </div>
      </div>
    </section>
  )
}
