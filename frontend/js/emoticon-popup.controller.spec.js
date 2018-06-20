'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('the emoticon-popup controller', function() {

  var $scope, $rootScope, $controller, esnEmoticonRegistry, ReducedEmoji;

  beforeEach(function() {

    ReducedEmoji = [{shortName: 'a', category: 'ca'}, {shortName: 'ab', category: 'ca'}, {shortName: 'abc', category: 'cb'}];

    esnEmoticonRegistry = {
      getReducedEmoticons: sinon.stub().returns(ReducedEmoji),
      addCollection: sinon.spy()
    };

    angular.mock.module('linagora.esn.emoticon', function($provide) {
      $provide.value('esnEmoticonRegistry', esnEmoticonRegistry);
    });

    angular.mock.inject(function(_$rootScope_, _$controller_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = _$controller_;
    });
  });

  function initController() {
    var controller = $controller('esnEmoticonPopupController',
      {$scope: $scope}
    );

    $scope.$digest();

    return controller;
  }

  describe('the $onInit function', function() {

    it('should call esnEmoticonRegistry.getReducedEmoticons() method', function() {
      var controller = initController();

      controller.$onInit();

      expect(esnEmoticonRegistry.getReducedEmoticons).to.have.been.calledOnce;
      expect(controller.emoticonsList).to.deep.equal(ReducedEmoji);
    });
  });

  describe('the getEmojiName function', function() {

    it('should remove the `:` in the begin of the search query', function() {
      var controller = initController();

      controller.emojiToSearch = ':abc';
      var emojiUpdated = controller.getEmojiName();

      expect(emojiUpdated).to.equal('abc');
    });

    it('should remove the `:` in the end of the search query', function() {
      var controller = initController();

      controller.emojiToSearch = 'abc:';
      var emojiUpdated = controller.getEmojiName();

      expect(emojiUpdated).to.equal('abc');
    });

    it('should remove the `:` in the search query', function() {
      var controller = initController();

      controller.emojiToSearch = ':abc:';
      var emojiUpdated = controller.getEmojiName();

      expect(emojiUpdated).to.equal('abc');
    });

    it('should update the search query to toLowerCase', function() {
      var controller = initController();

      controller.emojiToSearch = 'ABC';
      var emojiUpdated = controller.getEmojiName();

      expect(emojiUpdated).to.equal('abc');
    });
  });

  describe('the updateEmojiValue function', function() {

    it('should call the callback function and reset the input search value', function() {
      var controller = initController();

      controller.onEmojiSelected = sinon.spy();
      controller.emojiToSearch = ':NotEmpty:';
      controller.updateEmojiValue(controller.emojiToSearch);

      expect(controller.emojiToSearch).to.deep.equal('');
      expect(controller.onEmojiSelected).to.be.calledOnce;
    });

    it('should not call the callback function when the emojiToSearch is undefined', function() {
      var controller = initController();

      controller.onEmojiSelected = sinon.spy();
      controller.updateEmojiValue(controller.emojiToSearch);

      expect(controller.onEmojiSelected).to.not.have.been.called;
    });
  });
});
