# Mini-charte visuelle

Petit outil statique pour tester rapidement une intention de perception, une palette et un duo typographique.

## Fichiers

- `index.html` : application complète, sans build.

## Hébergement rapide

### Vercel

1. Créer un nouveau projet Vercel.
2. Importer un repo GitHub qui contient le dossier `mini-charte-generator`.
3. Configurer :
   - Framework Preset : `Other`
   - Root Directory : `mini-charte-generator`
   - Build Command : laisser vide
   - Output Directory : laisser vide ou `.`
4. Déployer.

### GitHub Pages

1. Mettre le dossier `mini-charte-generator` dans un repo GitHub.
2. Aller dans `Settings > Pages`.
3. Choisir `Deploy from a branch`.
4. Sélectionner la branche, puis le dossier `/mini-charte-generator` si proposé.

Si GitHub Pages ne propose pas ce dossier directement, placer `index.html` à la racine du repo ou utiliser Vercel.

### Test local

Ouvrir directement `index.html` dans un navigateur, ou lancer :

```bash
python3 -m http.server 8787
```

Puis ouvrir `http://localhost:8787/mini-charte-generator/`.
