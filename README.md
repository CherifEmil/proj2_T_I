# Persistance des données en utilisant module `fs` de `nodejs`

Voici un serveur de courriel (version simplifiée!) similaire à celui 
développé en cours. Pour le faire marcher:

	> npm install
	> node ./index.js

Une page à l'adresse <http://localhost:3333/index.html> devrait être
disponible. Svp, ouvrez `Console` de votre navigateur pour voir les
messages de client (java-script `public/client.js`).

Le serveur `./index.js` store les messages envoyés par le client dans
la variable `lettres`. Malheureusement, à chaque démarrage du serveur,
le contenu de la variable va disparaitre.

Pour remédier à ce problème, on vous demande de sauvegarder le contenu
de la variable dans un fichier `lettres.json` (en format `JSON`) soit
à chaque changement de la variable `lettres`, soit périodiquement, par
exemple, toutes les 30 seconds.

Il faudra aussi modifier le code pour pouvoir initialiser la variable
`lettres` au démarrage du programme, si le fichier `lettres.json`
existe déjà.

Pour effectuer le travail, on vous demande de modifier le code
`./index.js` et d'utiliser le module [File
system](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html) de
`nodejs` avec les deux fonctions suivantes:

* [fs.readFileSync](https://nodejs.org/dist/latest-v16.x/docs/api/all.html#all_fs_fsreadfilesyncpath-options)

* [fs.writeFile](https://nodejs.org/dist/latest-v16.x/docs/api/all.html#all_fs_fswritefilefile-data-options-callback)



