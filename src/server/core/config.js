/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:09:59
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-28 22:07:22
 */

/**
 * @module Fichier de configuration
 */

/**
 * @namespace configuration
 */
module.exports = {
  'db': {
    'dbname': 'dbchifoumi',
    // 'address': '192.168.0.104',
    'address': '127.0.0.1',
    'port': 27017,
    'user': '',
    'mdp': '',
  },
  'game': {
    'nbParties': 5,
    "dureeManche": 10
  },
};
