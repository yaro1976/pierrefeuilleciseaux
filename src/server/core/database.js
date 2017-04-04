/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:45:38
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-04-04 15:36:46
 */

'use strict';
/**
 *  Functions liées à l'accès à la base de données
 * @module
 * @requires mongoose
 * @requires userModels - Model de la collection User
 * @requires config Module
 */

// Chargement des dépendances
const config = require('../config/config');
const User = require('../models/userModels');
const mongoose = require('mongoose');

// replace mongoose.Promise depreciated
mongoose.Promise = global.Promise;

// Connexion à la base de données mongodb
mongoose.connect('mongodb://' + config.db.address + '/' + config.db.dbname);

/**
 *  Ensemble de méthodes d'accès à la base de données
 * @class
 */
var dbClass = {};
/**
 * Vérifie la disponibilité du pseudonyme entré
 * @function
 * @param {string} username - Pseudonyme du nom du joueur
 * @param {function} callback - Function de callback
 */
dbClass.checkUsername = function (username, callback) {
	User.find({
		'name': username,
	}, function (err, data) {
		if (err) throw err;
		if (data.length >= 1) {
			callback(true);
		} else {
			callback(false);
		}
	});
};

/**
 * Vérifie la validité du tuple {pseudonyme, mot de passe}
 * @function
 * @param {string} username - Pseudonyme du nom du joueur
 * @param {string} password - Mot de passe associé au pseudonyme entré
 * @param {function} callback - Function de callback
 */
dbClass.checkValidity = function (username, password, callback) {
	User.find({
		'name': username,
		'password': password,
	}, function (err, data) {
		if (err) throw err;
		if (data.length >= 1) {
			callback(true);
		} else {
			callback(false);
		}
	});
};
/**
 * Insert un nouveau joueur dans la base de données
 * @function
 * @param {string} username - Pseudonyme du nom du joueur
 * @param {string} password - Mot de passe associé au pseudonyme entré
 * @param {function} callback - Function de callback
 */
dbClass.insertPlayer = function (username, password, callback) {
	User.create({
		'name': username,
		'password': password,
	}, function (err, data) {
		if (err) {
			callback(false);
		} else {
			callback(true);
		}
	});
};

// Retourne l'objet Db
module.exports = dbClass;