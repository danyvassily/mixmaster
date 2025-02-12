interface Section {
  subtitle: string;
  content: string;
}

interface Chapter {
  title: string;
  sections: Section[];
}

export const mixologieChapters: Chapter[] = [
  {
    title: "Aux Origines Mystiques du Cocktail",
    sections: [
      {
        subtitle: "1.1. Quand l'histoire flirte avec la légende",
        content: `L'attrait des humains pour les potions remonte à l'Antiquité. Nos ancêtres, qui n'avaient ni électricité ni machine à glaçons (zéro fun, on vous l'accorde), expérimentaient déjà en mélangeant des herbes, des fruits, un peu de miel, et probablement un soupçon d'alcool fermenté. L'objectif ? Donner du goût, masquer l'amertume ou carrément invoquer les esprits – littéralement !

Au fil du temps, certaines civilisations se sont spécialisées dans la création de boissons médicinales ou rituelles. Les Chinois préparaient des alcools de riz agrémentés de plantes ; les Égyptiens brassaient de la bière enrichie d'épices ; les Grecs et Romains y allaient de leurs infusions de vin et de miel. Dans ces époques reculées, boire relevait parfois de la survie (l'eau potable n'étant pas toujours au top de la pureté), mais aussi du plaisir partagé lors de banquets un peu trop arrosés.`
      },
      {
        subtitle: "1.2. Les premières expérimentations « officielles »",
        content: `Le terme "cocktail" n'apparaît dans les sources écrites qu'au début du XIXe siècle. On l'associe toutefois à des pratiques plus anciennes. Par exemple, on raconte que les marins anglais, au XVIIIe siècle, mélangeaient leur ration de rhum à du jus de citron pour éviter le scorbut. Ce délicieux breuvage préfigurait déjà le futur « grog ».

Pendant ce temps, outre-Atlantique, les Français de La Nouvelle-Orléans s'essayaient à des "mélanges" d'alcool, d'amers et de sucre, servis dans de petits coquetiers (d'où peut-être le mot « cocktail »). Bien sûr, on aime à dire qu'un certain Antoine Peychaud aurait contribué à populariser la chose. Légende ? Réalité ? Les historiens se chamaillent encore autour de cette question en brandissant des verres d'absinthe, histoire d'égayer le débat.`
      },
      {
        subtitle: "1.3. L'invention (officieuse) de la science du cocktail",
        content: `C'est en 1806 que le mot « cocktail » prend véritablement racine, lorsqu'il est défini dans The Balance and Columbian Repository comme "une liqueur stimulante, composée de spiritueux, de sucre, d'eau et d'amers". Rien de bien compliqué, mais cette phrase marque le début de ce que l'on nommera plus tard la « mixologie ».

Dès lors, les bases sont posées :
• Un alcool principal (la force)
• Du sucré (souvent du sucre ou un sirop)
• Parfois des amers (pour l'équilibre, et parce que les gens aimaient un peu souffrir à l'époque)
• De l'eau (à l'époque, la glace n'était pas toujours à portée de main, alors l'eau faisait l'affaire pour diluer)

Un cocktail était né, et avec lui tout un univers en ébullition.`
      }
    ]
  },
  {
    title: "Le Temps des Pionniers Flamboyants",
    sections: [
      {
        subtitle: "2.1. Jerry Thomas, le rock star de l'époque",
        content: `Imaginez un barman du XIXe siècle, arborant une moustache époustouflante – on dit qu'elle était presque aussi longue que la file d'attente de clients à son bar. Jerry Thomas, considéré comme le « père de la mixologie américaine », a sillonné les États-Unis, l'Europe, et même l'espace intersidéral (selon certains mythomanes) pour diffuser ses recettes.

Son livre Bartender's Guide (1862) est le premier recueil de recettes de cocktails, fixant un vocabulaire et des normes. Dans ce guide, on retrouve des cocktails toujours célèbres, comme le "Blue Blazer" – un mélange enflammé de whisky et d'eau bouillante. La légende raconte qu'il le transvasait en jets de feu d'un récipient à l'autre, pour éblouir les clients et embraser les moustaches trop curieuses. À l'époque, on ne connaissait pas les normes de sécurité incendie, mais on connaissait le show !`
      },
      {
        subtitle: "2.2. Ada Coleman, la première dame du bar",
        content: `Si on devait décerner un prix de la mixologue la plus badass du début du XXe siècle, Ada Coleman (dite « Coley ») décrocherait la palme sans hésiter. Barmanie en chef à l'American Bar du Savoy Hotel de Londres, elle inventa le fameux "Hanky Panky", un mélange de gin, de vermouth italien et d'un trait de Fernet Branca. Le nom viendrait d'un acteur qui, en goûtant ce mélange, s'exclama : "By Jove! That is the real hanky-panky!" (traduction : "Nom d'un chien, ça c'est du sorcier !").

Ada Coleman restera dans les annales pour avoir prouvé que le bar n'était pas un sanctuaire exclusivement masculin. Avec le sourire et une détermination à toute épreuve, elle a servi les grandes figures de son temps, y compris des aristocrates qui ont dû ravaler leur machisme en goûtant ses créations.`
      },
      {
        subtitle: "2.3. Harry Craddock, l'énigmatique",
        content: `Autre figure emblématique du Savoy Hotel : Harry Craddock. Son Savoy Cocktail Book (1930) est un véritable trésor de la mixologie classique. On y découvre des centaines de recettes, des plus classiques aux plus farfelues, toutes illustrées de charmantes gravures Art déco.

Craddock aimait dire qu'un cocktail devait être "assez fort pour réveiller les morts, mais assez doux pour faire chanter les anges". On ne sait pas s'il a testé cet adage sur de véritables défunts ou des anges en goguette, mais à en juger par la longévité de ses recettes, il devait être dans le vrai.`
      }
    ]
  },
  {
    title: "L'Âge d'Or et la Prohibition, un Grand Écart Pittoresque",
    sections: [
      {
        subtitle: "3.1. L'avant-Prohibition : la fête à tous les étages",
        content: `Entre la fin du XIXe et le début du XXe siècle, les cocktails s'invitent dans tous les grands hôtels et clubs privés. Les Américains, friands de nouveautés, encouragent l'inventivité des barmans. New York, Chicago, San Francisco… chaque grande ville a ses bars de légende.`
      },
      {
        subtitle: "3.2. 1920-1933 : la Prohibition, ou l'art de boire en secret",
        content: `Patatras, voilà que les États-Unis interdisent la production, la vente et la distribution d'alcool. Officiellement, la fête est finie. Officieusement, elle ne fait que commencer dans les speakeasies, ces bars clandestins où tout est permis (sauf le droit d'en parler trop fort).`
      },
      {
        subtitle: "3.3. Les cocktails de la Prohibition",
        content: `L'alcool de contrebande étant souvent de piètre qualité, les barmans redoublent d'ingéniosité pour masquer son goût. C'est l'âge d'or des cocktails sucrés, des mélanges complexes et des recettes qui deviendront des classiques comme le Bee's Knees (gin, miel et citron) ou le Southside (gin, menthe et citron vert).`
      }
    ]
  },
  {
    title: "L'Après-Guerre et la Période de Sombre Désuétude",
    sections: [
      {
        subtitle: "4.1. Fin des illusions",
        content: `Après la Seconde Guerre mondiale, le monde est en reconstruction. Les gens ont soif d'insouciance, mais paradoxalement, on assiste à une uniformisation du goût. La culture de masse s'installe, avec ses grands sodas, ses produits préfabriqués et des chaines d'hôtels standardisées.`
      },
      {
        subtitle: "4.2. Le Tiki, un exotisme en demi-teinte",
        content: `Pourtant, dans cette uniformité, naît un courant déjanté : le style Tiki. Né à la fin des années 1930 grâce à Ernest Gantt, alias Don the Beachcomber, et popularisé par Trader Vic (Victor Bergeron), le Tiki se caractérise par des décors polynésiens kitsch.`
      },
      {
        subtitle: "4.3. Les années disco et la décadence",
        content: `Les années 1970-1980 marquent le point le plus bas de la mixologie. Les cocktails deviennent fluorescents, ultra-sucrés, et la qualité des spiritueux passe au second plan. C'est l'époque des Blue Lagoon, des Sex on the Beach et autres cocktails aux noms suggestifs mais à la composition douteuse.`
      }
    ]
  },
  {
    title: "La Renaissance (des Années 1990 à nos Jours)",
    sections: [
      {
        subtitle: "5.1. Le retour des puristes",
        content: `Vers la fin du XXe siècle, un vent de renouveau souffle. Quelques barmans, nostalgiques des grandes recettes d'antan, se mettent en tête de dépoussiérer le patrimoine. Ils ressortent les vieux grimoires de Jerry Thomas, Harry Craddock, et Ada Coleman.`
      },
      {
        subtitle: "5.2. La vague moléculaire",
        content: `Impossible de parler de la mixologie contemporaine sans évoquer la fameuse "cuisine moléculaire", importée dans le monde du bar. Certains mixologues s'emparent d'ingrédients scientifiques pour créer des cocktails texturés, fumants ou en sphères.`
      },
      {
        subtitle: "5.3. Le néo-classicisme et l'avenir",
        content: `Aujourd'hui, la tendance est au retour aux sources, mais avec une touche de modernité. Les mixologues contemporains privilégient les ingrédients de qualité, les techniques traditionnelles, tout en innovant sur les saveurs et les présentations. L'avenir ? Une fusion entre tradition et innovation, où chaque verre raconte une histoire.`
      }
    ]
  },
  {
    title: "Les Bars Mythiques à Travers le Monde",
    sections: [
      {
        subtitle: "6.1. Les temples historiques",
        content: `De l'American Bar du Savoy à Londres au Harry's New York Bar de Paris, en passant par le Floridita de La Havane, certains établissements sont devenus de véritables institutions. Leurs murs résonnent encore des conversations d'Ernest Hemingway, F. Scott Fitzgerald ou Winston Churchill.`
      },
      {
        subtitle: "6.2. Les nouveaux temples",
        content: `La scène contemporaine ne manque pas de lieux d'exception. Le Dead Rabbit à New York, le Little Red Door à Paris, le 28 HongKong Street à Singapour... Ces établissements repoussent les limites de la créativité tout en respectant l'héritage de leurs prédécesseurs.`
      },
      {
        subtitle: "6.3. Les bars secrets d'aujourd'hui",
        content: `L'esprit des speakeasies perdure à travers les bars cachés modernes. Derrière une porte anonyme, au fond d'une ruelle, ces établissements perpétuent la tradition du mystère et de l'exclusivité, avec une touche de théâtralité contemporaine.`
      }
    ]
  },
  {
    title: "Les Alcools, Colonne Vertébrale de la Mixologie",
    sections: [
      {
        subtitle: "6.1. Les eaux-de-vie de vin",
        content: `• Cognac : Né en Charente, vieilli en fûts de chêne, classé selon son âge (VS, VSOP, XO). Autrefois réservé aux gentlemen du cigare, il s'invite aujourd'hui dans des cocktails chic et choc, comme le Sidecar.
• Armagnac : Plus rustique, mais tout aussi noble. Les Gascouns le boivent en sifflotant. Excellent dans un Collins revisité ou un punch chaud.`
      },
      {
        subtitle: "6.2. Les eaux-de-vie de fruits",
        content: `• Calvados : Du cidre distillé, vieilli, puis assemblé. Goût de pomme parfois intense, idéal pour un "Normandy Mule" (remplacez la vodka par du Calva) – et hop, c'est la fête dans votre bouche.
• Kirsch : Eau-de-vie de cerise, made in Alsace. Attention à ne pas en abuser, sous peine de chanter du yodel en dialecte local.`
      },
      {
        subtitle: "6.3. Les eaux-de-vie de marc",
        content: `• Grappa : Liqueur italienne tirée du marc de raisin. Parfumée, parfois corsée. On la trouve dans des cocktails méditerranéens ou en digestif, pour rappeler à tout le monde que la dolce vita, ça se vit à fond.`
      },
      {
        subtitle: "6.4. Le rhum",
        content: `• Rhum agricole : Issu de la canne à sucre fraîche (et non de la mélasse). Produits phares aux Antilles françaises, à la Réunion…
• Rhum traditionnel : À base de mélasse, souvent produit dans les Caraïbes, en Amérique latine. Le rhum est la star incontestée des cocktails ensoleillés (Mojito, Cuba Libre, Daiquiri, Piña Colada…).`
      },
      {
        subtitle: "6.5. Le gin",
        content: `• Dry gin : Le plus répandu, aromatisé principalement aux baies de genévrier, coriandre, écorces d'agrumes…
• Nouveaux gins : Fleuris, épicés, infusés au concombre ou à la rose… On en a pour tous les goûts.
• Genever : Version hollandaise, l'ancêtre du gin moderne. Parfait pour se la jouer puriste, ou pour se réchauffer un soir d'hiver.`
      },
      {
        subtitle: "6.6. La vodka",
        content: `Spiritueux de céréales (blé, seigle) ou de pommes de terre, souvent filtré pour être le plus neutre possible. Idéale en cocktail, car elle laisse la vedette aux autres ingrédients. À l'occasion, il existe des vodkas aromatisées (vanille, piment, fruit de la passion…), pour ceux qui aiment les frissons gustatifs.`
      },
      {
        subtitle: "6.7. Le whisky",
        content: `• Scotch single malt : Vieilli en fût de chêne, parfois tourbé (goût fumé). Les puristes le sirotent sec, mais un Bartender audacieux peut oser un cocktail à base de scotch, comme le "Penicillin".
• Bourbon : Originaire des États-Unis, produit à partir de maïs et de céréales, vieilli en fût de chêne neuf. Incroyable dans un Old Fashioned ou un Whiskey Sour, pour sentir la puissance de l'Amérique.
• Rye : Au seigle, plus épicé, très à la mode depuis quelques années. Parfait pour un Manhattan qui se respecte.`
      },
      {
        subtitle: "6.8. Les liqueurs",
        content: `Une vaste famille, allant du triple sec (Cointreau, Grand Marnier) aux liqueurs d'herbes (Chartreuse, Bénédictine), sans oublier toutes les versions fruitées (Limoncello, crème de pêche…). Elles apportent la douceur, la couleur, et parfois la signature aromatique d'un cocktail.`
      },
      {
        subtitle: "6.9. Les apéritifs",
        content: `• Vermouth (sec ou doux) : Indispensable pour le Martini, le Manhattan, le Negroni…
• Campari : Amer rouge vif, star du Negroni.
• Porto, Xérès, Madère : Vins fortifiés qu'on peut marier à des spiritueux, donnant des cocktails riches et complexes.`
      }
    ]
  },
  {
    title: "Techniques Traditionnelles et Petits Tours de Magie",
    sections: [
      {
        subtitle: "7.1. Au verre (méthode directe)",
        content: `On verse les ingrédients directement dans le verre, on remue éventuellement à la cuillère. Simple comme "bonjour", mais gare au dosage. L'esthétique se joue souvent sur des superpositions de liquides de densités différentes (tequila sunrise, par exemple).`
      },
      {
        subtitle: "7.2. Au shaker",
        content: `Le grand classique : on met tous les ingrédients dans un shaker avec de la glace, on secoue avec style (ou pas, selon votre sens de la coordination), et on filtre dans un verre. Les cocktails contenant jus, sirops, œufs ou crème aiment beaucoup cette méthode pour se mêler harmonieusement.`
      },
      {
        subtitle: "7.3. Au verre à mélange",
        content: `On mélange les ingrédients sur de la glace, délicatement, pour éviter de trop incorporer d'air. Ensuite, on filtre dans une coupette ou un verre à cocktail. Cette technique préserve la limpidité et la texture, essentielle pour des cocktails comme le Martini ou le Manhattan.`
      },
      {
        subtitle: "7.4. La passoire et le double filtrage",
        content: `Le petit détail qui fait la différence : après avoir secoué un cocktail au shaker, on peut filtrer une première fois (pour retenir les glaçons) puis une seconde fois (avec une petite passoire fine) pour capturer les éclats de glace. Résultat : une boisson parfaitement soyeuse.`
      },
      {
        subtitle: "7.5. Les superpositions de couches",
        content: `Requiert de la précision et de la patience. On verse délicatement chaque liquide selon sa densité (le plus lourd en premier, le plus léger en dernier). Le B-52 en est un exemple phare (Kahlúa, Baileys, Grand Marnier), un shot en trois étages.`
      },
      {
        subtitle: "7.6. Le flambage",
        content: `Ah, la pyrotechnie en bar ! Il s'agit de chauffer et d'enflammer un spiritueux (souvent du rhum ou du whisky), puis de le verser flambant dans le verre. Effet "wahou" garanti, mais attention aux sourcils !`
      },
      {
        subtitle: "7.7. Les techniques moléculaires",
        content: `Sphérification, émulsification, mousses, gelées, fumages… On peut vraiment s'amuser, à condition d'avoir l'âme (et l'équipement) d'un chimiste. C'est le moment où le bar se transforme en laboratoire, où l'on pèse des grammes au dixième près, où l'on porte des lunettes de protection pour éviter les accidents d'azote liquide.`
      }
    ]
  },
  {
    title: "Familles de Cocktails et Quelques Exemples Déjantés",
    sections: [
      {
        subtitle: "8.1. Les highballs",
        content: `Un spiritueux + un soft + beaucoup de glace, servi dans un verre long. Exemple : le Whisky Soda (le préféré de votre grand-oncle Georges), ou le Cuba Libre (rhum, cola, citron vert).`
      },
      {
        subtitle: "8.2. Les short drinks",
        content: `Généralement entre 7 et 10 cl, servis sans glace dans un verre à cocktail. Comme le Martini Dry ou le Manhattan. C'est la catégorie qui se la joue "classe et concis".`
      },
      {
        subtitle: "8.3. Les long drinks",
        content: `Plus de 12 cl, souvent des cocktails rafraîchissants à base de jus de fruits ou d'eaux gazeuses. Le Mojito, la Caïpirinha, etc. Parfait pour les après-midis ensoleillés.`
      },
      {
        subtitle: "8.4. Les shooters",
        content: `Petits verres de 3 à 6 cl, qu'on avale cul-sec. Parfois superposés (B-52, tequila paf). Attention, c'est mignon, mais ça peut renverser plus d'une conscience !`
      },
      {
        subtitle: "8.5. Les sparklings",
        content: `Cocktails au champagne ou vin pétillant. Ex. : le French 75 (gin, jus de citron, sucre, champagne). Parfaits pour célébrer quelque chose (ou rien).`
      },
      {
        subtitle: "8.6. Les mocktails",
        content: `Sans alcool, mais pas sans saveur ! Un bon barman sait sublimer un jus de fruit en y ajoutant des sirops, des herbes fraîches, des épices, et créer un cocktail tout aussi complexe et séduisant.`
      },
      {
        subtitle: "8.7. Les classiques inclassables",
        content: `• Old Fashioned : Sucre, bitters, whisky. Simple, direct, mais exigeant quant à la qualité du spiritueux.
• Negroni : Gin, vermouth rouge, Campari. Amer, équilibré, irrésistible, inventé par le Comte Negroni pour pimenter son apéritif.
• Sazerac : Cognac ou rye, absinthe, sucre, bitters. Né à La Nouvelle-Orléans, c'est un cocktail de caractère.`
      }
    ]
  },
  {
    title: "L'Art de la Décoration",
    sections: [
      {
        subtitle: "9.1. Les garnitures classiques",
        content: `• Zeste d'agrumes : On peut le "twister" et le frotter sur le rebord du verre pour libérer des huiles essentielles.
• Tranches de fruits : Orange, citron, concombre, fraises, ananas… Autant de couleurs pour habiller le verre.
• Herbes fraîches : Menthe, basilic, thym, romarin… Ça ajoute un parfum subtil et un look végétal.`
      },
      {
        subtitle: "9.2. Le givrage de verre",
        content: `On trempe le rebord dans du jus de citron, puis dans du sucre ou du sel selon le cocktail. Le Margarita, par exemple, requiert un bord salé. Pour plus de fantaisie, on peut utiliser du sucre coloré ou aromatisé.`
      },
      {
        subtitle: "9.3. Les brochettes et piques à cocktail",
        content: `On peut enfiler des fruits, des olives, des cerises confites, des cubes de fromage (pour les plus audacieux), et les disposer sur le verre. Ça donne un aspect festif, et ça peut servir d'en-cas entre deux gorgées.`
      },
      {
        subtitle: "9.4. Les flambages décoratifs",
        content: `On peut flamber une écorce d'orange ou un morceau de sucre imbibé d'alcool sur le rebord du verre, pour ajouter un petit spectacle. Regardez bien vos mains et vos sourcils, on ne le répétera jamais assez.`
      },
      {
        subtitle: "9.5. Les glaçons artistiques",
        content: `Des glaçons taillés à la main, des sphères de glace, ou des blocs transparents comme du cristal… Au-delà de l'esthétique, la taille du glaçon influence la dilution. On peut même y enfermer des fleurs comestibles ou des petits fruits pour l'effet "Whaou".`
      }
    ]
  },
  {
    title: "Les Bars Mythiques et Autres Repaires de Cocktailophiles",
    sections: [
      {
        subtitle: "10.1. Retour sur quelques temples historiques",
        content: `• Harry's New York Bar (Paris) : Ouvert en 1911, berceau du Bloody Mary et du French 75. Ambiance feutrée, banquettes en cuir, on se croirait dans un film d'époque.
• Bar Hemingway au Ritz (Paris) : Un sanctuaire de l'élégance, avec des cocktails à rendre hommage à l'écrivain le plus assoiffé de tous les temps.
• El Floridita (La Havane) : Le "berceau du Daïquiri", fréquenté par Hemingway. Décidément, cet homme avait l'art de repérer les meilleurs bars…`
      },
      {
        subtitle: "10.2. Les adresses tendance",
        content: `• Little Red Door (Paris) : Classé régulièrement parmi les meilleurs bars du monde. On y entre par une petite porte rouge (d'où le nom…), on découvre un univers intime, et des cocktails créatifs à tomber.
• Bar Nouveau (Paris) : Carte inventive, ingrédients rares, ambiance moderne et décontractée.
• Death & Co (New York) : L'un des pionniers de la nouvelle vague cocktail, à l'ambiance speakeasy soignée.`
      },
      {
        subtitle: "10.3. L'essor des \"speakeasy\" modernes",
        content: `Vous pensez entrer dans une laverie automatique ? Surprise, derrière la porte du fond se cache un bar tamisé, où un barman en nœud papillon vous chuchote la carte. C'est la magie du speakeasy 2.0 : recréer l'atmosphère interdite et clandestine de la Prohibition, mais avec une autorisation légale de vendre de l'alcool. Le frisson demeure, la peur du gendarme en moins.`
      }
    ]
  },
  {
    title: "Les Tendances Actuelles et Futuristes",
    sections: [
      {
        subtitle: "11.1. Le retour aux recettes oubliées",
        content: `Ces dernières années, les mixologues se sont plongés dans les livres anciens. On réédite des cocktails méconnus, on explore des amers disparus, on fabrique soi-même ses infusions. C'est le règne de la nostalgie, mais une nostalgie assumée, qui fait du neuf avec du vieux.`
      },
      {
        subtitle: "11.2. La mixologie consciente et durable",
        content: `Grande tendance : réduire le gaspillage, favoriser les produits locaux et de saison, recycler les épluchures en sirops ou en "shrubs". Certains bars privilégient même le "zéro déchet". On verra peut-être un jour des cocktails servis dans des verres comestibles (oui, ça existe déjà, mais c'est encore expérimental).`
      },
      {
        subtitle: "11.3. Les low-ABV et les mocktails",
        content: `Tout le monde n'a pas envie de terminer la soirée à quatre pattes. D'où la popularité grandissante des cocktails faiblement alcoolisés ou sans alcool du tout. Les bartenders redoublent d'ingéniosité pour créer des saveurs subtiles, complexes, sans la béquille de l'éthanol. Résultat : des mocktails dignes des meilleurs cocktails classiques, et des low-ABV tout en fraîcheur.`
      },
      {
        subtitle: "11.4. L'invasion du numérique",
        content: `Des cartes de cocktails en réalité augmentée, des robots bartenders, des applications pour commander à table… Le futur est déjà là. Mais ne vous inquiétez pas, la magie du contact humain, du sourire complice entre le barman et le client, ça, aucun robot ne le remplacera (enfin, pas encore).`
      }
    ]
  },
  {
    title: "Règles d'Or, Petits Conseils et Pièges à Éviter",
    sections: [
      {
        subtitle: "12.1. Maîtriser les classiques",
        content: `Un bon barman (ou barmaid) doit connaître par cœur une poignée de cocktails iconiques. À défaut, sachez au moins improviser un Old Fashioned, un Negroni et un Martini. C'est un peu le minimum syndical, l'ABC de la mixologie.`
      },
      {
        subtitle: "12.2. Une seule eau-de-vie de base",
        content: `Dans un même cocktail, évitez de mélanger plusieurs grosses bases alcoolisées (ex. rhum + whisky + gin + vodka). Sauf si vous voulez recréer la célèbre "potion magique" des soirées estudiantines (et les lendemains douloureux qui vont avec).`
      },
      {
        subtitle: "12.3. Pas plus de 6 ingrédients",
        content: `Trop d'ingrédients, c'est comme un orchestre qui joue sans chef : la cacophonie est proche. Il faut de la clarté, de l'équilibre.`
      },
      {
        subtitle: "12.4. Ne pas dépasser 7 cl d'alcool pur",
        content: `C'est un repère de l'école hôtelière française. Au-delà, le cocktail devient un missile. Sauf bien sûr dans le cadre d'un shooter décadent, mais là, vous savez où vous mettez les pieds.`
      },
      {
        subtitle: "12.5. Le secret des \"3 S\"",
        content: `Un cocktail équilibré repose sur la trilogie "sucré, acide, fort" (plus éventuellement une touche amère pour sublimer le tout). Jouez sur ces axes pour ajuster votre mélange, tel un équilibriste sur un fil.`
      }
    ]
  },
  {
    title: "Anecdotes, Mythes et Histoires (Plus ou Moins) Vraies",
    sections: [
      {
        subtitle: "13.1. L'absinthe qui rend fou",
        content: `Au tournant du XXe siècle, l'absinthe a été accusée de rendre la population démente. En réalité, les gens en buvaient sans doute trop, et c'est l'alcool à forte dose, plus que la plante d'absinthe, qui leur jouait des tours. Mais l'idée du poète maudit, hanté par la fée verte, est restée dans l'imaginaire collectif.`
      },
      {
        subtitle: "13.2. Le Bloody Mary et la Vierge Sanglante",
        content: `Le Bloody Mary doit son nom à la Reine Mary I, surnommée "Bloody Mary" pour sa persécution des protestants. Ou alors au baron sanglant d'une époque, ou encore à une serveuse prénommée Mary. Chaque version de l'histoire a ses partisans. Choisissez celle qui vous amuse le plus.`
      },
      {
        subtitle: "13.3. Hemingway, buveur légendaire",
        content: `Ernest Hemingway, grand amateur de cocktails, aurait un jour lancé : "Mon Mojito à la Bodeguita, mon Daïquiri à El Floridita." Personne ne sait s'il l'a vraiment prononcé, mais les bars concernés ont imprimé la phrase sur leurs murs, parce que c'est bon pour le tourisme et l'ego.`
      },
      {
        subtitle: "13.4. La guerre du Mai Tai",
        content: `Trader Vic et Don the Beachcomber se disputaient la paternité de ce cocktail emblématique du style Tiki. Chacun clamait l'avoir inventé en premier. Dans le doute, on trinque deux fois.`
      },
      {
        subtitle: "13.5. Le bar qui refusa James Bond",
        content: `On raconte qu'un bar ultrachic de Londres aurait interdit à un client de commander un Martini "au shaker, pas à la cuillère". Le barman, puriste, trouvait cela totalement hérétique. Résultat : le client, vexé, n'est jamais revenu – et il est peut-être devenu un super-vilain dans un film 007.`
      }
    ]
  }
];

export default mixologieChapters; 