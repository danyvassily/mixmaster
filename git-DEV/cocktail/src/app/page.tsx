'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroBackground from '@/components/ui/HeroBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !headingRef.current || !textRef.current || !featuresRef.current || !ctaRef.current) return;

    // Animation de l'image hero avec un délai initial
    gsap.fromTo(heroRef.current,
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      }
    );

    // Animation continue de l'image
    gsap.to(heroRef.current, {
      scale: 1.1,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
      delay: 1.5 // Commence après l'animation initiale
    });

    // Animation du titre et du texte
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2
    })
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1
    }, "-=0.8")
    .from(featuresRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    }, "-=0.5")
    .from(ctaRef.current.children, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2
    }, "-=0.3");

    // Parallax effect sur l'image
    gsap.to(heroRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  return (
    <main className="min-h-screen bg-[#0A0D14] overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <HeroBackground ref={heroRef} />

        {/* Contenu principal */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 ref={headingRef} className="text-5xl md:text-7xl font-bold text-white mb-6">
              L&apos;Art de la{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Mixologie
              </span>
            </h1>
            <p ref={textRef} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explorez l&apos;univers raffiné des cocktails, où chaque verre raconte une histoire unique.
            </p>
            
            {/* Features Grid */}
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="glass-effect p-6 rounded-xl transform transition-all duration-300 hover:scale-105">
                <div className="text-blue-400 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">400+ Recettes</h3>
                <p className="text-gray-400">Des classiques aux créations modernes</p>
              </div>

              <div className="glass-effect p-6 rounded-xl transform transition-all duration-300 hover:scale-105">
                <div className="text-purple-400 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Personnalisation</h3>
                <p className="text-gray-400">Créez vos propres mélanges uniques</p>
              </div>

              <div className="glass-effect p-6 rounded-xl transform transition-all duration-300 hover:scale-105">
                <div className="text-pink-400 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Communauté</h3>
                <p className="text-gray-400">Partagez et découvrez avec les passionnés</p>
              </div>
            </div>

            {/* Call to Action */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/routes/cocktails"
                className="glass-effect px-8 py-4 rounded-full text-white hover:text-blue-400 transition-all duration-300 group flex items-center gap-2 hover:scale-105 transform"
              >
                <span>Explorer les Cocktails</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/routes/create"
                className="glass-effect px-8 py-4 rounded-full text-white hover:text-purple-400 transition-all duration-300 group flex items-center gap-2 hover:scale-105 transform"
              >
                <span>Créer un Cocktail</span>
                <svg 
                  className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </main>
  );
}
