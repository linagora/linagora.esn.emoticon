/* global chai: false, sinon: false */

var expect = chai.expect;

describe('The esnEmoticon directive', function() {
  'use strict';

  var element, scope, $compile, esnEmoticonRegistryMock;

  function compileDirective(emoticonId) {
    var html = '<esn-emoticon emoticon="' + emoticonId + '"></esn-emoticon>';

    element = $compile(html)(scope);
    scope.$digest();
  }

  beforeEach(function() {
    esnEmoticonRegistryMock = {
      addCollection: function() {}
    };

    angular.mock.module('jadeTemplates');
    angular.mock.module('linagora.esn.emoticon');
    angular.mock.module(function($provide) {
      $provide.value('esnEmoticonRegistry', esnEmoticonRegistryMock);
    });

    inject(function(_$compile_, _$rootScope_) {
      scope = _$rootScope_.$new();
      $compile = _$compile_;
    });
  });

  afterEach(function() {
    if (element) {
      element.remove();
    }
    element = null;
    scope = null;
  });

  it('should send back the img template for the emoticon', function() {
    var emoticon = 'smiley';
    var lnk = '/foo/bar/baz.png';

    esnEmoticonRegistryMock.getEmoticonURI = sinon.stub().returns(lnk);
    compileDirective(emoticon);

    expect(element).to.have.length(1);

    var htmlElement = element.get(0);

    expect(htmlElement.nodeName).to.equal('IMG');
    expect(htmlElement.attributes['ng-src'].nodeValue).to.equal(lnk);
    expect(htmlElement.attributes.title.nodeValue).to.equal(emoticon);
    expect(esnEmoticonRegistryMock.getEmoticonURI).to.have.been.calledWith(emoticon);
  });

});
