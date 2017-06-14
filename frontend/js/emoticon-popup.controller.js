(function() {
  'use strict';

  angular.module('linagora.esn.emoticon')
    .controller('esnEmoticonPopupController', esnEmoticonPopupController);

  function esnEmoticonPopupController(esnEmoticonRegistry) {
    var self = this;

    self.$onInit = $onInit;
    self.updateEmojiValue = updateEmojiValue;
    self.getEmojiName = getEmojiName;
    self.resetField = resetField;

    function $onInit() {
      self.emoticonsList = esnEmoticonRegistry.getShortNames();
      resetField();
    }

    function updateEmojiValue(emojiValue) {
      if (emojiValue) {
        self.onEmojiSelected(emojiValue);
        resetField();
      }
    }

    function resetField() {
      self.emojiToSearch = '';
    }

    function getEmojiName() {
      var emojiToSearch = self.emojiToSearch;

      return emojiToSearch && emojiToSearch.replace(/(^:|:$)/mg, '').toLowerCase();
    }
  }
})();
