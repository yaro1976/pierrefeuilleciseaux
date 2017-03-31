/*
 * @Author: Thierry ARONOFF
 * @Date: 2017-03-31 10:54:12
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-01 01:05:04
 */

'use strict';

/**
 * @module RoomsGest
 * Gestion des `room`
 */

// Création d'une salle d'attente

let RoomsGest = (function() {
  /**
   * @class RoomsGest
   * @description Gestion des rooms
   * @param {object} io - Objet Socket.io
   */
  function RoomsGest(io) {
    let RoomsGest = this;
    RoomsGest.rooms = {};
    RoomsGest.roomIndex = {};
  };

  //

  module.exports = RoomsGest;
});

// Export du module RoomsGest
module.exports = RoomsGest;
