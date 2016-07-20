/* global chai: false */
var expect = chai.expect;

describe('The esnEmoticon service', function() {
  'use strict';

  var esnEmoticonRegistry;

  beforeEach(function() {
    angular.mock.module('linagora.esn.emoticon');
    angular.mock.module(function($provide) {
      $provide.value('esnEmoticonList', []);
    });
    inject(function(_esnEmoticonRegistry_) {
      esnEmoticonRegistry = _esnEmoticonRegistry_;
    });
  });

  describe('The esnEmoticonRegistry factory', function() {

    it('should add the collection of emoticons in the registry', function() {
      var collection = {
        path: '/emoticons/',
        suffix: '.png',
        shortNames: ['+1', 'smile']
      };

      esnEmoticonRegistry.addCollection(collection);

      expect(esnEmoticonRegistry.get('+1')).to.exist;
      expect(esnEmoticonRegistry.get('smile')).to.exist;
    });

    it('should return an array of the registered shortnames', function() {
      var collection = {
        path: '/emoticons/',
        suffix: '.png',
        shortNames: ['+1', 'smile']
      };

      esnEmoticonRegistry.addCollection(collection);

      expect(esnEmoticonRegistry.getShortNames()).to.deep.equal(collection.shortNames);
    });

    it('should return a registered emoticon', function() {
      var shortName = '+1';
      var emoticon = {
        path: '/emoticons/',
        suffix: '.png',
        shortName: shortName
      };

      esnEmoticonRegistry.add(emoticon);
      expect(esnEmoticonRegistry.get(shortName)).to.deep.equal(emoticon);
    });

    it('should generate the emoticon path', function() {
      var shortName = '+1';
      var emoticon = {
        path: '/emoticons/',
        suffix: '.png',
        shortName: shortName
      };

      esnEmoticonRegistry.add(emoticon);
      expect(esnEmoticonRegistry.getEmoticonURI(shortName)).to.equal(emoticon.path + emoticon.shortName + emoticon.suffix);
    });
  });
});
