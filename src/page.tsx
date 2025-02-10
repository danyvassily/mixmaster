"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, GlassWater, Sparkles, Users, BookOpen, ChefHat } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react" // Import React
import { ParticlesBackground } from "./components/particles-background"
import { TextureOverlay } from "./components/texture-overlay"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <GlassWater className="h-8 w-8" />
              <span className="text-xl font-bold">MixMaster</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#recipes" className="hover:text-primary transition-colors">
                Recettes
              </Link>
              <Link href="#techniques" className="hover:text-primary transition-colors">
                Techniques
              </Link>
              <Link href="#community" className="hover:text-primary transition-colors">
                Communauté
              </Link>
              <Button variant="secondary">Se connecter</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Cocktail background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)",
            }}
          />
          <ParticlesBackground />
          <TextureOverlay />
        </div>

        <motion.div
          className="container mx-auto px-4 z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            L'Art de la Mixologie
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Découvrez l'univers des cocktails professionnels et perfectionnez vos techniques de mixologie
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="w-full sm:w-auto">
              Explorer les recettes
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FeatureCard
              icon={<BookOpen className="h-8 w-8" />}
              title="500+ Recettes"
              description="Une collection complète de recettes de cocktails classiques et modernes"
            />
            <FeatureCard
              icon={<ChefHat className="h-8 w-8" />}
              title="Techniques Pro"
              description="Apprenez les techniques des meilleurs barmans du monde"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Communauté"
              description="Échangez avec une communauté passionnée de mixologues"
            />
          </motion.div>
        </div>
      </section>

      {/* Popular Cocktails */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cocktails Populaires</h2>
            <p className="text-gray-400">Découvrez nos recettes les plus appréciées</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CocktailCard
              name="Old Fashioned"
              image="/placeholder.svg?height=400&width=300"
              difficulty="Intermédiaire"
              time="5 min"
            />
            <CocktailCard
              name="Negroni"
              image="/placeholder.svg?height=400&width=300"
              difficulty="Facile"
              time="3 min"
            />
            <CocktailCard
              name="Mojito"
              image="/placeholder.svg?height=400&width=300"
              difficulty="Facile"
              time="5 min"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
            }}
          />
          <TextureOverlay />
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à devenir un expert ?</h2>
            <p className="text-gray-300 mb-8">
              Rejoignez notre communauté et accédez à des centaines de recettes et tutoriels exclusifs.
            </p>
            <Button size="lg" className="animate-shimmer">
              Commencer maintenant
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <GlassWater className="h-6 w-6" />
                <span className="text-lg font-bold">MixMaster</span>
              </Link>
              <p className="text-gray-400 text-sm">Votre guide ultime dans l'art de la mixologie</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Recettes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Techniques
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">Recevez nos dernières recettes et astuces</p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Votre email" className="bg-white/10 border-white/20" />
                <Button variant="secondary">OK</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Components
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

function CocktailCard({
  name,
  image,
  difficulty,
  time,
}: {
  name: string
  image: string
  difficulty: string
  time: string
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <span>{difficulty}</span>
          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  )
}

