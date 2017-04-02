/*
 * @Author: Thierry Aronoff
 * @Date: 2017-04-01 17:55:15
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 17:38:31
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
    this.game = {
      'manches': 0,
      'score': 0,
      'advScore': 0,
      'timeElapse': 0,
      'totalTime': 0,
    };
    // Sauvegarde de l'item sélectionné
    this.item = '';
    // Score du joueur
    this.score = 0;
    // Sauvegarde de la socket
    this.socket = socket;
  };

  /**
   *  Méthode d'affichage
   * @method
   * @param {number} score - Score du joueur
   */
  Game.prototype.render = function() {
    // Affichage des informations de jeu
    let information = '';
    information += '<p>Manches restantes ' + this.game.manches + '';
    information += ' - ';
    information += 'Score ' + this.game.score + '/' + this.game.advScore + '</p>';
    information += '<p>Temps restant ' + this.game.timeElapse;
    information += '/' + this.game.totalTime + '</p>';

    $('#jeu_informations').html(information);

    // Affichage du nom des joueurs
    $('#me').html(this.me);
    $('#adv').html(this.adv);
    $('#adv_answer').html('<p>' + this.adv_resp + '</p>');
  };

  Game.prototype.majnfoJeu = function() {
    // Sauvegarde du context de this
    /** @this Game */
    let self = this;

    this.socket.on('jeu', function(data) {
      self.game = {
        'manches': data.manches,
        'score': data.yourScore,
        'advScore': data.hisScore,
        'timeElapse': data.tempsRestant,
        'totalTime': data.tempsTotal,
      };
    });
  };

  /**
   * Stock l'élément sélectionné
   * @method
   */
  Game.prototype.itemSelected = function() {
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
        self.socket.emit('item selected', 'pierre');
        self.item = 'pierre';
        $feuille.hide();
        $ciseaux.hide();
      }
    });
    // Feuille sélectionnée
    $feuille.click(function() {
      // Si aucun choix n'a été effectué auparavant
      if (self.item === '') {
        self.socket.emit('item selected', 'feuille');
        self.item = 'feuille';
        $pierre.hide();
        $ciseaux.hide();
      }
    });
    // Ciseaux sélectionné
    $ciseaux.click(function() {
      // Si aucun choix n'a été effectué auparavant
      if (self.item === '') {
        self.socket.emit('item selected', 'ciseaux');
        self.item = 'ciseaux';
        $feuille.hide();
        $pierre.hide();
      }
    });
  };

  /**
   * Traite le résultat du jeu
   * @function
   */
  Game.prototype.getResult = function() {
    // Retour
    // sauvegarde du contexte
    /** @ this Game */
    let self = this;
    this.socket.on('resultat', function(data) {
      self.me = data.joueur1;
      self.adv = data.joueur2;
      self.adv_resp = data.joueur2_answer;


      console.log('winner', data.winner);
    });
  };

  /**
   * Fonction principlae du jeu
   * @function
   */
  Game.prototype.main = function() {
    this.render();
    this.itemSelected();
    this.getResult();
  };

  return Game;
})();
