/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:16:34
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 16:12:12
 */
'use strict';

/** @module */


// Le jeu du Chifoumi


/** Classe Shifoumi
 * @class
 */
let shifoumiClass = (function() {
	/**
	 * Le Shifoumi
	 * @constructor
	 */
	let Shifoumi = function(socket) {
		this.winner = '';
		this.answer = [];
		this.joueurs = [];
		this.socket = socket;
	};
	/**
	 * Vérifie les réponses entrées
	 * @function
	 * @param {object} player1 - 1er joueur
	 * @param {object} player2 - 2e joueur
	 */
	Shifoumi.prototype.checkResult = function(player1, player2) {
		// Résolution des choix des joueurs
		if (player1.answer === player2.answer) {
			this.winner = 0;
		} else if (player1.answer === 'feuille' && player2.answer === 'pierre') {
			this.winner = 1;
		} else if (player1.answer === 'ciseaux' && player2.answer === 'feuille') {
			this.winner = 1;
		} else if (player1.answer === 'pierre' && player2.answer === 'ciseaux') {
			this.winner = 1;
		} else {
			this.winner = 2;
		}
	};

	/**
	 * Récupère les réponses des joueurs
	 * @function
	 * @param {object} socket - socket du joueur
	 *
	 */
	Shifoumi.prototype.getReponse = function(socket) {
		// Sauvegarde le contexte
		let self = this;
		let nbReponse = 0;
		socket.on('item selected', function(data) {
			console.log(socket.username, data);
			self.answer[socket.id] = {
				'id': socket,
				'answer': data,
			};
			self.joueurs.push(socket.id);

			for (let i in self.answer) {
				nbReponse++;
			}
			if (nbReponse === 2) {
				self.checkResult(self.answer[self.joueurs[0]], self.answer[self.joueurs[1]]);
				switch (self.winner) {
					case 0:
						self.winner = 'Egalité';
						break;
					case 1:
						self.winner = self.answer[self.joueurs[0]].id.username;
						break;
					case 2:
						self.winner = self.answer[self.joueurs[0]].id.username;
						break;
				}
				console.log('Vainqueur : ', self.winner);
				self.socket.emit('resultat', {
					'joueurs': self.answer,
					'winner': self.winner,
				});
			} else if (nbReponse === 1) {

			} else if (nbReponse === 0) {
				console.log('Pas de reponses');
			}
		});
	};

	return Shifoumi;
})();

module.exports = shifoumiClass;
