/* global chai: false */
var expect = chai.expect;

describe('The esnEmoticon directive', function() {
  'use strict';
  var element, scope, $compile, esnEmoticonConstants;

  function compileDirective(emoticonId) {
    var html = '<esn-emoticon emoticon="' + emoticonId + '"></esn-emoticon>';

    element = $compile(html)(scope);
    scope.$digest();
  }

  beforeEach(function() {
    angular.mock.module('jadeTemplates');
    angular.mock.module('linagora.esn.emoticon');

    inject(function(_$compile_, _$rootScope_,  _esnEmoticonConstants_) {
      scope = _$rootScope_.$new();
      $compile = _$compile_;
      esnEmoticonConstants = _esnEmoticonConstants_;
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
    compileDirective('smiley');
    var lnk = esnEmoticonConstants.BASE_PATH + 'smiley' + esnEmoticonConstants.SUFFIX;

    expect(element).to.have.length(1);

    var htmlElement = element.get(0);

    expect(htmlElement.nodeName).to.equal('IMG');
    expect(htmlElement.attributes['ng-src'].nodeValue).to.equal(lnk);
    expect(htmlElement.attributes.title.nodeValue).to.equal('smiley');
  });

});
