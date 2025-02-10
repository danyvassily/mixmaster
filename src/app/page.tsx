import dynamic from 'next/dynamic'

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'))
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'))

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}

