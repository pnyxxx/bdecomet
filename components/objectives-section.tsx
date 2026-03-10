import { Rocket, Users, Music, Heart, Trophy, Sparkles } from "lucide-react"

const objectives = [
  {
    icon: Rocket,
    title: "10+ Events par semestre",
    description: "Soirees, afterworks, sorties... On veut remplir votre calendrier de moments forts.",
  },
  {
    icon: Users,
    title: "Creer du lien",
    description: "Rapprocher toutes les promos et faire de l'ecole une vraie communaute soudee.",
  },
  {
    icon: Music,
    title: "Gala de folie",
    description: "Organiser LE gala de l'annee dont tout le monde se souviendra.",
  },
  {
    icon: Heart,
    title: "Actions solidaires",
    description: "Lancer des projets caritatifs pour donner du sens a notre engagement.",
  },
  {
    icon: Trophy,
    title: "Tournois sportifs",
    description: "Competitions inter-promos : foot, basket, volley... Que le meilleur gagne !",
  },
  {
    icon: Sparkles,
    title: "Week-end d'integration",
    description: "Un WEI legendaire pour accueillir les nouveaux comme il se doit.",
  },
]

export function ObjectivesSection() {
  return (
    <section id="objectifs" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
            Notre mission
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {"Objectifs de l'annee"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {
              "On ne fait pas les choses a moitie. Voici ce qu'on vous prepare pour une annee stellaire."
            }
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, index) => (
            <div
              key={obj.title}
              className="group relative p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-500"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <obj.icon className="text-primary" size={28} />
              </div>

              {/* Number */}
              <span className="absolute top-6 right-6 text-6xl font-display font-bold text-foreground/[0.03]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {obj.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {obj.description}
              </p>
            </div>
          ))}


          
        </div>
      </div>
    </section>
  )
}
