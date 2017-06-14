(function() {
  'use strict';

  angular.module('linagora.esn.emoticon')
    .component('esnEmoticonPopup', esnEmoticonPopup());

  function esnEmoticonPopup() {
    return {
      templateUrl: '/linagora.esn.emoticon/views/emoticon-popup.html',
      controller: 'esnEmoticonPopupController',
      bindings: {
        onEmojiSelected: '<'
      }
    };
  }
})();
