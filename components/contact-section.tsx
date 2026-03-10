import { Instagram, Mail, MessageCircle } from "lucide-react"

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@bde.comete",
    href: "#",
    color: "hover:text-[hsl(330,70%,65%)]",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    handle: "BDE Comete",
    href: "https://discord.gg/JPCVDFNHr",
    color: "hover:text-[hsl(235,86%,65%)]",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "bde.comete@ecole.fr",
    href: "mailto:bde.comete@ecole.fr",
    color: "hover:text-primary",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
          Rejoins-nous
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          {"Reste connecte"}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed">
          {
            "Suis-nous sur les reseaux pour ne rien rater de nos events et de l'actu du BDE."
          }
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={`group flex flex-col items-center gap-4 p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 ${social.color}`}
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <social.icon size={24} className="text-muted-foreground group-hover:text-inherit transition-colors" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground mb-1">{social.label}</p>
                <p className="text-sm text-muted-foreground">{social.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
