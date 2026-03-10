import Image from "next/image"
import { withBasePath } from "@/lib/with-base-path"

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={withBasePath("/images/logo_bde_bg.png")}
              alt="Logo BDE Comete"
              width={32}
              height={32}
            />
            <span className="font-display text-lg font-bold text-foreground">
              Comete
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {"BDE Comete 2026-2027. Fait avec passion par l'equipe."}
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#accueil" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Accueil
            </a>
            <a href="#equipe" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Equipe
            </a>
            <a href="#jeux" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Jeux
            </a>
            <a href="#programme" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Programme
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
