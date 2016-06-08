/* global chai: false */
var expect = chai.expect;

describe('The esnEmoticonify filter', function() {
  'use strict';

  var esnEmoticonify, esnEmoticonConstants;

  beforeEach(function() {
    angular.mock.module('linagora.esn.emoticon');
    inject(function($filter, _esnEmoticonConstants_) {
      esnEmoticonify = $filter('esnEmoticonify');
      esnEmoticonConstants = _esnEmoticonConstants_;
    });
  });

  it('should transform emoticon codes to img tags', function() {
    var inputString = ':+1: text :smiley: :+1:';

    var lnk1 = esnEmoticonConstants.BASE_PATH + '+1' + esnEmoticonConstants.SUFFIX;
    var lnk2 = esnEmoticonConstants.BASE_PATH + 'smiley' + esnEmoticonConstants.SUFFIX;

    var expected = '<img src="' + lnk1 + '" title="+1"> text <img src="' + lnk2 + '" title="smiley"> <img src="' + lnk1 + '" title="+1">';

    expect(esnEmoticonify(inputString)).to.equal(expected);
  });

  it('should add additional properties to img tags', function() {
    var inputString = ':+1: text :smiley:';

    var lnk1 = esnEmoticonConstants.BASE_PATH + '+1' + esnEmoticonConstants.SUFFIX;
    var lnk2 = esnEmoticonConstants.BASE_PATH + 'smiley' + esnEmoticonConstants.SUFFIX;

    var expected = '<img src="' + lnk1 + '" title="+1" class="bold" dump="true"> text <img src="' + lnk2 + '" title="smiley" class="bold" dump="true">';

    expect(esnEmoticonify(inputString, {class: 'bold', dump: 'true'})).to.equal(expected);
  });

});
