# SHINEMA — Next.js + Sanity

## Installation locale
1. Copier `.env.example` vers `.env.local`.
2. Lancer `npm install`.
3. Lancer `npm run dev`.
4. Ouvrir `http://localhost:3000` et `http://localhost:3000/studio`.

## Déploiement Vercel
Importer le dépôt GitHub dans Vercel puis ajouter :
- `NEXT_PUBLIC_SANITY_PROJECT_ID=y6qycu5h`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2026-07-16`

## Première publication
Dans `/studio`, créer une **Critique**, remplir tous les champs, générer l’adresse (slug), puis publier.
Le site affiche la critique automatiquement. Tant que Sanity est vide, la critique *New Religion* intégrée sert d’exemple.
