/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 17:38:16
 */
'use strict';
/**
 *  Script de gestion de la connexion - Partie cliente
 * @module
 */

/**
 * Fonction principale
 * @function
 */
var app = (function (login, Game, chat, $) {
  $(function () {
    // Chargement du module socket.io
    var socket = io.connect();

    socket.on('connecte', function (data) {
      var mesg = '';
      mesg += data.msg;
      mesg += ' ' + data.username;
      chat.ecrire(mesg, '');
    });

    socket.on('compteur joueurs', function (data) {
      $('#nbjoueurs').html('<p>Actuellement en ligne : ' + data + '</p>');
      // chat.ecrire('Actuellement en ligne : ' + data, 'Info');
    });

    socket.emit('attente');

    var game = new Game(socket);
    game.main(socket);

    setInterval(game.render(), 1000 / 25);


    var gameZone = $('.game');
    // Gestion de l'enregistement de la page de login
    login.main(socket, gameZone);


    // Moteur de la partie du chat
    chat.main(socket);
  });
})(login, Game, chat, jQuery);