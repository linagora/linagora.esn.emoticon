(function() {
  'use strict';

  angular.module('linagora.esn.emoticon').run(injectDefaultEmoticons);

  function injectDefaultEmoticons(esnEmoticonRegistry, esnEmoticonConstants, esnEmoticonList) {
    esnEmoticonRegistry.addCollection({
      path: esnEmoticonConstants.BASE_PATH,
      suffix: esnEmoticonConstants.SUFFIX,
      shortNames: esnEmoticonList
    });
  }

})();
