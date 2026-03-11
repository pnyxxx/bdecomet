"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

const days = [
  {
    day: "Lundi",
    events: [
      { time: "09h00", title: "Lundi 16 — Petit déjeuner", location: "Cafétéria", type: "food" },
      { time: "09h00", title: "Lundi 23 — Petit déjeuner", location: "Cafétéria", type: "food" },
    ],
  },
  {
    day: "Mardi",
    events: [
      { time: "12h00", title: "Mardi 24 — Repas offert", location: "Cafétéria", type: "food" },
    ],
  },
  {
    day: "Mercredi",
    events: [
      { time: "12h00", title: "Mercredi 18 — Repas offert", location: "Cafétéria", type: "food" },
      { time: "16h00", title: "Mercredi 25 — Crêpes (après Stumper)", location: "Cafétéria", type: "food" },
    ],
  },
  {
    day: "Jeudi",
    events: [
      { time: "20h00", title: "Jeudi 19 — After work", location: "Le Square", type: "soiree" },
      { time: "12h00", title: "Jeudi 26 — BBQ", location: "Cours", type: "food" },
    ],
  },
  {
    day: "Vendredi",
    events: [
      { time: "15h00", title: "Vendredi 20 — Dégustation à l'aveugle", location: "Cafétéria", type: "food" },
      { time: "21h00", title: "Vendredi 27 — LAN", location: "Salle informatique (EPITECH)", type: "gaming" },
    ],
  },
]

const typeColors: Record<string, string> = {
  regulier: "bg-muted-foreground/20 text-muted-foreground",
  food: "bg-[hsl(30,80%,52%)]/20 text-[hsl(30,80%,60%)]",
  gaming: "bg-accent/20 text-accent",
  sport: "bg-[hsl(150,60%,45%)]/20 text-[hsl(150,60%,55%)]",
  soiree: "bg-primary/20 text-primary",
}

const typeLabels: Record<string, string> = {
  regulier: "Reguli®er",
  food: "Food",
  gaming: "Gaming",
  sport: "Sport",
  soiree: "Soiree",
}

export function ProgramSection() {
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section id="programme" className="relative py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
            Semaine type
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Programme de la semaine
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {"Le planning detaille arrive bientot. Reste connecte pour les prochaines annonces !"}
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {days.map((d, index) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(index)}
              className={`px-6 py-3 rounded-lg font-display font-semibold text-sm transition-all duration-300 ${
                activeDay === index
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(120,80,220,0.3)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>

        {/* Events for selected day */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-accent" size={20} />
            <h3 className="font-display text-2xl font-bold text-foreground">
              {days[activeDay].day}
            </h3>
            <span className="text-sm text-muted-foreground">
              {days[activeDay].events.length} event{days[activeDay].events.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {days[activeDay].events.map((_, index) => (
              <div
                key={`${days[activeDay].day}-${index}`}
                className="group relative flex items-start gap-6 p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
              >
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                  Prochainement
                </div>

                <div className="flex-1 blur-sm select-none">
                  <div className="flex flex-col gap-3">
                    <div className="h-5 w-24 rounded bg-accent/25" />
                    <div className="h-6 w-3/4 rounded bg-foreground/15" />
                    <div className="h-4 w-1/2 rounded bg-muted-foreground/20" />
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-[40px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement teaser */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-2xl border border-primary/30 bg-card/40 backdrop-blur-sm">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
            ANNONCE FUTUR PARTENARIAT
          </h3>
          <div className="text-muted-foreground space-y-3 leading-relaxed">
            <p className="font-semibold text-foreground">
              “Le BDE a signé un nouveau partenariat…”
            </p>
            <p>Un lieu qui ne ferme (presque) jamais.</p>
            <p>Un endroit qui sauve des vies après 23h.</p>
            <p>Un parfum reconnaissable à 200 mètres.</p>
            <p className="text-accent font-semibold">
              🔥 Ça tourne… et ça va vous régaler.
            </p>
            <p>(Seulement si on est élu·e, donc votez bien&nbsp;!)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
