(function() {
  'use strict';

  angular.module('linagora.esn.emoticon')
    .controller('esnEmoticonPopupController', esnEmoticonPopupController);

  function esnEmoticonPopupController(esnEmoticonRegistry) {
    var self = this;

    self.$onInit = $onInit;
    self.updateEmojiValue = updateEmojiValue;
    self.getEmojiName = getEmojiName;
    self.getCategory = getCategory;
    self.resetField = resetField;

    function $onInit() {
      self.emoticonsList = esnEmoticonRegistry.getReducedEmoticons();
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
      self.categoryToSearch = '';
    }

    function getEmojiName() {
      var emojiToSearch = self.emojiToSearch;

      return emojiToSearch && emojiToSearch.replace(/(^:|:$)/mg, '').toLowerCase();
    }

    function getCategory() {
      var categoryToSearch = self.categoryToSearch;

      return categoryToSearch && categoryToSearch.replace(/(^:|:$)/mg, '');
    }
  }
})();
