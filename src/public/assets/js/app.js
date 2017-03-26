/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-26 12:07:21
 */
'use strict';
/**
 * @module App.js
 * @description Script de gestion de la connexion
 */
// (function() {
$(function() {
  let socket = io.connect();
  let $messageForm = $('#messageForm');
  let $message = $('#message');
  let $chat = $('#chatBoxWindow');
  $messageForm.submit(function(e) {
    e.preventDefault();
    socket.emit('send message', $message.val());
    $message.val('');
  });
  socket.on('new message', function(data) {
    $chat.append(data.msg + '<br />');
  });
});
// })();
