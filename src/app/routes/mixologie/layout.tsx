import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guide de Mixologie | MixMaster',
  description: 'Découvrez l\'art de la mixologie : techniques, verres, recettes et conseils pour créer des cocktails parfaits.',
  keywords: 'mixologie, cocktails, bartending, techniques de cocktail, verres à cocktail',
  openGraph: {
    title: 'Guide de Mixologie | MixMaster',
    description: 'Découvrez l\'art de la mixologie : techniques, verres, recettes et conseils pour créer des cocktails parfaits.',
    type: 'website',
  },
};

export default function MixologieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      {children}
    </section>
  );
} 