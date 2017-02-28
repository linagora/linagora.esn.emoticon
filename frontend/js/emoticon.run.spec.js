/* global chai: false */
var expect = chai.expect;

describe.skip('The esnEmoticon run', function() {
  'use strict';

  var esnEmoticonRegistry;

  beforeEach(function() {
    angular.mock.module('linagora.esn.emoticon');
    inject(function(_esnEmoticonRegistry_) {
      esnEmoticonRegistry = _esnEmoticonRegistry_;
    });
  });

  it('should inject default emoticons', function() {
    expect(esnEmoticonRegistry.get('+1')).to.exist;
  });
});
