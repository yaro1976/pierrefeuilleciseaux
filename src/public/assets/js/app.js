/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-01 18:18:19
 */
'use strict';
/**
 * @module App
 * @description Script de gestion de la connexion - Partie cliente
 */

(function(login, Game, chat, $) {
  $(function() {
    // Chargement du module socket.io
    let socket = io.connect();

    socket.on('connecte', function(data) {
      let mesg = '';
      mesg += data.msg;
      mesg += ' ' + data.username;
      chat.ecrire(mesg, 'Chifouni');
    });

    socket.on('compteur joueurs', function(data) {
      $('#nbjoueurs').html('<p>Actuellement en ligne : ' + data + '</p>');
      // chat.ecrire('Actuellement en ligne : ' + data, 'Info');
    });

    socket.emit('attente');

    let game = new Game(socket);
    game.render();


    let gameZone = $('.game');
    // Gestion de l'enregistement de la page de login
    login.main(socket, gameZone);

    // Moteur de la partie du chat
    chat.main(socket);
  });
})(login, Game, chat, jQuery);
