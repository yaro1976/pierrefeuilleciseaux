/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-24 19:16:39
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 00:28:12
 */

/**
 * @module
 * @description Fichier de configuration des routes Web
 * @exports router
 * @requires express
 * @requires path
 */

const express = require('express');
const path = require('path');
/** Active le module Router */
const router = express.Router();
// const Users = require('../models/users');

/** Home*/
router.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname, '..', '..', 'public/index.html'));
  res.render('index.pug');
});

module.exports = router;
