(function() {
  'use strict';
  angular.module('linagora.esn.emoticon').directive('esnEmoticon', esnEmoticon);

  function esnEmoticon(esnEmoticonRegistry) {
    return {
      templateUrl: '/linagora.esn.emoticon/views/emoticon.html',
      scope: {
        emoticonId: '='
      },
      restrict: 'E',
      replace: true,
      link: link
    };

    function link(scope, element, attrs) {
      if (scope.emoticonId) {
        scope.emoticon = scope.emoticonId;
      } else {
        scope.emoticon = attrs.emoticon;
      }
      scope.emoticonImage = esnEmoticonRegistry.getEmoticonURI(scope.emoticon);
    }
  }
})();
