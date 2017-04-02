/*
 * @Author: Thierry Aronoff
 * @Date: 2017-04-01 17:55:15
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 12:52:22
 */
'use strict';

/**
 * Partie cliente de gestion du jeu
 * @module
 */

/**
 *  Moteur du jeu
 * @class
 * @param {object} socket - Socket.io
 */
let Game = (function() {
  /**
   * Partie principale du jeu
   * @constructor
   * @param {object} socket - Socket du joueur
   */
  function Game(socket) {
    let game = {};
    this.item = '';
    this.score = 0;
  };

  /**
   *  Méthode d'affichage
   * @method
   * @param {object} socket - Socket du joueur
   * @param {number} score - Score du joueur
   */
  Game.prototype.render = function(socket, score) {
    socket.on('jeu', function(data) {
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

  /**
   * Stock l'élément sélectionné
   * @method
   * @param {object} socket - Socket du joueur
   */
  Game.prototype.itemSelected = function(socket) {
    let $pierre = $('#pierre');
    let $feuille = $('#feuille');
    let $ciseaux = $('#ciseaux');

    // Sauvegarde du contexte de this
    /**
     * @this Game
     */
    let self = this;

    // Pierre sélectionnée
    $pierre.click(function() {
      // Si aucun choix n'a été effectué auparavant
      if (self.item === '') {
        socket.emit('item selected', 'pierre');
        self.item = 'pierre';
        $feuille.hide();
        $ciseaux.hide();
      }
    });
    // Feuille sélectionnée
    $feuille.click(function() {
      // Si aucun choix n'a été effectué auparavant
      if (self.item === '') {
        socket.emit('item selected', 'feuille');
        self.item = 'feuille';
        $pierre.hide();
        $ciseaux.hide();
      }
    });
    // Ciseaux sélectionné
    $ciseaux.click(function() {
      // Si aucun choix n'a été effectué auparavant
      if (self.item === '') {
        socket.emit('item selected', 'ciseaux');
        self.item = 'ciseaux';
        $feuille.hide();
        $pierre.hide();
      }
    });
  };

  /**
   * Traite le résultat du jeu
   * @function
   * @param {object} socket - Socket du joueur
   */
  Game.prototype.getResult = function(socket) {

  };


  return Game;
})();
