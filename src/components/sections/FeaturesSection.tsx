'use client';

import { motion } from "framer-motion"
import { BookOpen, ChefHat, Users } from "lucide-react"

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

export default function FeaturesSection() {
  return (
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
  )
} 