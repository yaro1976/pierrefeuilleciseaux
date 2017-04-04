/*
 * @Author: Thierry ARONOFF 
 * @Date: 2017-04-04 15:33:56 
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-04-04 15:41:05
 */
'use strict';

/**
 * Fonction principale du serveur
 * 
 * @module
 */

var app = require('./src/server/app.js');

// Définition du port d'écoute
const PORT = process.env.PORT || 80;