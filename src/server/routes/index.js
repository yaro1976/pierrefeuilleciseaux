/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-24 19:16:39
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-28 22:08:30
 */

/** @module routes */

const express = require('express');
const path = require('path');
const router = express.Router();
// const Users = require('../models/users');

// Home
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'public/index.html'));
});

// Formulaire d'inscription
// router.post('/', function(req, res) {
//   Users.create(req.body).then(function(user) {
//   	res.send(user);
//   });
// });

module.exports = router;
