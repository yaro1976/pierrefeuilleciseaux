/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 16:34:42
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
let app = (function(login, Game, chat, $) {
  $(function() {
    // Chargement du module socket.io
    let socket = io.connect();

    socket.on('connecte', function(data) {
      let mesg = '';
      mesg += data.msg;
      mesg += ' ' + data.username;
      chat.ecrire(mesg, '');
    });

    socket.on('compteur joueurs', function(data) {
      $('#nbjoueurs').html('<p>Actuellement en ligne : ' + data + '</p>');
      // chat.ecrire('Actuellement en ligne : ' + data, 'Info');
    });

    socket.emit('attente');

    let game = new Game(socket);
    game.render(socket);
    game.itemSelected(socket);


    let gameZone = $('.game');
    // Gestion de l'enregistement de la page de login
    login.main(socket, gameZone);

    // Retour
    socket.on('resultat', function(data) {
      console.log('resultat');

      console.log(data);
      for (let i in data.joueurs) {
        console.log(data.joueurs[i].username, data.joueurs[i].answer);
      }

      console.log('winner', data.winner);
    });

    // Moteur de la partie du chat
    chat.main(socket);
  });
})(login, Game, chat, jQuery);
