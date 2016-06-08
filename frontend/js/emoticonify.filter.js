(function() {
  'use strict';

  angular.module('linagora.esn.emoticon').filter('esnEmoticonify', esnEmoticonify);

  function esnEmoticonify(esnEmoticonConstants, esnEmoticonTextTransformer) {
    return esnEmoticontoImgFilter;

    function esnEmoticontoImgFilter(value, opts) {
      opts = opts || {};

      return esnEmoticonTextTransformer(value, function(emoticon, shortName) {
        var response = '<img src="' + esnEmoticonConstants.BASE_PATH + shortName + esnEmoticonConstants.SUFFIX + '" title="' + shortName + '"';

        Object.keys(opts).forEach(function(k) {
          response += ' ' + k + '="' + opts[k].replace('"', '\"') + '"';
        });
        response += '>';

        return response;
      });
    }
  }

})();
