---
title: "Autopsie d'une application que personne n'a téléchargée"
description: Un négoce de matériaux de construction a payé une application pour recevoir des commandes. Un an plus tard, elle comptait 9 utilisateurs actifs et avait disparu de l'App Store. Nous reconstituons ce qui a mal tourné et ce qui a fonctionné à la place.
---

*Série « Acheter un logiciel sans se brûler » · Chapitre 6*

> **À propos de ce cas.** C'est un cas construit à partir de situations réelles que nous racontent des entreprises qui viennent nous voir après une mauvaise expérience. Les noms n'existent pas et les chiffres sont illustratifs. Chaque erreur, prise isolément, nous l'avons bel et bien vue.

Raúl tient un corralón (négoce de matériaux de construction) dans une ville de 40 000 habitants. Ses clients sont des maçons, des chefs de chantier et quelques particuliers qui construisent. Les commandes lui arrivent par WhatsApp, par téléphone et au comptoir, et se perdent souvent au milieu des messages.

Un neveu lui dit que ce qu'il lui faut, c'est une application. Raúl engage un studio qui la réalise pour iOS et Android, avec catalogue, panier et suivi de commande. L'application est bien faite et fonctionne.

Un an plus tard, le bilan est le suivant :

| Indicateur | Chiffre |
| --- | --- |
| Téléchargements au total | 140 |
| Utilisateurs ayant passé au moins une commande | 31 |
| Utilisateurs actifs le mois dernier | 9 |
| Commandes par WhatsApp le même mois | plus de 300 |

Et un jour, l'application a disparu de l'App Store. Voici l'autopsie.

## Erreur 1 : personne n'a demandé « pour quoi faire ? »

**Ce qui s'est passé.** La demande était « une application ». Personne n'a demandé quel problème elle devait résoudre. Le vrai problème de Raúl n'était pas que ses clients ne pouvaient pas commander : c'était que les commandes WhatsApp **se perdaient**.

**Comment l'éviter.** En partant du problème et non de la solution. « Je perds des commandes » a de nombreuses réponses possibles, et une application pour les clients est l'une des plus chères.

## Erreur 2 : demander au client de changer d'habitude

**Ce qui s'est passé.** Les maçons commandaient déjà à Raúl par WhatsApp, depuis le chantier, avec une photo de la liste écrite à la main. L'application leur demandait de télécharger quelque chose de nouveau, de s'inscrire, de chercher chaque produit dans un catalogue de 2 000 références et de composer un panier. Pour eux, c'était plus de travail, pas moins.

**Comment l'éviter.** En regardant comment le client achète **aujourd'hui**. S'il existe déjà un canal qu'ils utilisent sans effort, le plus simple est de mettre de l'ordre dans ce canal, pas de le remplacer. C'est ce que nous avons vu au [chapitre 3](/fr/blog/no-necesitas-una-app) : pour un client qui achète de temps en temps, le téléchargement est la barrière la plus haute.

## Erreur 3 : ne pas définir ce que « fonctionner » voulait dire

**Ce qui s'est passé.** Personne n'a dit avant de commencer combien de commandes par l'application suffiraient pour que ça en vaille la peine. Pendant des mois, « l'application tourne » a été confondu avec « l'application fonctionne pour l'entreprise ».

**Comment l'éviter.** Avec un chiffre avant de commencer : « si dans trois mois 20 % des commandes arrivent par ici, on continue ; sinon, on change de plan ». Sans ce chiffre, personne n'ose dire que quelque chose ne fonctionne pas.

## Erreur 4 : la maintenance que personne n'avait budgétée

**Ce qui s'est passé.** L'abonnement Apple Developer se renouvelle chaque année. Il était au nom du studio, qui avait cessé de travailler avec Raúl. Personne ne l'a renouvelé, et l'application est sortie de l'App Store. Sur Android, elle restait, mais sans mises à jour.

**Comment l'éviter.** Avec les comptes au nom de l'entreprise dès le départ ([chapitre 1](/fr/blog/quien-es-dueno-del-codigo)) et avec le coût annuel de maintenance inscrit dans le devis ([chapitre 4](/fr/blog/clausulas-contrato-programador)).

## Ce qui a fonctionné

Quand Raúl a recommencé, la question était différente : *comment faire pour qu'aucune commande WhatsApp ne se perde ?*

La solution s'est faite en trois parties, et aucune n'était une application pour les clients :

1. **Un catalogue web simple**, avec des prix à jour, qui se partage par WhatsApp avec un lien. Le client compose sa liste et l'envoie **par WhatsApp**, déjà ordonnée, sans télécharger ni s'inscrire.
2. **Un panneau interne** où chaque commande qui arrive est saisie, avec son statut (reçue, préparée, livrée) et la personne à qui elle est attribuée.
3. **Un avertissement automatique** au client quand la commande part.

Les clients ont continué à utiliser le canal qu'ils utilisaient déjà. Ce qui a changé, c'est ce qui se passait **à l'intérieur** du corralón.

## Ce que montre l'autopsie

L'application n'a pas échoué parce qu'elle était mal faite. Elle a échoué parce qu'elle résolvait un problème que Raúl n'avait pas, et non celui qu'il avait. Avant de payer pour un quelconque développement, posez-vous ces trois questions :

1. **Quel est le problème, en une phrase et sans nommer la technologie ?**
2. **Comment mes clients ou mon équipe le résolvent-ils aujourd'hui, et que leur en coûte-t-il ?**
3. **Quel chiffre me dira, dans trois mois, si cela a fonctionné ?**

Si le prestataire ne vous pose pas ces questions avant de chiffrer, posez-les-lui vous-même. Et si vous voulez que nous y réfléchissions ensemble, racontez-nous votre cas : [voici comment nous travaillons](/fr/antes-de-contratarnos).

**Retour au début de la série :** [De qui est le code de votre application ?](/fr/blog/quien-es-dueno-del-codigo)
