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
(function(login, $) {
  $(function() {
    // Chargement du module socket.io
    let socket = io.connect();

    login.main(socket);


    /**
     * Traitement du chat
     */
    // Récupération des éléments du html

    let $messageForm = $('#messageForm');
    let $message = $('#message');
    let $chat = $('#chatBoxWindow');

    $messageForm.submit(function(e) {
      e.preventDefault();
      // Vérification qu'un message est bien saisi
      let mesg = $message.val();

      if (mesg.length !== 0) {
        socket.emit('send message', mesg);
      }
      $message.val('');
    });

    // Reception d'un nouveau message
    socket.on('new message', function(data) {
      $chat.append(data.msg + '<br />');
    });
  });
})(login, jQuery);
