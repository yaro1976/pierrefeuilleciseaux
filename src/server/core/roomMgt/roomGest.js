/*
 * @Author: Thierry ARONOFF
 * @Date: 2017-03-31 10:54:12
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 12:56:00
 */

'use strict';

/**
 * @module
 * @description Gestion des `room`
 * @export RoomsGest
 * @requires SalleJeux
 */

// Chargement des pré-requis
let SalleJeux = require('./salles_jeux');

// Création d'une salle d'attente

/**
 * Gestion des rooms
 * @class
 *
 * @param {object} io - Objet Socket.io
 */
let RoomsGest = (function() {
  /** @constructor */
  function RoomsGest(io) {
    let roomsGest = this;
    roomsGest.rooms = {};
    roomsGest.roomIndex = {};
    this.io = io;
  };
  /**
   * Créé une nouvelle salle de jeu
   * @method
   */
  RoomsGest.create = function(socket0, socket1) {
    /** Nom d'une nouvelle salle de jeu*/
    let salleID = socket0.id + socket1.id;
    let salleJeux = new SalleJeux(this.roomsGest, this.io, salleID, socket0, socket1);

    // Ajout des joueurs dans la nouvelle salle de jeu
    socket0.join(salleID);
    socket1.join(salleID);

    // Sauvegarde de la nouvelle salle de jeu créée
    roomsGest.rooms[salleID] = salleJeux;

    // Sauvegarde des joueurs présents dans cette salle de jeu
    roomsGest.roomIndex[socket0.id] = salleID;
    roomsGest.roomIndex[socket1.id] = salleID;

    // Mise en attente des joueurs


    // Envoi d'un message aux joueurs
    io.to(socket0.id).emit('ready', {
      'adversaire': socket1.username,
      'avatar': 0,
    });
    io.to(socket0.id).emit('ready', {
      'adversaire': socket0.username,
      'avatar': 1,
    });
  };

  /**
   *  Suppression des salles de jeu
   * @method
   * @param {object} salleID - Identifiant de la salle de jeu
   */
  RoomsGest.destroy = function(salleID) {
    let room = this.roomsGest.rooms[salleID];
  };


  return RoomsGest;
});

// Export du module RoomsGest
module.exports = RoomsGest;
