/*
 * @Author: Thierry Aronoff
 * @Date: 2017-04-01 17:55:15
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-01 18:18:43
 */
'use strict';

/**
 * @module Game
 * @description Partie cliente de gestion du jeu
 */

let Game = (function() {
  /**
   * @class Game
   * @description Moteur du jeu
   * @param  {object} socket - Socket.io
   */
  function Game(socket) {
    this.item = '';
    this.score = 0;
    this.socket = socket;
  };

  /**
   * @method render
   * @description Méthode d'affichage
   * @param {number} score - Score du joueur
   */
  Game.prototype.render = function(score) {
    this.socket.on('jeu', function(data) {
      // Affichage des informations de jeu
      let information = '';
      information += '<p>Manches restantes ' + data.manches + '';
      information += ' - ';
      information += 'Score ' + data.yourScore + '/' + data.hisScore + '</p>';
      information += '<p>Temps restant ' + data.tempsRestant;
      information += '/' + data.tempsTotal + '</p>';

      $('#jeu_informations').html(information);
    });
  };
  return Game;
})();
