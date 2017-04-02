/*
 * @Author: Thierry Aronoff
 * @Date: 2017-04-01 00:27:02
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 00:54:17
 */

'use strict';


/**
 * @module
 * @description Mise en attente des joueurs
 * @export accueilClass
 */


/**
 * Zone d'accueil des joueurs,
 * afin de les répartir dans les salles de jeux
 * @class
 */
let accueilClass = (function() {
  /**
   * Zone d'accueil des joueurs,
   * afin de les répartir dans les salles de jeux
   *
   * @constructor
   * @param {object} io - Class socket.io
   */
  function AccueilClass(io) {
    /** accueilClass - Copie de l'objet AccueilClass */
    let accueilClass = this;
    accueilClass.accueil = [];
    accueilClass.updating = false;

    /**
     * Sauvegarde le socket du joueur
     * @method
     * @param {object} socket - Socket du joueur connecté
     */
    accueilClass.push = function(socket) {
      if (accueilClass.accueil.indexOf(socket) < 0) {
        accueilClass.accueil.push(socket);
      }
    };
    /**
     * Retire le socket du joueur
     * @method
     * @param {object} socket - Socket du joueur connecté
     */
    accueilClass.kick = function(socket) {
      let index = accueilClass.accueil.indexOf(socket);
      if (index >= 0) accueilClass.accueil.splice(index, 1);
    };

    /**
     * Donne la liste des sockets présents
     * @method
     */
    accueilClass.clean = function() {
      let sockets = accueilClass.accueil;
      accueilClass.accueil = sockets.filter(function(socket) {
        return socket !== null;
      });
    };

    /**
     *  Répati les connexions et créé de nouvelles salles de jeu
     * @method
     * @param {object} RmMgt - Classe de gestion des salles de jeu
     */
    accueilClass.dispatch = function(RmMgt) {
      if (accueilClass.dispatching) return;
      accueilClass.dispatching = true;

      while (accueilClass.accueil.length > 1) {
        let player0 = accueilClass.accueil.splice(0, 1);
        let player1 = accueilClass.accueil.splice(0, 1);
        RmMgt.create(player0[0], player1[0]);
      }
      accueilClass.dispatching = false;
    };
  }

  return AccueilClass;
})();

module.exports = accueilClass;
