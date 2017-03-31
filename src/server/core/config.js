/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:09:59
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-03-31 22:48:03
 */

/**
 * @module Fichier de configuration
 */

/**
 * @namespace configuration
 * @property {string} dbname - Nom de la base de données
 * @property {string} address - Adresse de la base de données
 * @property {number} port - Port de connexion à la base de données
 * @property {string} user - Utilisateur de connexion à la base de données
 * @property {string} mdp - Mot de passe de connexion à la base de données
 * @property {number} nbparties - Nombre de parties par manche
 * @property {number} dureeManche - Durée d'une manche
 */
module.exports = {
  'db': {
    'dbname': 'dbchifoumi',
    'address': '192.168.0.104',
    // 'address': '127.0.0.1',
    'port': 27017,
    'user': '',
    'mdp': '',
  },
  'game': {
    'nbParties': 5,
    'dureeManche': 10,
  },

};
