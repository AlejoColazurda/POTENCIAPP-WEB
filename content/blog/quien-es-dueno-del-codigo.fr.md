---
title: De qui est le code de votre application ? Le détail qui peut faire de vous l'otage de votre programmeur
description: Vous avez payé le développement, mais cela ne fait pas de vous le propriétaire. Ce que dit la loi argentine, ce que doit dire votre contrat et les sept accès qui doivent être à votre nom.
---

*Série « Acheter un logiciel sans se brûler » · Chapitre 1*

Une scène se répète sans cesse. Une entreprise paie pour une application, une boutique en ligne ou un système. Tout fonctionne bien pendant un an. Un jour, le courant ne passe plus avec le programmeur, ou le programmeur change de travail, ou tout simplement il cesse de répondre. Et le propriétaire découvre qu'il n'a rien : ni le code, ni le compte où l'application est publiée, ni le mot de passe du serveur, ni le nom de domaine.

Il a payé pour quelque chose qui n'a jamais été à lui.

## Payer n'est pas la même chose qu'être propriétaire

En Argentine, le logiciel est protégé par la loi sur la propriété intellectuelle (Ley 11.723, qui l'inclut expressément depuis la réforme de la Ley 25.036). La règle générale est simple : **l'auteur est celui qui l'écrit**.

La loi prévoit une exception pour les salariés : ce qu'un salarié programme dans le cadre de son travail appartient à l'employeur, sauf accord contraire. Mais la plupart des entreprises n'embauchent pas de salariés pour faire leur logiciel : elles font appel à un indépendant ou à une agence. Et dans ce cas, **aucune présomption n'est en votre faveur**. Si le contrat ne dit pas que les droits vous sont cédés, il est fort probable qu'ils restent à celui qui l'a programmé.

Concrètement, cela signifie que vous pouvez avoir le droit d'*utiliser* le système, mais pas celui de l'emporter chez un autre prestataire, de le modifier ou de le vendre avec votre entreprise.

> Ceci n'est pas un conseil juridique : si le projet est important, faites relire le contrat par un avocat avant de signer. Mais que le sujet figure dans le contrat, cela ne dépend que de vous.

## Ce que doit dire le contrat

Trois choses, par écrit et sans détour :

1. **Cession des droits.** Que les droits patrimoniaux sur le code développé pour vous vous appartiennent (ou vous sont cédés) une fois le paiement effectué. Si le prestataire utilise des éléments à lui qu'il réutilise dans d'autres projets, que le contrat précise que vous disposez d'une licence d'utilisation perpétuelle sur ces éléments.
2. **Remise du code source.** « L'application installée » ne suffit pas. Le contrat doit dire qu'on vous remet le code source complet, dans un dépôt auquel vous avez accès, à chaque étape et à la fin.
3. **Accès à votre nom.** Que tous les comptes dont le système a besoin pour fonctionner soient créés à votre nom ou au nom de votre entreprise, et que le prestataire travaille avec un utilisateur invité.

Si on vous fait un devis par WhatsApp et qu'il n'y a pas de contrat, aucune de ces trois choses n'existe.

## Les sept accès qui doivent être à votre nom

Le code n'est qu'une partie. Un système vit réparti sur plusieurs comptes, et n'importe lequel d'entre eux peut servir à vous tenir en laisse :

| Accès | Pourquoi c'est important |
| --- | --- |
| **Nom de domaine** (NIC Argentina ou tout autre registraire) | S'il est au nom du programmeur, votre site web et votre e-mail dépendent de lui. Chez NIC Argentina (le registre officiel des domaines .ar), faites figurer votre CUIT (numéro d'identification fiscale) comme titulaire. |
| **Dépôt de code** (GitHub, GitLab) | C'est là que se trouvent le code et son historique. Une organisation à vous, avec le prestataire comme membre invité. |
| **Hébergement ou serveur** (Vercel, AWS, un VPS) | Si le compte est à lui, il peut tout éteindre. Et la facture doit vous arriver à vous. |
| **Compte Apple Developer** | L'application est publiée au nom d'un compte. Si c'est celui du programmeur, l'application « est » à lui aux yeux d'Apple. |
| **Compte Google Play Console** | Même chose pour Android. |
| **Base de données et sauvegardes** | Vos clients, vos commandes et vos ventes. Vous devez pouvoir télécharger une copie sans demander la permission à personne. |
| **Passerelles de paiement et API** (Mercado Pago, expéditions, WhatsApp, IA) | Les identifiants doivent être ceux de votre compte. Si vous encaissez avec les identifiants d'un autre, l'argent passe par un autre. |

Transférer une application d'un compte Apple ou Google à un autre est possible, mais cela demande la collaboration des deux parties. Si la relation est déjà rompue, cette démarche devient une négociation. Mieux vaut partir avec tout à votre nom.

## Comment le vérifier dès aujourd'hui, même si vous avez déjà le système

Nul besoin de savoir programmer. Voici ce qui suffit :

1. **Demandez le lien du dépôt** et vérifiez que vous pouvez y entrer avec votre propre compte d'utilisateur.
2. **Cherchez votre domaine chez NIC Argentina** (ou chez le registraire) et regardez qui figure comme titulaire.
3. **Demandez au nom de qui sont le compte Apple et le compte Google** où l'application est publiée. Si le nom du programmeur apparaît dans la boutique d'applications, vous avez déjà la réponse.
4. **Regardez à qui arrive la facture de l'hébergement.** Si elle ne vous arrive pas à vous, ce n'est pas à vous.
5. **Demandez une sauvegarde de la base de données** et conservez-la. Si on vous la refuse ou si on vous répond que « ce n'est pas possible », c'est un signal.

Si l'une de ces réponses vous met mal à l'aise, inutile d'en venir au conflit : la plupart des prestataires sérieux transfèrent les accès sans problème quand on les leur demande clairement. Le moment de le faire, c'est **maintenant**, tant que la relation est bonne.

## La question qui distingue un prestataire sérieux

Avant de signer, demandez : *« Si demain nous cessons de travailler ensemble, qu'est-ce que j'emporte ? »*

La bonne réponse est courte : le code, les accès, la base de données et la documentation pour qu'un autre puisse continuer. Si la réponse est longue, vague ou commence par « eh bien, ça dépend », vous savez déjà ce qu'il faut mettre dans le contrat.

Chez PotenciApp, tout cela est consigné par écrit avant de commencer. Si vous voulez voir comment nous procédons, c'est dans [Avant de nous engager](/fr/antes-de-contratarnos).

**La suite au chapitre 2 :** [Autopsie d'une boutique en ligne qui a coûté le triple du budget prévu](/fr/blog/autopsia-tienda-online-costo-el-triple).
