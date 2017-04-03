/*
 * @Author: Thierry ARONOFF
 * @Date: 2017-03-31 15:13:15
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-02 16:20:43
 */
'use strict';
/**
 * Functions liées au module chat
 * @module
 */

/**
 *  Gestion du chat
 * @class
 * @param {object} $ - jQuery
 */
var chat = (function ($) {
  /** @constructor */
  var chat = {

  };
  /**
   * Mise en forme du message posté
   * @method
   * @param {string} msg - Message à mettre en forme
   * @param {string} username - Auteur du message
   * @return {string} Message mis en forme
   */
  chat.formatMessage = function (msg, username) {
    var msgFormat = '<p>';

    // Si l'utilisateur n'est pas renseigné, on ommet le champ
    if (username) {
      msgFormat += '<span>' + username + '</span> : ';
    }
    msgFormat += msg + '</p>';

    // On renvoi le message formaté
    return msgFormat;
  };

  /**
   *  Gere l'envoi du message vers le serveur
   * @method
   */
  chat.sendMessage = function () {
    var self = this;
    this.$messageForm.submit(function (e) {
      e.preventDefault();
      // Vérification qu'un message est bien saisi
      var mesg = self.$message.val();

      if (mesg.length !== 0) {
        self.socket.emit('send message', mesg);
      }
      self.$message.val('');
    });
  };

  /**
   * Ecrit le message dans la zone de chat
   * @method
   * @param {string} msg - Message à écrire
   * @param {string} user - Auteur du message
   */
  chat.ecrire = function (msg, user) {
    this.$chat.append(this.formatMessage(msg, user));
  };

  /**
   * Receptionne les messages à partir du serveur
   * @method
   */
  chat.receptMessage = function () {
    // Reception d'un nouveau message
    var self = this;
    this.socket.on('new message', function (data) {
      self.ecrire(data.msg, data.username);
      // self.$chat.append(self.formatMessage(data.msg, data.username));
    });
  };

  /**
   * Fonction principale de la classe Chat
   * @method
   * @param {object} socket - Socket du client
   */
  chat.main = function (socket) {
    this.socket = socket;

    this.init();
    this.receptMessage();
    this.sendMessage();
  };


  /**
   * Initialize la class Chat
   * @method
   */
  chat.init = function () {
    /**
     * Traitement du chat
     */
    // Récupération des éléments du html

    this.$messageForm = $('#messageForm');
    this.$message = $('#message');
    this.$chat = $('#chatBoxWindow');
  };


  return chat;
})(jQuery);