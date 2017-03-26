/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-24 18:58:12
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-26 01:19:11
 */

'use strict';

/** @module server
 * @description Creation du serveur ExpressJS
 */

// Creation du serveur
let express = require('express');
let app = express();
// Ajout du module `http`
let http = require('http').Server(app);
// Chargement du module `socket.io`
let io = require('socket.io')(http);
// Activation du module path
let path = require('path');
// Activation du module body parser
let bodyParser = require('body-parser');

// Définition du port d'écoute
const PORT = process.env.port || 3000;

// Chargement des fichiers de définition des routes
let index = require('./routes/index');

// Emplacement des fichiers statiques (css, js, images)
app.use(express.static(path.join(__dirname, '..', '/public')));

app.use('/', index);

// Ecoute du port
http.listen(PORT, function() {
  console.log('listening on ' + PORT);
});

// Liste des messages
let listMessages = [];

// Liste des joueurs
let listJoueur = {};

// Interception de l'évennement de connexion du joueur
io.on('connection', function(socket) {
  console.log('------------------------------------');
  console.log('Joueur connecté ' + socket.id);
  console.log('------------------------------------');
  listJoueur[socket.id] = socket;
  // ajout de la socket dans un salon
  socket.join('test');
  io.to('test').emit('connecte', socket.id);

  socket.on('nouveau message', function(data) {
    listMessages.push({
      'joueur': socket.id,
      'message': data.message,
    });
    // socket.broadcast.to('test').emit('liste messages', listMessages);
    io.to('test').emit('liste messages', listMessages);
    console.log('------------------------------------');
    console.log(listMessages);
    console.log('------------------------------------');
  });

  // Interception de l'évennement de déconnexion du joueur
  socket.on('disconnect', function() {
    console.log('------------------------------------');
    console.log('Joueur déconnecté ' + socket.id);
    console.log('------------------------------------');
  });
});
