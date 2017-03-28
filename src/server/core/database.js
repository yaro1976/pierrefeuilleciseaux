/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:45:38
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-28 22:55:54
 */

'use strict';
/**
 * @module Db
 */

// Chargment des dépendances
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
 * @namespace db
 */
let db = {
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
		};


		module.exports = db;
