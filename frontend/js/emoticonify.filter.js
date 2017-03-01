(function() {
  'use strict';

  angular.module('linagora.esn.emoticon').filter('esnEmoticonify', esnEmoticonify);

  function esnEmoticonify(esnEmoticonRegistry, esnEmoticonTextTransformer) {
    return esnEmoticontoImgFilter;

    function esnEmoticontoImgFilter(value, opts) {
      opts = opts || {};

      return esnEmoticonTextTransformer(value, function(emoticon, shortName) {
        var response = '<img src="' + esnEmoticonRegistry.getEmoticonURI(shortName) + '" title="' + shortName + '"';

        Object.keys(opts).forEach(function(key) {
          response += ' ' + key + '="' + opts[key].replace(/"/g, '&quot;') + '"';
        });
        response += '>';

        return response;
      });
    }
  }

})();
