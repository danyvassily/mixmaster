import React from 'react';
import { motion } from 'framer-motion';
import mixologieChapters from '@/data/mixologieChapters';

const ArticleMixologie = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const chapterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.article
      className="prose prose-lg max-w-none dark:prose-invert"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-12 text-center space-y-8">
        <h1 className="text-5xl font-bold mb-6 text-amber-400">
          L'Art de la Mixologie : Plongée Épique dans l'Univers des Cocktails
        </h1>
        
        <blockquote className="text-xl italic text-white border-l-4 border-amber-400 pl-4">
          « Les cocktails sont à la boisson ce que les symphonies sont à la musique : une harmonie de saveurs qui suscite l'émotion. »
          <br />
          <span className="text-sm text-white/80">(Quelqu'un, quelque part, un soir où l'alcool coulait à flots.)</span>
        </blockquote>
      </div>

      <div className="note-auteur mb-12 p-8 bg-amber-900/10 rounded-xl border border-amber-400/20">
        <p className="italic text-lg text-white leading-relaxed">
          Note de l'auteur : Le texte qui suit est une plongée exhaustive – et parfois un peu loufoque – dans l'univers de la mixologie. 
          Nous allons parcourir des siècles d'histoire, rencontrer des figures hautes en couleur, découvrir des techniques parfois ésotériques, 
          analyser des ingrédients étonnants et rire un peu au passage. Installez-vous confortablement, car nous visons ici une longueur 
          avoisinant ou dépassant les 6000 mots – une épopée, en somme ! Prévoyez un petit en-cas et, pourquoi pas, un cocktail à portée de main…
        </p>
      </div>

      <div className="mb-16 text-white leading-relaxed space-y-6">
        <p>
          Lorsque nous parlons de mixologie, nous évoquons à la fois la créativité débridée, la précision millimétrée, 
          l'héritage historique et la volonté farouche d'enchanter nos papilles. Dans cet article, je vous propose un voyage 
          entre passé, présent et futur du cocktail, ponctué de quelques notes d'humour. Car oui, vous l'apprendrez bien vite : 
          la mixologie, c'est sérieux… mais pas trop !
        </p>
        <p>
          Nous allons décortiquer l'histoire du cocktail en de multiples chapitres, évoquer des anecdotes cocasses, 
          présenter des figures emblématiques à la moustache légendaire ou au flair inégalé, découvrir l'éventail d'alcools 
          et de liqueurs, sans oublier les techniques magiques pour secouer vos shakers sans tout renverser (ce qui est déjà 
          un exploit en soi). Nous parlerons aussi des tendances actuelles, des règles d'or qui peuvent guider vos élans créatifs, 
          et nous terminerons sur un florilège d'histoires à dormir debout, prouvant que le monde du bar est un théâtre où se 
          jouent de véritables scènes de comédie.
        </p>
        <p className="text-xl font-semibold text-amber-400">
          Prêts à trinquer ? Alors levons nos verres et partons ensemble pour cette grande odyssée de la mixologie !
        </p>
      </div>

      {mixologieChapters.map((chapter, index) => (
        <motion.section 
          key={index + 1}
          className="mb-20"
          variants={chapterVariants}
        >
          <h2 className="text-4xl font-bold mb-8 text-amber-400 border-b border-amber-400/20 pb-4">
            Chapitre {index + 1} : {chapter.title}
          </h2>
          
          <div className="space-y-8 text-white">
            {chapter.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {section.subtitle}
                </h3>
                <div className="text-white leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      <motion.div 
        className="conclusion mt-20 p-8 bg-amber-900/10 rounded-xl border border-amber-400/20"
        variants={chapterVariants}
      >
        <h2 className="text-3xl font-bold mb-6 text-amber-400">
          Conclusion : La Mixologie, un Art Vivant et un Divertissement
        </h2>
        <div className="text-white space-y-6">
          <p>
            Nous voici arrivés à la fin de ce long, très long (et un peu délirant) voyage. Si vous avez tenu jusqu'ici, 
            félicitations, vous venez d'ingurgiter l'équivalent d'un manuel de bar en version romancée et humoristique...
          </p>
          <p>
            La mixologie est bien plus qu'une simple pratique : c'est un art qui mêle histoire, 
            créativité et savoir-faire. Des premiers mélanges mystiques aux créations moléculaires 
            d'aujourd'hui, elle n'a cessé d'évoluer tout en conservant son essence : le plaisir 
            du partage et de la découverte. Alors, à votre santé, et n'oubliez pas : la meilleure 
            façon d'apprécier un cocktail, c'est de connaître son histoire !
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="mt-12 text-center italic text-amber-400"
        variants={chapterVariants}
      >
        À votre santé, et que la créativité soit avec vous !
      </motion.div>
    </motion.article>
  );
};

export default ArticleMixologie; 