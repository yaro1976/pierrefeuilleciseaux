Multi-payer Game en temps réel, avec Socket.io
============
Présentation :
------------
Ce projet est un projet présentant un jeu multi-joueur.

Il utilise les technologies suivantes :
- Websocket / Socket.io
- Mongo DB
- Express JS

Fonctionnalités:
------------
[ ] Le jeu doit proposer aux joueurs d'interagir avec l'affichage du navigateur
en fonction d'actions effectuées à l'aide du clavier et/ou de la souris.

[ ] Chaque joueur est représenté sous la forme d'un avatar. Un avatar est un
élément graphique représentant le joueur.

[ ] Avant de commencer une partie du jeu, un joueur devra saisir, au moins, son
pseudonyme de joueur. Vous prévoirez donc un formulaire de saisie. Après
la validation de la saisie, le joueur pourra accéder à la partie. Attention, un
joueur qui :
ne saisit pas de pseudonyme ;
saisit un pseudonyme déjà pris par un autre joueur ;
ne doit pas pouvoir accéder à une partie et se voit proposer une nouvelle fois
de saisir son pseudonyme.

[ ] Une partie du jeu doit se dérouler sans qu'aucun rechargement de page
n'ait lieu. Les modifications de l'état du jeu liées aux actions de chaque joueur
doivent se répercuter (presque) instantanément sur les affichages de chacun
des joueurs.

[ ] Les pseudonymes de chaque joueur participant à une partie doivent
s'afficher à côté de leurs avatars.

[ ] Le jeu contient un mécanisme de score. Le score de chaque joueur est
enregistré en cours ou en fin de partie. Avant ou pendant une partie, un joueur
doit pouvoir consulter la liste des joueurs qui ont participé au jeu, leur durée
de jeu et leur score.

[ ] Les parties de jeu se déroulent en temps réel.

Installation
------
    npm install


