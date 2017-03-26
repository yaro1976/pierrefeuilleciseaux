/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-26 12:25:10
 */
'use strict';
/**
 * @module App.js
 * @description Script de gestion de la connexion
 */
(function() {
  $(function() {
    // Chargement du module socket.io
    let socket = io.connect();

    // Récupération des éléments du html
    let $messageForm = $('#messageForm');
    let $message = $('#message');
    let $chat = $('#chatBoxWindow');

    /**
     * Traitement du chat
     */
    $messageForm.submit(function(e) {
      e.preventDefault();
      // Vérification qu'un message est bien saisi
      let mesg = $message.val();

      if (mesg) {
        socket.emit('send message', mesg);
      }
      $message.val('');
    });
    socket.on('new message', function(data) {
      $chat.append(data.msg + '<br />');
    });
  });
})();
