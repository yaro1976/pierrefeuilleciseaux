/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 11:19:44
 */
'use strict';
/**
 * Script de gestion de la connexion
 * @module
 */

/**
 *  Méthodes liées à la page de login de l'utilisateur
 * @class
 */
let login = (function($) {
  let login = {
    /* Sauvegarde du mode du formulaire
     * modeAuth = True => Authentification du joueur
     * modeAuth = False => Création d'un nouveau compte
     */
    modeAuth: true,

    // Données issues du formulaire d'identification
    userId: {
      'username': '',
      'passwd': '',
    },
  };

  /**
   * Identification de l'utilisateur
   * @method
   */
  login.loginAuth = function() {
    let self = this;
    // Le joueur s'identifie
    this.socket.emit('sign in', self.userId, function(data) {
      if (data) {
        console.log('Joueur identifié');
        self.afficheInfo('Bienvenue');
        // Sauvegarder le nom du joueur
        self.socket.emit('username', self.userId.username);

        // Hide formulaire de login
        $('#loginZone').hide();
        // Affiche la zone de jeu
        self.afficheZoneJeu();
      } else {
        let msg;
        msg = 'L\'utilisateur n\'existe pas, ou le mot de passe est erroné';
        self.afficheErreur(msg);
      }
    });
  };

  /**
   *  Créer un nouveau compte
   * @method
   */
  login.newAccount = function() {
    // le joueur créé un compte
    // Vérifier que le peudo est dispo
    let self = this;
    this.socket.emit('check pseudo', this.userId, function(data) {
      if (data) {
        let msg;
        msg = 'Le compte ' + self.userId.username + ' existe déjà';
        self.afficheErreur(msg);
      } else {
        let msg;
        msg = 'Le pseudo ' + self.userId.username + ' est disponible';
        console.log('Le pseudo est disponible');
        self.afficheInfo(msg);

        // Récupère les mots de passe entrés
        let pass1 = self.$passwd.val();
        let pass2 = self.$passwdVerif.val();
        // Vérifie que les mots de passe sont identiques
        console.log('mots de pass', pass1, pass2);
        if (pass1 === pass2) {
          // Créer compte
          self.socket.emit('creer compte', self.userId, function(data) {
            if (data) {
              // Le compte a bien été créé
              $('#error-block').hide();
              $('#information-block').hide();
              // Hide formulaire de login
              $('#loginZone').hide();

              // Affiche la zone de jeu
              self.afficheZoneJeu();

              // Sauvegarder le nom du joueur
              self.socket.emit('username', self.userId.username);
            } else {
              // Erreur lors de la création du compte
              self.afficheErreur('Erreur lors de la création du compte');
            }
          });
        } else {
          console.error('mot de passe différents');
          self.afficheErreur('Erreur : mot de passe différents');
        }
      }
    });
  };

  /**
   *  Initialise la classe Login
   * @method
   */
  login.init = function() {
    this.$usernameForm = $('#usernameForm');
    this.$username = $('#username');
    this.$passwd = $('#passwd');
    this.$signInBtn = $('#btn-signIn');
    this.$btnIdentifier = $('#btn-Identifier');
    this.$btnCreerCompte = $('#btn-creerCompte');
    this.$passwdVerif = $('#passwd-verif');
    // Sauvegarder le mode d'identification
    this.modeLogin = true;
    this.$passwdVerif.hide();

    $('#error-block').hide();
    $('#information-block').hide();
  };

  /**
   * Action quand effectuée quand l'action Créer un un compte est appelée
   * @method
   */
  login.clickCreerCompte = function() {
    // Le joueur créé un compte
    this.modeLogin = false;
  };

  /**
   *  Fonction Appelée lors de la sélection du bouton autentifier
   * @method
   */
  login.clickAuthentifier = function() {
    // Le joueur s'identifie
    this.modeLogin = true;
  };

  /**
   * Function appelée lors de la validation du formulaire
   * @method
   */
  login.click = function() {
    this.updateUserID();
    if (this.modeLogin) {
      this.loginAuth();
    } else {
      this.newAccount();
    }
  };

  /**
   * Recupère les données issues du formulaire
   * @method
   */
  login.updateUserID = function() {
    this.userId = {
      'username': this.$username.val(),
      'passwd': this.$passwd.val(),
    };
  };

  /**
   * Affiche les messages d'erreur
   * @method
   * @param {string} erreur - Message d'erreur à afficher
   */
  login.afficheErreur = function(erreur) {
    $('#error-block').text(erreur);
    $('#error-block').show();
  };

  /**
   * Affiche les message d'information
   * @method
   * @param {string} msgInfo - Message d'information à afficher
   */
  login.afficheInfo = function(msgInfo) {
    $('#information-block').text(msgInfo);
    $('#information-block').show();
  };

  /**
   * Fonction principale
   * @method
   * @param {object} socket - Objet Socket.io
   * @param {object} gameZone - Zone de jeu
   */
  login.main = function(socket, gameZone) {
      this.socket = socket;
      this.$jeu = gameZone;
      let self = this;

      this.init();
      this.$btnCreerCompte.click(function() {
        self.clickCreerCompte();
        self.render();
      });
      this.$btnIdentifier.click(function() {
        self.clickAuthentifier();
        self.render();
      });

      this.$signInBtn.click(function(e) {
        e.preventDefault();
        self.click();
      });
    },

    /**
     * Met à jour le formulaire de login
     * @method
     */
    login.render = function() {
      if (this.modeLogin) {
        $('#passwd-verif').hide();
        $('#btn-signIn').val('S\'identifier');
        $('#btn-Identifier').addClass('btn-primary--unselected');
        $('#btn-creerCompte').removeClass('btn-primary--unselected');
        $('#btn-Identifier').addClass('btn-primary');
        $('#btn-creerCompte').removeClass('btn-primary');
        $('#loginZone h2').text('Indentifiez-vous pour jouer');
      } else {
        $('#passwd-verif').show();
        $('#btn-signIn').val('Créer un compte');
        $('#btn-Identifier').addClass('btn-primary--unselected');
        $('#btn-creerCompte').removeClass('btn-primary--unselected');
        $('#btn-Identifier').removeClass('btn-primary');
        $('#btn-creerCompte').addClass('btn-primary');
        $('#loginZone h2').text('Inscrivez-vous pour jouer');
      }
    },

    /**
     * Cache le formulaire de login
     * @method
     */
    login.cacheForm = function() {
      $('#loginZone').hide();
    },

    /**
     * Cache la zone de jeu
     * @method
     */
    login.afficheZoneJeu = function() {
      this.$jeu.show();
    };


  // Fin class
  return login;
})(jQuery);
