/*
 * @Author: Thierry ARONOFF 
 * @Date: 2017-04-05 12:38:14 
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-04-05 13:12:35
 */

'use strict';
/**
 * Module de activation des échanges via socket.io
 * @module
 */

// Chargement du module `socket.io`
var socketIo = require('socket.io');

var RoomManagt = require('./roomMgt/roomGest');
var AccueilClass = require('./roomMgt/accueil');
var GameServer = require('./gameServer');

// Chargement des méthode d'accès à la db
var db = require('./database');

/**
 * Classe de gestion des échanges via socket.io
 * @param {*} http 
 */

var socketSystem = function (http) {
    // Sauvegarde la liste des clients connectés
    this.listClient = {};

    this.io = socketIo(http);

    this.roomManagt = new RoomManagt(this.io);

    // Chargement de la classe accueil

    this.accueil = new AccueilClass(this.io);

    // Chargement du moteur de jeu

    this.gameServer = new GameServer(this.io);
    // var gameServer = require('./core/gameServer');
};

socketSystem.prototype.main = function () {
// Sauvegarde le contexte
var self = this;

    // Detection de l'évenement de connection d'un joueur
    this.io.sockets.on('connection', function (socket) {

        socket.broadcast.emit('nouveau joueur');

        console.log('------------------------------------');
        console.log('Joueur ' + socket.id + ' connecté...');
        console.log('------------------------------------');
        // Envoi du nombre de joueurs connectés
        self.io.sockets.emit('compteur joueurs', socket.server.eio.clientsCount);
        self.listClient[socket.id] = socket;

        
        

        // Detection de l'évenement de déconnection d'un joueur
        socket.on('disconnect', function () {
            console.log('------------------------------------');
            console.log('Joueur ' + socket.id + ' déconnecté...');
            console.log('------------------------------------');

            delete self.listClient[socket.id];

            // Envoi du nombre de joueurs connectés
            self.io.sockets.emit('compteur joueurs', socket.server.eio.clientsCount);

            // Suppression du joueur de la salle d'attente
            self.accueil.kick(socket);
        });

        // Login part

        // Detection de l'évènement d'un nouveau message posté
        socket.on('send message', function (data) {
            self.io.sockets.emit('new message', {
                msg: data,
                username: socket.username,
            });
        });

        // Vérification de l'identifiant du mot de passe
        socket.on('sign in', function (data, callback) {
            db.checkValidity(data.username, data.passwd, callback);
        });

        // Vérification de la disponibilité du pseudo
        socket.on('check pseudo', function (data, callback) {
            db.checkUsername(data.username, callback);
        });

        // Création d'un nouveau compte
        socket.on('creer compte', function (data, callback) {
            db.insertPlayer(data.username, data.passwd, callback);
        });

        // Si l'identification s'est bien effectué,
        // On récupère le nom du joueur
        socket.on('username', function (data) {
            socket.username = data;
            self.listClient[socket.id] = socket;

            console.log(self.listClient)
            // On salue le nouveau joueur            
            // Transfert du nouveau joueur connecté à un salon
            self.io.to(socket.id).emit('connecte', {
                'msg': 'Bienvenue',
                'username': socket.username,
            });
        });

        // Mise en attente des joueurs
        socket.on('attente', function () {
            // Ajout du joueur dans une salle d'attente
            self.accueil.push(socket);
            // accueil.dispatch(roomManagt);
        });

        // this.io.to(socket.id).emit('jeu', {
        self.io.sockets.emit('jeu', {
            'yourScore': 1,
            'hisScore': 3,
            'tempsRestant': '3:15',
            'tempsTotal': '4:00',
            'manches': 1,
        });

        //
        self.gameServer.getReponse(socket);
    });
}

module.exports = socketSystem;