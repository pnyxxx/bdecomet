"use client"

import Image from "next/image"
import { Instagram, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const members = [
  {
    name: "Gaspard Bry",
    role: "President",
    images: ["/assets/gaspard2.jpg", "/assets/gaspard.jpg", "/assets/gaspard3.jpg", "/assets/gaspard5.jpg"],
    description: "Coordonne le BDE, représente les étudiants auprès de l'école, valide les décisions importantes.",
    instagram: "#",
  },
  {
    name: "Antoine Rousselle aka Gonzalez",
    role: "Vice-President",
    images: ["/images/gonza1.png", "/assets/gonza2.png", "/assets/gonza3.png", "/assets/gonza4.png"],
    description: "Assiste le/la président·e, le/la remplace en cas d'absence, aide à la coordination globale.",
    instagram: "#",
  },
  {
    name: "Mato Urbanac",
    role: "Tresorier",
    images: ["/images/mato1.jpg", "/images/mato2.jpg"],
    description: "Gère le budget, les comptes, les remboursements, les financements et partenariats financiers.",
    instagram: "#",
  },
  {
    name: "Alexis Chalopin",
    role: "Responsable Evenementiel",
    images: ["/assets/alexis.png", "/assets/alexis2.png", "/assets/alexis3.png", "/assets/alexis4.png"],
    description: "S'occupe des comptes rendus, des mails officiels, de l'organisation administrative et des plannings.",
    instagram: "#",
  },
  {
    name: "Mathys Dupont",
    role: "Secretaire",
    images: ["/assets/mathys.png", "/assets/mathys2.png", "/assets/mathys3.png", "/assets/mathys4.jpg"],
    description: "Organise les soirees, week-ends, tournois, intégrations, planning logistique des événements.",
    instagram: "#",
  },
  {
    name: "Remi Deroussent",
    role: "Responsable Communication",
    images: ["/assets/remi.jpg", "/assets/remi2.png", "/assets/remi3.png", "/assets/remi4.png"],
    description: "Gère les réseaux sociaux, affiches, visuels, annonces et la promotion des événements.",
    instagram: "#",
  },
  {
    name: "Julien Plomion",
    role: "Responsable Partenariats / Sponsoring",
    images: ["/images/ju1.png", "/images/ju2.JPG"],
    description: "Contacte les bars, entreprises, sponsors, négocie des avantages étudiants et des financements.",
    instagram: "#",
  },
  {
    name: "Kyo Rose",
    role: "Responsable Vie Etudiante / Bien-etre",
    images: ["/images/kyo.JPG", "/images/kyo2.JPG", "/images/kyo3.JPG", "/images/kyo4.JPG"],
    description: "Fait le lien avec les étudiants, remonte les problèmes, propose des actions inclusives et conviviales.",
    instagram: "#",
  },
]

export { members }

function MemberCard({ member, index }: { member: typeof members[0]; index: number }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % member.images.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + member.images.length) % member.images.length)
  }

  const hasMultiplePhotos = member.images.length > 1

  return (
    <div
      key={member.name}
      className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={member.images[currentPhotoIndex]}
          alt={`Photo de ${member.name}`}
          fill
          unoptimized
          priority={index === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Role badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
            {member.role}
          </span>
        </div>

        {/* Photo navigation arrows */}
        {hasMultiplePhotos && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Photo précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Photo suivante"
            >
              <ChevronRight size={20} />
            </button>

            {/* Photo counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-xs text-white bg-black/40 backdrop-blur-sm">
              {currentPhotoIndex + 1} / {member.images.length}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xl font-bold text-foreground">
            {member.name}
          </h3>
          <a
            href={member.instagram}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`Instagram de ${member.name}`}
          >
            <Instagram size={18} />
          </a>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {member.description}
        </p>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[60px]" />
      </div>
    </div>
  )
}

export function TeamSection() {
  return (
    <section id="equipe" className="relative py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
            {"L'Equipage"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {"8 etoiles, 1 comete"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {
              "Chacun apporte son energie et ses talents pour faire de cette annee une aventure inoubliable."
            }
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
