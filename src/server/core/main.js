/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:16:34
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-28 21:17:01
 */

'use strict';

// Le jeu du Chifoumi

// Variables html -> js
let result = document.getElementById('result');
let score = document.getElementById('score');

// Tableau des items
let responses = ['pierre', 'papier', 'ciseaux'];

// Réponses aléatoires de l'IA
let player2Choice = responses[Math.floor(Math.random() * responses.length)];
console.log(iaChoice);

// Réponse du joueur
let player1Choice = argv(3, 'choisis pierre, feuille ou ciseaux');

// Résolution des choix des joueurs
if (playerChoice === iaChoice) {
	result.innerHTML = 'Egalité';
} else if (playerChoice === 'papier' && iaChoice === 'pierre') {
	result.innerHTML = 'player gagne cette partie !';
} else if (playerChoice === ciseaux && iaChoice === papier) {
	result.innerHTML = 'player gagne cette partie !';
} else if (playerChoice === pierre && iaChoice === ciseaux) {
	result.innerHTML = 'player gagne cette partie !';
} else {
	result.innerHTML = 'L\'IA gagne cette partie';
}

// Une manche  est composé de 3 parties
if (score.player) {}
