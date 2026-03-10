import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CounterSection } from "@/components/counter-section"
import { TeamSection } from "@/components/team-section"
import { ObjectivesSection } from "@/components/objectives-section"
import { ValuesSection } from "@/components/values-section"
import { GamesSection } from "@/components/games-section"
import { ProgramSection } from "@/components/program-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <CounterSection />
      <TeamSection />
      <ObjectivesSection />
      <ValuesSection />
      <GamesSection />
      <ProgramSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
