/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-03-31 12:14:11
 */
'use strict';
/**
 * @module App.js
 * @description Script de gestion de la connexion
 */
(function(login, chat, $) {
  $(function() {
    // Chargement du module socket.io
    let socket = io.connect();

    // Gestion de l'enregistement de la page de login
    login.main(socket);

    // Moteur de la partie du chat
    chat.main(socket);

  });
})(login, chat, jQuery);
