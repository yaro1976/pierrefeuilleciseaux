/*
 * @Author: Thierry Aronoff
 * @Date: 2017-04-01 22:13:30
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 11:30:57
 */

/** @module
 * @requires mongoose
 * @exports User
 */
'use strict';

const mongoose = require('mongoose');

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

// Creation du model pour users
const User = mongoose.model('user', userSchema);

module.exports = User;
