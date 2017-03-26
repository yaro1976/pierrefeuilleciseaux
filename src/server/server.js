/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-24 18:58:12
 * @Last Modified by:   ka
 * @Last Modified time: 2017-03-26 17:44:00
 */

'use strict';

/** @module server
 * @description Creation du serveur ExpressJS
 */

// Creation du serveur
let express = require('express');
const mongoose = require('mongoose');
const app = express();

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

// Connexion à la base de données mongodb
mongoose.connect('mongodb://192.168.0.104/dbchifoumi');

// replace mongoose.Promise depreciated
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/', index);

//

// Ecoute du port
http.listen(PORT, function() {
  console.log('listening on ' + PORT);
});

// Detection de l'évenement de connection d'un joueur
io.sockets.on('connection', function(socket) {
  console.log('------------------------------------');
  console.log('Joueur ' + socket.id + ' connecté...');
  console.log('------------------------------------');

  // Detection de l'évenement de déconnection d'un joueur
  socket.on('disconnect', function() {
    console.log('------------------------------------');
    console.log('Joueur ' + socket.id + ' déconnecté...');
    console.log('------------------------------------');
  });
  // Detection de l'évènement d'un nouveau message posté
  socket.on('send message', function(data) {
    io.sockets.emit('new message', {
      msg: data,
    });
  });
});
