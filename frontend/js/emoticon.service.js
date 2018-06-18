(function() {
  'use strict';

  angular.module('linagora.esn.emoticon').factory('esnEmoticonRegistry', esnEmoticonRegistry);

  function esnEmoticonRegistry(esnEmoticonCategories) {
    var emoticons = {};

    return {
      add: add,
      addCollection: addCollection,
      get: get,
      getEmoticonURI: getEmoticonURI,
      getReducedEmoticons: getReducedEmoticons
    };

    function add(item) {
      emoticons[item.shortName] = item;
    }

    function addCollection(collection) {
      collection.shortNames.forEach(function(shortName) {
        add({
          path: collection.path,
          suffix: collection.suffix,
          shortName: shortName,
          category: esnEmoticonCategories[shortName]
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

    function getReducedEmoticons() {
      var reducedEmoticons = [];

      Object.keys(emoticons).forEach(function(key) {
        reducedEmoticons.push({
          shortName: emoticons[key].shortName,
          category: emoticons[key].category
        });
      });

      return reducedEmoticons;
    }
  }
})();
