/* global chai: false */
var expect = chai.expect;

describe('The esnEmoticon service', function() {
  'use strict';

  var esnEmoticonRegistry, esnEmoticonCategories;

  beforeEach(function() {
    esnEmoticonCategories = {
      airplane: 'Travel',
      grinning: 'Smiley'
    };

    angular.mock.module('linagora.esn.emoticon');
    angular.mock.module(function($provide) {
      $provide.value('esnEmoticonList', []);
      $provide.value('esnEmoticonCategories', esnEmoticonCategories);
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
        shortNames: ['airplane', 'grinning']
      };

      esnEmoticonRegistry.addCollection(collection);

      expect(esnEmoticonRegistry.get('airplane')).to.exist;
      expect(esnEmoticonRegistry.get('grinning')).to.exist;
    });

    it('should return an array of the registered shortnames and categories', function() {
      var collection = {
        path: '/emoticons/',
        suffix: '.png',
        shortNames: ['airplane', 'grinning']
      };

      var expectedResult = [
        {shortName: 'airplane', category: 'Travel'},
        {shortName: 'grinning', category: 'Smiley'}
      ];

      esnEmoticonRegistry.addCollection(collection);

      expect(esnEmoticonRegistry.getReducedEmoticons()).to.deep.equal(expectedResult);
    });

    it('should return a registered emoticon', function() {
      var shortName = 'airplane';
      var emoticon = {
        path: '/emoticons/',
        suffix: '.png',
        shortName: shortName
      };

      esnEmoticonRegistry.add(emoticon);
      expect(esnEmoticonRegistry.get(shortName)).to.deep.equal(emoticon);
    });

    it('should generate the emoticon path', function() {
      var shortName = 'airplane';
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
