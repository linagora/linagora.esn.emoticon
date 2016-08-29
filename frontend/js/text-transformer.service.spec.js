/* global chai: false, sinon: false */
var expect = chai.expect;

describe('The esnEmoticonTextTransformer service', function() {
  'use strict';

  var esnEmoticonTextTransformer, esnEmoticonRegistryMock;

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
    inject(function(_esnEmoticonTextTransformer_) {
      esnEmoticonTextTransformer = _esnEmoticonTextTransformer_;
    });
  });

  beforeEach(function() {
    esnEmoticonRegistryMock.get = sinon.stub();
    esnEmoticonRegistryMock.get.withArgs('+1').returns({shortName: '+1'});
    esnEmoticonRegistryMock.get.withArgs('smiley').returns({shortName: 'smiley'});
  });

  it('should return an object', function() {
    expect(esnEmoticonTextTransformer).to.be.a('function');
  });

  it('should replace all instances of an emoticon with default esn-emoticon directive tags', function() {
    var inputString = ':+1: text :smiley: :+1:';
    var expected = '<esn-emoticon emoticon="+1"></esn-emoticon> text <esn-emoticon emoticon="smiley"></esn-emoticon> <esn-emoticon emoticon="+1"></esn-emoticon>';

    var outputString = esnEmoticonTextTransformer(inputString);

    expect(outputString).to.equal(expected);
  });

  it('should replace smileys even if there stuck', function() {
    var inputString = ':+1::smiley::+1:';
    var expected = '<esn-emoticon emoticon="+1"></esn-emoticon><esn-emoticon emoticon="smiley"></esn-emoticon><esn-emoticon emoticon="+1"></esn-emoticon>';

    var outputString = esnEmoticonTextTransformer(inputString);

    expect(outputString).to.equal(expected);
  });

  it('should replace smiley even if it is stuck with an other word', function() {
    var inputString = ':+1:lut';
    var expected = '<esn-emoticon emoticon="+1"></esn-emoticon>lut';

    var outputString = esnEmoticonTextTransformer(inputString);

    expect(outputString).to.equal(expected);
  });

  it('should support a replacement callback in second argument', function() {
    var inputString = ':+1: text :smiley: :+1:';
    var replaceFn = function(fullMatch, name) {
      return 'fullMatch:' + fullMatch + ',name:' + name;
    };
    var expected = 'fullMatch::+1:,name:+1 text fullMatch::smiley:,name:smiley fullMatch::+1:,name:+1';

    var outputString = esnEmoticonTextTransformer(inputString, replaceFn);

    expect(outputString).to.equal(expected);
  });

  it('should not replace if the emoticon code is unknown', function() {
    esnEmoticonRegistryMock.get = sinon.stub();
    esnEmoticonRegistryMock.get.withArgs(':linagora:').returns();

    var inputString = 'text :linagora: text';
    var expected = inputString;

    var outputString = esnEmoticonTextTransformer(inputString);

    expect(outputString).to.equal(expected);
    expect(esnEmoticonRegistryMock.get).to.have.been.calledOnce;
  });

});
