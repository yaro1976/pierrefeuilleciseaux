/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-28 21:09:59
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-04-04 15:32:49
 */

/**
 * @module
 */

/**
 * Configuration des accès à la base de données et du moteur de jeu
 *
 * @namespace
 *
 * @property {object} db - Configuration de la base de données
 * @property {string} db.dbname - Nom de la base de données
 * @property {string} db.address - Adresse de la base de données
 * @property {number} db.port - Port de connexion à la base de données
 * @property {string} db.user - Utilisateur de connexion à la base de données
 * @property {string} db.mdp - Mot de passe de connexion à la base de données
 * @property {object} game - Configuration du jeu
 * @property {number} game.nbparties - Nombre de parties par manche
 * @property {number} game.dureeManche - Durée d'une manche
 */
module.exports = {
  'db': {
    'dbname': 'dbchifoumi',
    'address': 'db',
    'port': 27017,
    'user': 'root',
    'mdp': 'password',
  },
  'game': {
    'nbParties': 5,
    'dureeManche': 10,
  },

};
