/*
 * @Author: Thierry Aronoff
 * @Date: 2017-04-01 18:42:01
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 00:50:06
 */
'use strict';

/**
 * @module
 * @description Structure des salles de jeux
 * @export SalleJeux
 */

/** @class */
let SalleJeux = (function() {
  /**
   * Classe SalleJeux - Structure des salles de jeu
   * @constructor
   * @param {object} RoomMgt - Lien vers la classe De management des salles de jeu
   * @param {object} io - Moteur de socket.io
   * @param {number} id - Identifiant de la salle
   * @param {object} socket0 - socket du premier joueur
   * @param {object} socket1 - socket du deuxième joueur
   */
  function SalleJeux(RoomMgt, io, id, socket0, socket1) {
    let salles = this;
  }

  return SalleJeux;
})();

module.exports = SalleJeux;
