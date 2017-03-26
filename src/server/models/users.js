/*
* @Author: ka
* @Date:   2017-03-26 16:18:25
* @Last Modified by:   ka
* @Last Modified time: 2017-03-26 16:43:23
*/

'use strict';

const mongoose = require('mongoose');

// Connexion à la base de données mongodb
mongoose.connect('mongo://192.168.0.104/dbchifoumi')

const Schema = mongoose.Schema;

// Creation d'une instance de shema pour users
const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'un nom est requis']
	},
	password: {
		type: String,
		required: [true, 'un mot de passe est requis']
	},
	available: {
		type: Boolean,
		default: false
	}

});

// Creation du model pour users
/const User = mongoose.model('user', userSchema);

module.exports = Users