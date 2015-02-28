'use strict';

describe('Filter: acl', function () {

  // load the filter's module
  beforeEach(module('projApp'));

  // initialize a new instance of the filter before each test
  var acl;
  beforeEach(inject(function ($filter) {
    acl = $filter('acl');
  }));

  it('should return the input prefixed with "acl filter:"', function () {
    var text = 'angularjs';
    expect(acl(text)).toBe('acl filter: ' + text);
  });

});
