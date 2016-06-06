

(function() {
  'use strict';
  angular.module('linagora.esn.emoticon').directive('esnEmoticon', esnEmoticon);

  function esnEmoticon(esnEmoticonConstants) {
    return {
      templateUrl: '/linagora.esn.emoticon/views/emoticon.html',
      scope: {},
      restrict: 'E',
      replace: true,
      link: link
    };

    function link(scope, element, attrs) {
      scope.emoticon = attrs.emoticon;
      scope.emoticonImage = esnEmoticonConstants.BASE_PATH + scope.emoticon + esnEmoticonConstants.SUFFIX;
    }
  }
})();
