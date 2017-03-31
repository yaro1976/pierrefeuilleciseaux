/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-01 01:01:23
 */
'use strict';
/**
 * @module App
 * @description Script de gestion de la connexion - Partie cliente
 */

(function(login, chat, $) {
  $(function() {
    // Chargement du module socket.io
    let socket = io.connect();

    socket.on('connecte', function(data) {
      chat.ecrire(data, 'Chifouni');
    });

    socket.on('compteur joueurs', function(data) {
      chat.ecrire('Actuellement en ligne : ' + data, 'Info');
    });

    socket.emit('attente');

    let gameZone = $('#jeu');
    // Gestion de l'enregistement de la page de login
    login.main(socket, gameZone);

    // Moteur de la partie du chat
    chat.main(socket);
  });
})(login, chat, jQuery);
