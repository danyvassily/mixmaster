import Link from 'next/link';
import { GlassWater } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
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
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/routes/cocktails" className="hover:text-white transition-colors">
                  Recettes
                </Link>
              </li>
              <li>
                <Link href="/routes/bars" className="hover:text-white transition-colors">
                  Bars
                </Link>
              </li>
              <li>
                <Link href="/routes/create" className="hover:text-white transition-colors">
                  Créer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Recevez nos dernières recettes et astuces</p>
            <div className="flex gap-2">
              <Button variant="secondary">S'abonner</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 