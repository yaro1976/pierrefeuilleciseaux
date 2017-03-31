/*
 * @Author: Thierry ARONOFF
 * @Date: 2017-03-31 15:13:15
 * @Last Modified by: Thierry ARONOFF
 * @Last Modified time: 2017-03-31 15:24:26
 */

/**
 * @module Chat
 */

let chat = (function($) {
  let chat = {

    /**
     * Initialize la class Chat
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
     * Mise en forme du message posté
     * @param {string} msg - Message à mettre en forme
     */
    formatMessage : function(msg, username) {
      return '<p><strong>' + username +'</strong> : ' + msg + '</p>';
    },

    /**
     * Gere l'envoi du message vers le serveur
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
     * Receptionne les messages à partir du serveur
     */
    receptMessage: function() {
      // Reception d'un nouveau message
      let self = this;
      this.socket.on('new message', function(data) {
        self.$chat.append(self.formatMessage(data.msg, data.username));
      });
    },

    /**
     * Fonction principale de la classe Chat
     * @param {object} socket - Socket du client 
     */
    main: function(socket) {
      this.socket = socket;

      this.init();
      this.receptMessage();
      this.sendMessage();
    }    
  };

  return chat;

}) (jQuery);
