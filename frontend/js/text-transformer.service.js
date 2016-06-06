(function() {
  'use strict';

  angular.module('linagora.esn.emoticon').factory('esnEmoticonTextTransformer', esnEmoticonTextTransformer);

  function esnEmoticonTextTransformer(esnEmoticonList) {
    return handleEmoticons;

    // courtesy of MatterMost https://github.com/mattermost/platform/blob/master/webapp/utils/emoticons.jsx
    function handleEmoticons(text, replaceFn) {
      var output = text;

      replaceFn = replaceFn || function replaceEmoticonWithDirective(emoticon, shortName) {
        return '<esn-emoticon emoticon="' + shortName + '"></esn-emoticon>';
      };

      function replaceEmoticon(fullMatch, name, shortName) {
        if (esnEmoticonList.indexOf(shortName) >= 0) {
          return replaceFn(name, shortName);
        }

        return fullMatch;
      }

      output = output.replace(/(:([a-zA-Z0-9_+-]+):)(?=$|\s)/g, replaceEmoticon);

      return output;
    }
  }

})();
