/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-24 18:58:12
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-05 22:38:34
 */

'use strict';

/** 
 * Creation du serveur ExpressJS
 * 
 * @module
 *  
 */

// Creation du serveur
var express = require('express');
// const mongoose = require('mongoose');
const app = express();

// Fichier de configuration de l'application
var config = require('./config/config');

// Mise en place du debogage
var debug = require('debug')('http');

// Ajout du module `http`
var http = require('http').Server(app);

// Chargement du module `socket.io`
// var io = require('socket.io')(http);

// Activation de la compression des requëtes
var compression = require('compression');
app.use(compression());

// Security 
var helmet = require('helmet')
app.use(helmet())

// Activation du module path
var path = require('path');

// Logger
var morgan = require('morgan');

// Activation du module body parser
var bodyParser = require('body-parser');

// Chargement du module pug
const pug = require('pug');

var PORT;

if (app.get('env') === 'development') {
  // Définition du port d'écoute de développement
  PORT = process.env.PORT || 3000;
  app.use(morgan('combined'));
} else {
  // Définition du port d'écoute de production
  PORT = process.env.PORT || 80;
}

// Chargement des fichiers de définition des routes
var index = require('./routes/home');

// Emplacement des fichiers statiques (css, js, images)
app.use(express.static(path.join(__dirname, '..', '/public')));

// Mise à jour des chemins des vues
app.set('views', path.join(__dirname, '/views'));


// Activation de pug
app.set('view engine', 'pug');

// Chargement des méthode d'accès à la db
var db = require('./core/database');

app.use(bodyParser.json());

// Association de la route `/` au fichier de configuration des routes
app.use('/', index);

// Ecoute du port
http.listen(PORT, function () {
  console.log('listening on ' + PORT);
});

// Chargement du system de communication par socket
var socketSystem = require('./core/socketSystem');

// Activation de la socket
var socketSyst = new socketSystem(http);
socketSyst.main();
socketSyst.update();