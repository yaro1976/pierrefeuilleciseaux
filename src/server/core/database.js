/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:45:38
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-31 22:52:50
 */

'use strict';
/**
 * @module Db
 * @description Functions liées à l'accès à la base de données
 */

// Chargement des dépendances
const config = require('../core/config');
const mongoose = require('mongoose');

// replace mongoose.Promise depreciated
mongoose.Promise = global.Promise;

// Connexion à la base de données mongodb
mongoose.connect('mongodb://' + config.db.address + '/' + config.db.dbname);

// Creation du schema de base
const Schema = mongoose.Schema;

// Creation d'une instance de schema pour users
const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'un nom est requis'],
	},
	password: {
		type: String,
		required: [true, 'un mot de passe est requis'],
	},
	available: {
		type: Boolean,
		default: false,
	},
});

/**
 * @class db
 * @description Ensemble de méthodes d'accès à la base de données
 */
let dbClass = {
	/**
	 * @function checkUsername
	 * @description Vérifie la disponibilité du pseudonyme entré
	 * @param {string} username - Pseudonyme du nom du joueur
	 * @param {function} callback - Function de callback
	 */
	checkUsername: function(username, callback) {
		// Creation du model pour users
		const User = mongoose.model('user', userSchema);
		User.find({
			'name': username,
		}, function(err, data) {
			if (err) throw err;
			if (data.length >= 1) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	/**
	 * @function checkUsername
	 * @description Vérifie la validité du tuple {pseudonyme, mot de passe}
	 * @param {string} username - Pseudonyme du nom du joueur
	 * @param {string} password - Mot de passe associé au pseudonyme entré
	 * @param {function} callback - Function de callback
	 */
	checkValidity: function(username, password, callback) {
		// Creation du model pour users
		const User = mongoose.model('user', userSchema);
		User.find({
			'name': username,
			'password': password,
		}, function(err, data) {
			if (err) throw err;
			if (data.length >= 1) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	/**
	 * @function insertPlayer
	 * @description Insert un nouveau joueur dans la base de données
	 * @param {string} username - Pseudonyme du nom du joueur
	 * @param {string} password - Mot de passe associé au pseudonyme entré
	 * @param {function} callback - Function de callback
	 */
	insertPlayer: function(username, password, callback) {
		// Creation du model pour users
		const User = mongoose.model('user', userSchema);
		// Creer un nouvel utilisateur
		// var user = new User(username, password, true);
		User.create({
			'name': username,
			'password': password,
		}, function(err, data) {
			if (err) {
				callback(false);
			} else {
				callback(true);
			}
		});
	},
};

// Retourne l'objet Db
module.exports = dbClass;
