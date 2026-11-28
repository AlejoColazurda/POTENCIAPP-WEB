---
title: "Votre site est lent : comment le mesurer gratuitement et quoi corriger en premier"
description: Une page qui met du temps à charger perd des clients avant qu'ils voient ce que vous vendez. Comment mesurer la vitesse avec les outils gratuits de Google, comment lire le résultat sans être technicien et quelles sont les causes les plus courantes.
---

Quelqu'un cherche ce que vous vendez, touche votre site depuis son téléphone et... attend. L'écran blanc, l'image qui n'en finit pas d'apparaître, le bouton qui bouge juste au moment où il allait le toucher. Beaucoup n'attendent pas : ils reviennent en arrière et ouvrent le résultat suivant.

La vitesse compte pour deux raisons : parce que **les gens partent** quand une page tarde, et parce que **Google en tient compte** comme l'un des signaux d'expérience de la page. La bonne nouvelle, c'est que la mesurer est gratuit et que les causes les plus courantes se répètent beaucoup.

## Comment la mesurer en cinq minutes

### PageSpeed Insights

Allez sur **pagespeed.web.dev**, collez l'adresse de votre site et appuyez sur « Analyser ». C'est un outil gratuit de Google et il n'est pas nécessaire de créer un compte.

Le résultat a deux parties, et il vaut mieux ne pas les confondre :

1. **Données d'utilisateurs réels** (en haut, si votre site a assez de visites) : comment l'ont vécu les personnes qui sont vraiment venues au cours des 28 derniers jours. C'est ce qui compte le plus.
2. **Diagnostic de laboratoire** (le score de 0 à 100) : un test simulé à ce moment-là. Il sert à trouver des problèmes, mais le chiffre change d'un test à l'autre. Ne vous obsédez pas à atteindre 100.

Regardez toujours l'onglet **Mobile** : la plupart de vos visites arrivent depuis un téléphone, souvent avec des données mobiles.

### Search Console

Si votre site est connecté à **Google Search Console**, le rapport **Signaux Web essentiels** vous montre quelles pages de votre site ont des problèmes, regroupées. C'est le moyen de voir le site complet et pas page par page.

## Les trois métriques, expliquées sans jargon

Google résume l'expérience en trois mesures, appelées *Core Web Vitals* :

- **LCP (le temps que met le contenu principal à apparaître).** Le temps jusqu'à ce que l'on voie l'élément le plus grand de l'écran, en général la photo ou le titre principal. Le bon seuil est **2,5 secondes ou moins**.
- **INP (le temps que met la page à répondre).** Quand vous touchez un bouton ou un menu, le temps que met la page à réagir. Le bon seuil est **200 millisecondes ou moins**.
- **CLS (à quel point tout bouge).** Si les éléments sautent pendant le chargement de la page (le classique bouton qui se décale juste au moment où vous alliez le toucher). Le bon seuil est **0,1 ou moins**.

Si les trois sont en vert, votre site va bien. Si l'une d'elles est en orange ou en rouge, c'est là qu'il y a du travail.

## Les causes les plus courantes (et quoi faire)

### 1. Des images énormes

C'est la cause numéro un. Une photo prise avec un téléphone peut peser plusieurs mégas et s'afficher dans un tout petit cadre.

**Quoi faire :** mettez en ligne les images à la taille à laquelle elles s'affichent, compressées, et dans des formats modernes comme **WebP** ou **AVIF**. Beaucoup de plateformes le font toutes seules, mais pas toujours avec les images de l'en-tête ou les bannières.

### 2. Trop d'applications, de plugins et de scripts

Chaque application de la boutique, chaque plugin WordPress, chaque pixel de suivi et chaque chat flottant ajoute du code que le téléphone doit télécharger et exécuter. Souvent, ils ont été installés pour tester quelque chose et sont restés.

**Quoi faire :** faites la liste de tout ce qui est installé et désinstallez ce que vous n'utilisez pas. C'est l'amélioration la moins chère qui existe.

### 3. Une vidéo ou un carrousel tout en haut

Une vidéo d'arrière-plan ou un carrousel de cinq grandes photos en haut de la page, c'est la première chose qui doit se charger, et c'est lourd.

**Quoi faire :** une seule image principale, bien optimisée, convertit en général aussi bien ou mieux et se charge beaucoup plus vite.

### 4. Un hébergement bon marché ou éloigné

Si le serveur est lent ou loin de vos clients, tout le reste arrive en retard.

**Quoi faire :** si PageSpeed indique que le serveur tarde à répondre (cela apparaît comme « temps de réponse du serveur »), consultez votre hébergeur ou envisagez d'en changer.

### 5. Des polices et des éléments qui se chargent tard

Les polices personnalisées et les bannières qui apparaissent après coup sont la cause typique de ce que tout bouge (le CLS).

**Quoi faire :** réserver l'espace des images et des bannières, et limiter le nombre de polices.

## Plateforme ou site sur mesure ?

Sur des plateformes comme Tiendanube ou Shopify, la base est optimisée par la plateforme, et ce qui pèse le plus, c'est **ce que vous ajoutez vous-même** : applications, images et bannières. Sur WordPress, le thème et les plugins font une grande partie de la différence. Sur un site sur mesure, la vitesse dépend de la façon dont il a été construit : il vaut mieux demander dans le contrat qu'il soit livré avec les métriques en vert, et [le vérifier à la réception](/fr/blog/como-recibir-proyecto-terminado-checklist).

## Par où commencer aujourd'hui

1. Mesurez votre page d'accueil et votre page produit la plus visitée sur **pagespeed.web.dev**, en mobile.
2. Notez les trois métriques.
3. Commencez par le moins cher : désinstaller ce que vous n'utilisez pas et réduire les images tout en haut de la page.
4. Mesurez à nouveau dans quelques jours.

Vous avez mesuré votre site et vous ne savez pas quoi faire du résultat ? Envoyez-nous le lien et nous vous dirons ce qui le ralentit.
