/*
 * @Author: Thierry Aronoff
 * @Date: 2017-04-01 00:27:02
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-01 00:51:40
 */

'use strict';

/**
 * @module Accueil
 * @description Mise en attente des joueurs
 */

let accueilClass = (function() {
  /**
   * @function AccueilClass
   * @description Zone d'accueil des joueurs,
   * afin de les répartir dans les salles de jeux
   * @param {object} io - Class socket.io
   */
  function AccueilClass(io) {
    let accueilClass = this;
    accueilClass.accueil = [];
    accueilClass.updating = false;

    /**
     * @function push
     * @description Sauvegarde le socket du joueur
     * @param {object} socket - Socket du joueur connecté
     */
    accueilClass.push = function(socket) {
      if (accueilClass.accueil.indexOf(socket) < 0) {
        accueilClass.accueil.push(socket);
      }
    };
    /**
     * @function kick
     * @description Retire le socket du joueur
     * @param {object} socket - Socket du joueur connecté
     */
    accueilClass.kick = function(socket) {
      let index = accueilClass.accueil.indexOf(socket);
      if (index >= 0) accueilClass.accueil.splice(index, 1);
    };

    /**
     * @function clean
     * @description Donne la liste des sockets présents
     */
    accueilClass.clean = function() {
      let sockets = accueilClass.accueil;
      accueilClass.accueil = sockets.filter(function(socket) {
        return socket !== null;
      });
    };

    /**
     * @function dispatch
     * @description Répati les connexions et créé de nouvelles salles de jeu
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
