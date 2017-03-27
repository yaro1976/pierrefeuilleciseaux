/*
* @Author: ka
* @Date:   2017-03-26 12:31:01
* @Last Modified by:   ka
* @Last Modified time: 2017-03-26 19:35:45
*/

'use strict';

// Le jeu du Chifoumi

// Variables html -> js
var result = document.getElementById('result');
var score = document.getElementById('score');

// Tableau des items
var responses = ['pierre', 'papier', 'ciseaux'];

// Réponses aléatoires de l'IA
var player2Choice = responses[Math.floor(Math.random() * responses.length)];
console.log(iaChoice);

// Réponse du joueur
var player1Choice = argv(3, 'choisis pierre, feuille ou ciseaux')

// Résolution des choix des joueurs
if(playerChoice === iaChoice) {
	result.innerHTML = 'Egalité';

} else if(playerChoice === 'papier' && iaChoice === 'pierre') {
	result.innerHTML = 'player gagne cette partie !';

} else if(playerChoice === ciseaux && iaChoice === papier) {
	result.innerHTML = 'player gagne cette partie !';

} else if(playerChoice === pierre && iaChoice === ciseaux) {
	result.innerHTML = 'player gagne cette partie !';

} else {
	result.innerHTML = 'L\'IA gagne cette partie';
}

// Une manche  est composé de 3 parties
if(score.player)