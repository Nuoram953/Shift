# Shift

# Sommaire

Application web pour améliorer la rapidité au clavier des nouveaux programmeurs. Pratiquez-vous dans un langage choisie par l'utilisateur.Si vous êtes prêt, essayer le mode aventure où tous les langages et difficultés sont présentes par un maximum de défi.

# Installation

## Prérequis

- Js
- Node.js
- MongoDB
- Chrome (Firefox ne fonctionne pas à 100% à cause de certaines stratégies de sécurité)
- Visual Studio Code

Les commandes doivent se faire dans un terminal ( <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>`</kbd> ) sur VSC

## Première utilisation

Il faut télécharger les dépendances demandées par l'application

```
npm install
```

## Serveur

Pour démarer le serveur, votre port 3000 doit être libre.

```
npm run serverstart
```

## Modification (Optionel)

Dans un cas, où vous voulez apporter des modifications au code, certains fichiers JS sont compilés avec Webpack. Il faut donc le mettre à jour.

Dans un deuxième terminal (sans fermer la première)

```
npm run webpack
```

# Utilisation

1. Ouvrez une fenêtre dans Chrome et allez à l'addresse [https://localhost:3000](https://localhost:3000)
2. Créer un compte
3. Différents modes de jeux sont disponibles soit "normal" et "aventure"

   - Normal:
        - Languages disponibles:
            - Python
            - js
            - Java

        - Difficultés disponibles:
            - Facile
            - Moyen
            - Difficile
    - Aventure:
        - Tous les langages et les difficultés dans un même mode de jeux
        - Vous gagnez des points en écrivant les bons mots au bon moment.



4. En tout temps, vous pouvez vérifier vos statistiques des parties précedentes

# Référence
## Librairie:
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [convert-csv-to-json](https://www.npmjs.com/package/convert-csv-to-json)
- [cookie-parse](https://www.npmjs.com/package/cookie-parser)
- [Chart.js](https://www.chartjs.org/)
- [express](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
- [express-generator](https://www.npmjs.com/package/express-generator)
- [fs](https://www.npmjs.com/package/fs)
- [http-errors](https://www.npmjs.com/package/http-errors)
- [morgan](https://www.npmjs.com/package/morgan)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [serve-favion](https://www.npmjs.com/package/serve-favicon)
- tileImage.js (Script fourni par Frédéric Thériault)

## Assets:
- [Pixel Art Forest](https://edermunizz.itch.io/free-pixel-art-forest)
- [Player](https://oco.itch.io/medieval-fantasy-character-pack)
- [Boss](https://itch.io/queue/c/844603/asset-packs?game_id=466748)
- [Heart](https://gpway.itch.io/2d-pixel-heart?download)
- [keyboard](https://codepen.io/irajsuhail/pen/mYMZVm)
- [key](https://iconarchive.com/show/keyboard-keys-icons-by-chromatix.html)
- [Arrow](https://www.flaticon.com/search?word=arrow)

## Remerciements
Un gros merci à Frédéric pour le script qui s'occupe de l'animation de spritesheets qui m'a sauvé énormément de temps

