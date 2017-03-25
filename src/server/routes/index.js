/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-24 19:16:39
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-24 20:27:41
 */

/** @module routes */

const express = require('express');
const path = require('path');
let router = express.Router();

// Home
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'public/index.html'));
});

// Formulaire d'inscription
router.post('/', function(req, res) {
  res.send('Inscription');
});

module.exports = router;
