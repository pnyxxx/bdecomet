"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight } from "lucide-react"
import { withBasePath } from "@/lib/with-base-path"

interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  memberName: string
  memberImage: string
  funFact: string
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Qui est le president du BDE Comete ?",
    options: ["Mato Urbanac", "Gaspard Bry", "Julien Plomion", "Remi Deroussent"],
    correctIndex: 1,
    memberName: "Gaspard Bry",
    memberImage: "/assets/gaspard.jpg",
    funFact: "Il est le capitaine de la comete et motive les troupes au quotidien !",
  },
  {
    question: "Quel est le surnom d'Antoine Rousselle ?",
    options: ["El Capitan", "Gonzalez", "Le Rocket", "Turbo"],
    correctIndex: 1,
    memberName: "Antoine Rousselle",
    memberImage: "/images/gonza1.png",
    funFact: "Aussi connu sous le nom de Gonzalez, il organise tout avec precision.",
  },
  {
    question: "Quel role occupe Mato Urbanac dans le BDE ?",
    options: ["President", "Responsable Com", "Tresorier", "Vice-President"],
    correctIndex: 2,
    memberName: "Mato Urbanac",
    memberImage: "/images/mato1.jpg",
    funFact: "Gardien du budget, il fait en sorte que chaque euro brille !",
  },
  {
    question: "De quoi est responsable Julien Plomion ?",
    options: ["Evenements", "Communication", "Tresorerie", "Partenariats"],
    correctIndex: 3,
    memberName: "Julien Plomion",
    memberImage: "/images/ju1.png",
    funFact: "La memoire de l'equipe, rien ne lui echappe dans la galaxie des partenaires.",
  },
  {
    question: "Qui gere la communication du BDE Comete ?",
    options: ["Mathys Dupont", "Gaspard Bry", "Remi Deroussent", "Antoine Rousselle"],
    correctIndex: 2,
    memberName: "Remi Deroussent",
    memberImage: "/assets/remi.jpg",
    funFact: "Il diffuse les messages du BDE a la vitesse de la lumiere sur les reseaux !",
  },
  {
    question: "Qui est le responsable evenements du BDE ?",
    options: ["Julien Plomion", "Mato Urbanac", "Gaspard Bry", "Alexis Chalopin"],
    correctIndex: 3,
    memberName: "Alexis Chalopin",
    memberImage: "/assets/alexis.png",
    funFact: "Createur de soirees cosmiques et d'events memorables, c'est lui !",
  },
  {
    question: "Combien de membres composent le BDE Comete ?",
    options: ["5", "7", "8", "10"],
    correctIndex: 2,
    memberName: "Toute l'equipe",
    memberImage: "/images/logo_bde.png",
    funFact: "8 etoiles forment cette comete legendaire !",
  },
  {
    question: "Quel est le theme / nom du BDE ?",
    options: ["Nebula", "Comete", "Galaxie", "Nova"],
    correctIndex: 1,
    memberName: "BDE Comete",
    memberImage: "/images/logo_bde.png",
    funFact: "Comete, parce qu'on laisse une trainee lumineuse partout ou on passe !",
  },

  {
    question: "Quel est le rôle de Mathys Dupont au sein du BDE ?",
    options: ["Secretaire", "Tresorier", "Responsable Evenementiel", "Responsable Communication"],
    correctIndex: 0,
    memberName: "Mathys Dupont",
    memberImage: "/assets/mathys.png",
    funFact: "Mathys est secrétaire : il s'occupe des comptes rendus et de l'organisation administrative.",
  },

  {
    question: "Qui s'occupe de la vie étudiante et du bien-être au sein du BDE ?",
    options: ["Kyo Rose", "Antoine Rousselle", "Alexis Chalopin", "Remi Deroussent"],
    correctIndex: 0,
    memberName: "Kyo Rose",
    memberImage: "/images/kyo.JPG",
    funFact: "Kyo organise des actions pour le bien-être étudiant et veille à l'ambiance sur le campus.",
  },

]

const quizQuestionsWithBasePath: QuizQuestion[] = quizQuestions.map((question) => ({
  ...question,
  memberImage: withBasePath(question.memberImage),
}))

const normalizedQuestions: QuizQuestion[] = quizQuestionsWithBasePath.filter((q) => {
  return (
    typeof q.question === "string" &&
    Array.isArray(q.options) &&
    q.options.length > 1 &&
    Number.isInteger(q.correctIndex) &&
    q.correctIndex >= 0 &&
    q.correctIndex < q.options.length
  )
})

export function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState(normalizedQuestions)
  const [isClient, setIsClient] = useState(false)

  // Shuffle questions only on client side to avoid hydration mismatch
  useEffect(() => {
    setShuffledQuestions([...normalizedQuestions].sort(() => Math.random() - 0.5))
    setIsClient(true)
  }, [])

  const question = shuffledQuestions[currentQuestion]
  const isCorrect = selectedAnswer === question?.correctIndex

  const handleSelect = useCallback(
    (index: number) => {
      if (!question) return
      if (selectedAnswer !== null) return
      setSelectedAnswer(index)
      setShowResult(true)
      if (index === question.correctIndex) {
        setScore((s) => s + 1)
      }
    },
    [selectedAnswer, question]
  )

  const handleNext = useCallback(() => {
    if (currentQuestion + 1 >= shuffledQuestions.length) {
      setIsFinished(true)
    } else {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }, [currentQuestion, shuffledQuestions.length])

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setIsFinished(false)
  }, [])

  const getScoreMessage = () => {
    if (shuffledQuestions.length === 0) return "Le quiz n'est pas disponible pour le moment."
    const pct = score / shuffledQuestions.length
    if (pct === 1) return "Parfait ! Tu connais le BDE par coeur !"
    if (pct >= 0.75) return "Bravo ! Tu es deja un(e) fan du BDE !"
    if (pct >= 0.5) return "Pas mal ! Tu commences a nous connaitre."
    return "Aie... Viens nous voir plus souvent !"
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-sm">
        <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-6">
          <Trophy className="text-primary" size={36} />
        </div>
        <h3 className="font-display text-3xl font-bold text-foreground mb-2">
          Quiz termine !
        </h3>
        <div className="font-display text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-4">
          {score}/{shuffledQuestions.length}
        </div>
        <p className="text-muted-foreground mb-8 text-lg">{getScoreMessage()}</p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(120,80,220,0.3)]"
        >
          <RotateCcw size={18} />
          Recommencer
        </button>
      </div>
    )
  }

  if (!question || shuffledQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-sm">
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">Quiz indisponible</h3>
        <p className="text-muted-foreground">Certaines donnees du quiz sont invalides. Reessaie plus tard.</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-sm">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground font-medium">
          Question {currentQuestion + 1}/{shuffledQuestions.length}
        </span>
        <span className="text-sm font-medium text-primary">
          Score : {score}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary mb-8 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-8">
        {question.question}
      </h3>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {question.options.map((option, index) => {
          let classes =
            "p-4 rounded-xl border text-left font-medium transition-all duration-300 cursor-pointer "
          if (showResult) {
            if (index === question.correctIndex) {
              classes += "border-[hsl(150,60%,45%)] bg-[hsl(150,60%,45%)]/10 text-[hsl(150,60%,55%)]"
            } else if (index === selectedAnswer && !isCorrect) {
              classes += "border-destructive bg-destructive/10 text-destructive"
            } else {
              classes += "border-border bg-secondary/30 text-muted-foreground opacity-50"
            }
          } else {
            classes +=
              "border-border bg-secondary/30 text-foreground hover:border-primary/50 hover:bg-primary/5"
          }
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={classes}
              disabled={showResult}
            >
              <span className="inline-flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center text-sm font-display font-bold text-muted-foreground">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </span>
            </button>
          )
        })}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border mb-6">
          <div className="flex-shrink-0">
            <Image
              src={question.memberImage}
              alt={question.memberName}
              width={64}
              height={64}
              className="rounded-lg object-cover w-16 h-16"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {isCorrect ? (
                <CheckCircle2 className="text-[hsl(150,60%,55%)]" size={18} />
              ) : (
                <XCircle className="text-destructive" size={18} />
              )}
              <span className={`font-display font-bold ${isCorrect ? "text-[hsl(150,60%,55%)]" : "text-destructive"}`}>
                {isCorrect ? "Bonne reponse !" : "Mauvaise reponse..."}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{question.funFact}</p>
          </div>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(120,80,220,0.3)]"
          >
            {currentQuestion + 1 >= shuffledQuestions.length ? "Voir le resultat" : "Suivant"}
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
