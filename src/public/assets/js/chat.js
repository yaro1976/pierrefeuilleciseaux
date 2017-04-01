/*
 * @Author: Thierry ARONOFF
 * @Date: 2017-03-31 15:13:15
 * @Last Modified by: Thierry Aronoff
 * @Last Modified time: 2017-04-01 17:55:00
 */
'use strict';
/**
 * @module Chat
 * @description Functions liées au module chat
 */

let chat = (function($) {
  /**
   * @class chat
   * @description Gestion du chat
   */
  let chat = {
    /**
     * @function init
     * @description Initialize la class Chat
     */
    init: function() {
      /**
       * Traitement du chat
       */
      // Récupération des éléments du html

      this.$messageForm = $('#messageForm');
      this.$message = $('#message');
      this.$chat = $('#chatBoxWindow');
    },

    /**
     * @function formatMessage
     * @description Mise en forme du message posté
     * @param {string} msg - Message à mettre en forme
     * @param {string} username - Auteur du message
     * @return {string} Message mis en forme
     */
    formatMessage: function(msg, username) {
      return '<p><strong>' + username + '</strong> : ' + msg + '</p>';
    },

    /**
     * @function sendMessage
     * @description Gere l'envoi du message vers le serveur
     */
    sendMessage: function() {
      let self = this;
      this.$messageForm.submit(function(e) {
        e.preventDefault();
        // Vérification qu'un message est bien saisi
        let mesg = self.$message.val();

        if (mesg.length !== 0) {
          self.socket.emit('send message', mesg);
        }
        self.$message.val('');
      });
    },

    /**
     * @function ecrire
     * @description Ecrit le message dans la zone de chat
     * @param {string} msg - Message à écrire
     * @param {string} user - Auteur du message
     */
    ecrire: function(msg, user) {
      this.$chat.append(this.formatMessage(msg, user));
    },

    /**
     * @function receptMessage
     * @description Receptionne les messages à partir du serveur
     */
    receptMessage: function() {
      // Reception d'un nouveau message
      let self = this;
      this.socket.on('new message', function(data) {
        self.ecrire(data.msg, data.username);
        // self.$chat.append(self.formatMessage(data.msg, data.username));
      });
    },

    /**
     * @function main
     * @description Fonction principale de la classe Chat
     * @param {object} socket - Socket du client
     */
    main: function(socket) {
      this.socket = socket;

      this.init();
      this.receptMessage();
      this.sendMessage();
    },
  };

  return chat;
})(jQuery);
