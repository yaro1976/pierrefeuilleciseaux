/*
 * @Author: Thierry Aronoff
 * @Date: 2017-03-26 00:07:45
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-03-31 12:13:32
 */
'use strict';
/**
 * @module App.js
 * @description Script de gestion de la connexion
 */
let login = (function($) {
  /**
   * @class Login
   * @description Méthodes liées à la page de login de l'utilisateur
   */
  let login = {

    /* Sauvegarde du mode du formulaire
     * modeAuth = True => Authentification du joueur
     * modeAuth = False => Création d'un nouveau compte
     */
    modeAuth: true,

    signIn: false,
    //     authentification: false,

    // Données issues du formulaire d'identification
    userId: {
      'username': '',
      'passwd': '',
    },

    /**
     * @function loginAuth
     * @description Identification de l'utilisateur
     */
    loginAuth: function() {
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
        } else {
          self.afficheErreur('L\'utilisateur n\'existe pas, ou le mot de passe est erroné');
          // TODO: Redemander mot de passe le nom du joueur
        }
      });
    },

    /**
     * @function newAccount
     * @description Créer un nouveau compte
     */
    newAccount: function() {
      // le joueur créé un compte
      // Vérifier que le peudo est dispo
      let self = this;
      this.socket.emit('check pseudo', this.userId, function(data) {
        if (data) {
          self.afficheErreur('Le compte ' + self.userId.username + ' existe déjà');
        } else {
          console.log('Le pseudo est disponible');
          self.afficheInfo('Le pseudo ' + self.userId.username + ' est disponible');


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
    },

    /**
     * @function init
     * @description Initialise la classe Login
     */
    init: function() {
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
    },

    /**
     * @function clickCreerCompte
     * @description Action quand effectuée quand l'action Créer un un compte est appelée
     */
    clickCreerCompte: function() {
      // Le joueur créé un compte
      this.modeLogin = false;
    },

    /**
     * @function clickAuthentifier
     * @description Fonction Appelée lors de la sélection du bouton autentifier
     */
    clickAuthentifier: function() {
      // Le joueur s'identifie
      this.modeLogin = true;
    },

    /**
     * @function click
     * @description Function appelée lors de la validation du formulaire
     */
    click: function() {
      this.updateUserID();
      if (this.modeLogin) {
        this.loginAuth();
        return this.signin;
      } else {
        this.newAccount();
        return this.signin;
      }
    },

    /**
     * @function updateUserID
     * @description Recupère les données issues du formulaire
     */
    updateUserID: function() {
      this.userId = {
        'username': this.$username.val(),
        'passwd': this.$passwd.val(),
      };
    },

    /**
     * @function afficheErreur
     * @description Affiche les messages d'erreur
     * @param {string} erreur - Message d'erreur à afficher
     */
    afficheErreur: function(erreur) {
      $('#error-block').text(erreur);
      $('#error-block').show();
    },

    /**
     * @function afficheInfo
     * @description Affiche les message d'information
     * @param {string} msgInfo - Message d'information à afficher
     */
    afficheInfo: function(msgInfo) {
      $('#information-block').text(msgInfo);
      $('#information-block').show();
    },

    main: function(socket) {
      this.socket = socket;
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

    render: function() {
      if (this.modeLogin) {
        $('#passwd-verif').hide();
        $('#btn-signIn').val('S\'identifier');
      } else {
        $('#passwd-verif').show();
        // $('#usernameForm').append('<input type="password" name="passwd-verif" id="passwd-verif" placeholder="Confirmez votre mot de passe" required="requis" />');
        $('#btn-signIn').val('Créer un compte');
      }
    },

    cacheForm: function() {
      $('#loginZone').hide();
    },
  };

  // Fin class
  return login;
})(jQuery);
