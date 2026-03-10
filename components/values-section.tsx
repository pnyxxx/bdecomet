import { Flame, Shield, Zap, Globe } from "lucide-react"

const values = [
  {
    icon: Flame,
    title: "Passion",
    description: "On met du coeur dans tout ce qu'on fait.",
  },
  {
    icon: Shield,
    title: "Bienveillance",
    description: "Ici tout le monde est le bienvenu, sans exception.",
  },
  {
    icon: Zap,
    title: "Energie",
    description: "Toujours a fond, toujours partants pour de nouvelles aventures.",
  },
  {
    icon: Globe,
    title: "Ouverture",
    description: "Echanges, diversite et decouvertes sont nos moteurs.",
  },
]

export function ValuesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
            ADN
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Nos valeurs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-8 rounded-xl border border-border bg-card/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6 group-hover:bg-primary/20 transition-colors">
                <value.icon className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
