/* global chai: false, sinon: false */
var expect = chai.expect;

describe('The esnEmoticonify filter', function() {
  'use strict';

  var esnEmoticonify, esnEmoticonRegistryMock;
  var lnk1 = '/emoticon/+1.png';
  var lnk2 = '/emoticon/smiley.png';

  beforeEach(function() {
    esnEmoticonRegistryMock = {
      addCollection: function() {},
      get: function() {},
      getEmoticonURI: function() {}
    };
    angular.mock.module('linagora.esn.emoticon');
    angular.mock.module(function($provide) {
      $provide.value('esnEmoticonRegistry', esnEmoticonRegistryMock);
    });
    inject(function($filter) {
      esnEmoticonify = $filter('esnEmoticonify');
    });
  });

  beforeEach(function() {
    esnEmoticonRegistryMock.getEmoticonURI = sinon.stub();
    esnEmoticonRegistryMock.getEmoticonURI.withArgs('+1').returns(lnk1);
    esnEmoticonRegistryMock.getEmoticonURI.withArgs('smiley').returns(lnk2);

    esnEmoticonRegistryMock.get = sinon.stub();
    esnEmoticonRegistryMock.get.withArgs('+1').returns({shortName: '+1'});
    esnEmoticonRegistryMock.get.withArgs('smiley').returns({shortName: 'smiley'});
  });

  it('should transform emoticon codes to img tags', function() {
    var inputString = ':+1: text :smiley: :+1:';
    var expected = '<img src="' + lnk1 + '" title="+1"> text <img src="' + lnk2 + '" title="smiley"> <img src="' + lnk1 + '" title="+1">';

    expect(esnEmoticonify(inputString)).to.equal(expected);
  });

  it('should add additional properties to img tags', function() {
    var inputString = ':+1: text :smiley:';
    var expected = '<img src="' + lnk1 + '" title="+1" class="bold" dump="true"> text <img src="' + lnk2 + '" title="smiley" class="bold" dump="true">';

    expect(esnEmoticonify(inputString, {class: 'bold', dump: 'true'})).to.equal(expected);
  });

});
