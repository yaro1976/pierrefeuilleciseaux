/*
 * @Author: Thierry ARONOFF 
 * @Date: 2017-03-31 10:54:12 
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-03-31 15:12:13
 */

'use strict';

/**
 * @module RoomsGest
 * Gestion des `room`
 */

// Création d'une salle d'attente

let RoomsGest = (function() {
  let RoomsGest = function() {
    this.rooms = {};
  };

  RoomsGest.prototype.playerConnection = function(player) {
    rooms[player] = player;
  };
  return RoomsGest;
})();


module.exports= RoomsGest;