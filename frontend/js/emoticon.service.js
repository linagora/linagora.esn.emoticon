(function() {
  'use strict';

  angular.module('linagora.esn.emoticon').factory('esnEmoticonRegistry', esnEmoticonRegistry);

  function esnEmoticonRegistry() {
    var emoticons = {};

    return {
      add: add,
      addCollection: addCollection,
      get: get,
      getShortNames: getShortNames,
      getEmoticonURI: getEmoticonURI
    };

    function add(item) {
      emoticons[item.shortName] = item;
    }

    function addCollection(collection) {
      collection.shortNames.forEach(function(shortName) {
        add({
          path: collection.path,
          suffix: collection.suffix,
          shortName: shortName
        });
      });
    }

    function get(shortName) {
      return emoticons[shortName];
    }

    function getEmoticonURI(shortName) {
      var emoticon = get(shortName);

      return emoticon.path + emoticon.shortName + emoticon.suffix;
    }

    function getShortNames() {
      return Object.keys(emoticons);
    }
  }
})();
