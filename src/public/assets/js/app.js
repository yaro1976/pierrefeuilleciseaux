/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-28 21:09:14
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
/**
 * Login
 */
let $usernameForm = $('#usernameForm');
let $username = $('#username');
let $passwd = $('#passwd');
let $signInBtn = $('#btn-signIn');
let $signUpBtn = $('#btn-signUp');

$signInBtn.click(function() {
  console.log('------------------------------------');
  console.log('sign in');
  console.log('------------------------------------');

  let userId = {
    'username': $username.val(),
    'passwd': $passwd.val(),
  };

  socket.emit('sign in', userId, function(data) {
    if (data) {
      console.log('user exists');
    } else {
      console.log('user doesn\'t exists or wrong password');
    }
  });
});

$signUpBtn.click(function() {
  console.log('------------------------------------');
  console.log('sign up');
  console.log('------------------------------------');
  let userId = {
    'username': $username.val(),
    'passwd': $passwd.val(),
  };

  socket.emit('sign up', userId, function(data) {
    if (data) {
      console.log('user exists');
    } else {
      console.log('user doesn\'t exists or wrong password');
    }
  });
});

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
})();
