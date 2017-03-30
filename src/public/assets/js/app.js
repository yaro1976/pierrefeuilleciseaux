/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-30 22:28:26
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
