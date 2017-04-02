/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-24 20:11:36
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-01 20:52:57
 */

/** @module RoomManagement
 * @description Gestion de du moteur de Rooms
 * @export RoomManagement
 */
'use strict';

// Chargement et activation des modules
let Joueur = require('./objets/joueur');
let Ball = require('./objets/balle');
let Score = require('./objets/score');
let Countdown = require('./objets/compteur');

/**
 * @function RoomManagement
 * @constructor
 * @description Gestion des `rooms`
 * @param {object} io - Objet liés aux socket.io
 */
function RoomManagement(io) {
  let RmMgt = this;
  RmMgt.rooms = {};
  RmMgt.roomIndex = {};

  /**
   * @function create
   * @description Creation de nouvelles `rooms` de jeu
   * @param {object} socket0 - Socket du premier joueur
   * @param {object} socket1 - Socket du deuxième joueur
   */
  RmMgt.create = function(socket0, socket1) {
    let salleId = socket0.id + socket1.id;
    let room = new Room(RmMgt, io, salleId, socket0, socket1);
    socket0.join(salleId);
    socket1.join(salleId);
    RmMgt.rooms[salleId] = room;
    RmMgt.roomIndex[socket0.id] = salleId;
    RmMgt.roomIndex[socket1.id] = salleId;
    ready.initialize(io, room);
    io.to(socket0.id).emit('ready', 'left');
    io.to(socket1.id).emit('ready', 'right');
    console.log('------------------------------------');
    console.log('Salle Créée :', salleId);
    console.log('------------------------------------');
  };

  /**
   * @function destroy
   * @description Suppression des `salles` de jeu
   * @param {object} salleId - Identifiant de la salle de jeu
   */
  RmMgt.destroy = function(salleId) {
    let room = RmMgt.rooms[salleId];
    room.joueurs.forEach(function(socket) {
      let message;
      message = (!room.objects[socket.id].ready && !room.objects.countdown) ? 'YOU ARE NOT PREPARED' : null;
      delete RmMgt.roomIndex[socket.id];
      io.to(socket.id).emit('destroy', message);
    });
    delete RmMgt.rooms[salleId];
  };

  /**
   * @function gameOver
   * @description Suppression de  `rooms` de jeu
   * @param {object} salleId - Identifiant de la salle de jeu
   * @param {Number} winner - Identifiant du vainqueur
   */
  RmMgt.gameOver = function(salleId, winner) {
    let room = RmMgt.rooms[salleId];
    room.joueurs.forEach(function(socket) {
      let message = (socket.id == winner) ? 'YOU WIN!' : 'YOU LOSE!';
      delete RmMgt.roomIndex[socket.id];
      io.to(socket.id).emit('destroy', message);
    });
    delete RmMgt.rooms[salleId];
  };
}

// export de l'objet RoomManagement
module.exports = RoomManagement;

/**
 * @function Room
 * @description Classe Room - Structure des salles de jeu
 * @constructor
 * @param {object} RoomMgt - Lien vers la classe De management des salles de jeu
 * @param {object} io - Moteur de socket.io
 * @param {number} id - Identifiant de la salle
 * @param {object} socket0 - socket du premier joueur
 * @param {object} socket1 - socket du deuxième joueur
 */
function Room(RoomMgt, io, id, socket0, socket1) {
  let salle = this;
  salle.id = id;
  salle.RmMg = RoomMgt;
  salle.joueurs = [socket0, socket1];
  salle.objects = {};
  salle.objects[salle.joueurs[0].id] = new Joueur(salle.joueurs[0].id, 'LEFT');
  salle.objects[salle.joueurs[1].id] = new Joueur(salle.joueurs[1].id, 'RIGHT');
  salle.objects.joueur0Score = new Score(salle.joueurs[0].id, 'LEFT');
  salle.objects.joueur1Score = new Score(salle.joueurs[1].id, 'RIGHT');
  salle.objects.ball = new Ball(salle.joueurs[0].id, salle.joueurs[1].id);
  salle.effects = [];
  salle.sounds = [];
  salle.loop = function() {};

  /**
   * @function playSound
   * @description Moteur de rendu des sons
   */
  salle.playsounds = function() {
    if (salle.sounds.length > 0) {
      io.to(salle.id).emit('playSound', salle.sounds.pop());
    }
  };

  /**
   * @function runLoop
   * @description Salle d'attente des joueurs
   * @param {object} room - Salle générée
   */
  salle.runLoop = function(room) {
    room.loop(room);
    room.playsounds();
  };
}

/**
 * @class ready
 * @description Creation suppression des salles de jeu
 * @property {function} initialise - Initialise la salle d'attente
 * @property {function} loop - Attente des reponses des joueurs en salle d'attente
 * @property {function} destroy - Destruction de la salle d'attente
 */
let ready = {
  /**
   * @function initialise
   * @description Initialisse la salle d'attente
   * @param {object} io - Moteur de socket.io
   * @param {object} room - salle d'attente
   */
  initialize: function(io, room) {
    this.io = io;
    room.status = 'ready';
    room.loop = this.loop;
    room.objects.countdown = new Countdown(10, null, 480 - 40);
    room.objects.countdown.action = function(room) {
      delete room.objects.countdown;
      room.RmMg.destroy(room.id);
    };
  },
  /**
   * @function loop
   * @description Attente des reponses des joueurs en salle d'attente
   * @param {object} room - salle d'attente
   */
  loop: function(room) {
    let joueur0ready = room.objects[room.joueurs[0].id].ready;
    let joueur1ready = room.objects[room.joueurs[1].id].ready;
    if (joueur0ready && joueur1ready) {
      ready.destroy(room);
      playing.initialize(ready.io, room);
    }
    let statuses = getStatsFromObjects(room);
    ready.io.to(room.id).emit('update', statuses);
  },
  /**
   * @function destroy
   * @description Destruction de la salle d'attente
   * @param {object} room - salle d'attente
   */
  destroy: function(room) {
    delete room.objects.playing;
  },
};

/**
 * @class playing
 * @description Gestion du statut des joueur en salle d'attente
 * @property {function} initialise - Initialise le statut
 * @property {function} loop - Attente de la réponse des joueurs de la salle d'attente
 */
let playing = {
  /**
   * @function initialise
   * @description Initialisse le statut d'attente des joueurs
   * @param {object} io - Moteur de socket.io
   * @param {object} room - salle d'attente
   */
  initialize: function(io, room) {
    this.io = io;
    room.status = 'countdown';
    room.loop = this.loop;
    room.objects.countdown = new Countdown(3, null, 480 * 3 / 4, 100);
    room.objects.countdown.action = function(room) {
      delete room.objects.countdown;
      room.status = 'playing';
    };
    io.to(room.id).emit('playing');
  },
  /**
   * @function loop
   * @description Attente de la modification du statut des joueurs en salle d'attente
   * @param {object} room - salle d'attente
   */
  loop: function(room) {
    let statuses = getStatsFromObjects(room);
    playing.io.to(room.id).emit('update', statuses);
    if (room.status == 'playing' && (room.objects[room.joueurs[0].id].score >= 5 || room.objects[room.joueurs[1].id].score >= 5)) {
      room.status = 'gameOver';
      room.gameOverDelay = 3;
    }
    if (room.status == 'gameOver' && room.gameOverDelay-- < 0) {
      if (room.objects[room.joueurs[0].id].score > room.objects[room.joueurs[1].id].score) {
        room.RmMg.gameOver(room.id, room.joueurs[0].id);
      } else {
        room.RmMg.gameOver(room.id, room.joueurs[1].id);
      }
    }
  },
};

/**
 * @function getStatsFromObjects
 * @description Mise à jour du statut du jeu de chaque salle
 * @param {object} room - Salle de jeu
 * @return {array} - Etat de la salle dejeu
 */
function getStatsFromObjects(room) {
  let statuses = [];
  for (let object in room.objects) {
    let obj = room.objects[object];
    obj.update(room);
    statuses.push(obj.status);
  }
  room.effects.forEach(function(effect) {
    effect.update(room);
    statuses.push(effect.status);
  });
  return statuses;
}
