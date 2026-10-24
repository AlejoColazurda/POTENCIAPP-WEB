---
title: "Votre programmeur a disparu : que faire dans les 48 premières heures"
description: Il ne répond plus, le système tourne encore (pour l'instant) et vous ne savez pas ce que vous possédez. Un plan en ordre pour faire l'inventaire, protéger ce qui est à vous, réclamer ce qui manque et ne pas aggraver les choses.
---

*Série « Acheter un logiciel sans se brûler » · Chapitre 5*

Cela arrive plus souvent qu'on ne le dit. Le programmeur qui a fait votre boutique, votre application ou votre système cesse de répondre. Parfois il a trouvé un autre travail, parfois il a déménagé, parfois il y a eu un problème de paiements ou il s'est simplement lassé. Le système continue de fonctionner, mais vous savez que le jour où quelque chose cassera, vous n'aurez personne à appeler.

Le pire que vous puissiez faire, c'est paniquer ou menacer. Le mieux, c'est de suivre un ordre.

## Heure 0 à 4 : l'inventaire

Avant de demander quoi que ce soit, vous devez savoir ce que vous possédez. Dressez un tableau avec ceci :

| Élément | Est-il à mon nom ? | Ai-je l'accès ? |
| --- | --- | --- |
| Nom de domaine | | |
| Hébergement ou serveur | | |
| Dépôt de code | | |
| Base de données | | |
| Compte Apple Developer | | |
| Compte Google Play | | |
| Mercado Pago et autres passerelles | | |
| E-mail de l'entreprise | | |

Comment le découvrir sans savoir programmer :

- **Nom de domaine :** cherchez-le chez NIC Argentina (si c'est un .com.ar) ou dans un outil « whois » (si c'est un .com) et regardez le titulaire et la **date d'expiration**.
- **Hébergement :** cherchez dans votre messagerie des factures de Vercel, AWS, Hostinger, DonWeb ou équivalents. Si aucune ne vous est jamais parvenue, le compte n'est pas à vous.
- **Applications :** ouvrez votre application dans l'App Store et dans Google Play et regardez le nom du développeur affiché sous le titre.
- **Mercado Pago :** connectez-vous à votre compte et cherchez la section des identifiants ou des intégrations pour voir quelles applications sont connectées.

## Heure 4 à 12 : protéger ce qui est bien à vous

Tout ce qui est à votre nom, sécurisez-le **maintenant**, pendant que le système fonctionne :

1. **Changez les mots de passe** des comptes qui sont à vous et activez la vérification en deux étapes.
2. **Vérifiez qui d'autre a accès** à chaque compte et retirez les utilisateurs que vous ne reconnaissez pas ou qui ne devraient plus y être. Si le programmeur figure encore sur un de vos comptes, décidez calmement de le retirer tout de suite ou après avoir récupéré ce qui manque : si vous avez encore besoin qu'il vous transmette quelque chose, lui couper l'accès d'un coup peut bloquer la conversation.
3. **Téléchargez tout ce que vous pouvez depuis votre panneau d'administration :** liste de produits, clients, commandes, ventes. La plupart des panneaux ont un bouton d'export vers Excel ou CSV. Si le système tombe demain, ce tableau est votre entreprise.
4. **Notez la date d'expiration du domaine.** S'il expire bientôt et qu'il est au nom de quelqu'un d'autre, c'est la première chose à régler : si personne ne le renouvelle, votre site web et votre e-mail cessent de fonctionner.

## Heure 12 à 24 : la demande, par écrit

Maintenant, écrivez-lui. Pas par message vocal WhatsApp : par écrit, dans un message clair et sans agressivité, que vous pourrez montrer ensuite.

> Bonjour, [prénom]. Comme nous n'allons pas continuer à travailler ensemble, j'ai besoin que vous me transmettiez l'accès à ce qui suit : le code source du système, le domaine [domaine] à mon nom, le compte d'hébergement, une sauvegarde de la base de données et les comptes où les applications sont publiées. Pouvons-nous nous coordonner cette semaine ? S'il reste un paiement en suspens entre nous, nous en parlerons.

La dernière ligne compte. Souvent, derrière une disparition, il y a un paiement en suspens ou un malentendu, et proposer de le régler débloque tout.

Si vous n'avez pas de réponse au bout de quelques jours, l'étape suivante en Argentine est généralement une **carta documento** (lettre recommandée à valeur légale) avec la même demande. Pour cela, et s'il existe un contrat entre vous, il est conseillé de vous faire accompagner par un avocat.

## Heure 24 à 48 : le plan B

Pendant que vous attendez, préparez l'alternative. Cela dépend de ce qui vous manque :

- **Si vous n'avez pas le code mais que le site fonctionne :** un nouveau développeur peut évaluer s'il vaut mieux le sauver ou le refaire. Parfois, refaire une petite boutique coûte moins cher que de se battre pour l'ancien code.
- **Si l'application est sur le compte Apple ou Google du programmeur :** Apple et Google permettent de transférer une application d'un compte à un autre, mais c'est le propriétaire du compte d'origine qui doit lancer la démarche. S'il ne collabore pas, la solution est de republier l'application sur un compte à vous, comme une nouvelle application : on perd les avis et les utilisateurs doivent la télécharger de nouveau.
- **Si le domaine est au nom d'un autre :** NIC Argentina propose des procédures de transfert de titularité et de réclamation. Sans la collaboration du titulaire, c'est plus lent, alors commencez dès que possible.
- **Si l'hébergement est à lui :** même sans le code, avec le tableau de produits et de clients que vous avez exporté, vous pouvez reconstruire la boutique sur une autre plateforme en quelques jours.

## Ce qu'il ne faut pas faire

- **Ne menacez pas sur les réseaux sociaux.** Cela vous ferme la porte à une sortie négociée et peut vous attirer des ennuis.
- **Ne demandez pas à « une connaissance qui s'y connaît » d'entrer dans le serveur du programmeur.** Entrer dans un compte qui n'est pas le vôtre sans autorisation est un délit, même si le système est à vous.
- **Ne payez pas n'importe qui qui promet de « tout récupérer en une heure ».** C'est la même logique que les arnaques à la récupération de comptes.

## Et pour la prochaine fois

Presque tout ce qui figure dans ce chapitre s'évite avec ce que nous avons vu au [chapitre 4](/fr/blog/clausulas-contrato-programador) : des comptes à votre nom dès le premier jour et une clause de sortie qui dit ce que vous emportez si le contrat prend fin. Si vous êtes dans cette situation en ce moment, écrivez-nous : nous faisons un diagnostic de ce que vous avez et de ce qui manque, et nous vous indiquons le chemin le plus court, même s'il ne se termine pas par une embauche chez nous.

**La suite au chapitre 6 :** [Autopsie d'une application que personne n'a téléchargée](/fr/blog/autopsia-app-que-nadie-descargo).
