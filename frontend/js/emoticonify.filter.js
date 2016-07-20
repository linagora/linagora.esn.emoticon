(function() {
  'use strict';

  angular.module('linagora.esn.emoticon').filter('esnEmoticonify', esnEmoticonify);

  function esnEmoticonify(esnEmoticonRegistry, esnEmoticonTextTransformer) {
    return esnEmoticontoImgFilter;

    function esnEmoticontoImgFilter(value, opts) {
      opts = opts || {};

      return esnEmoticonTextTransformer(value, function(emoticon, shortName) {
        var response = '<img src="' + esnEmoticonRegistry.getEmoticonURI(shortName) + '" title="' + shortName + '"';

        Object.keys(opts).forEach(function(k) {
          response += ' ' + k + '="' + opts[k].replace('"', '\"') + '"';
        });
        response += '>';

        return response;
      });
    }
  }

})();
