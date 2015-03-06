'use strict';

describe('Filter: organization', function () {

  // load the filter's module
  beforeEach(module('projApp'));

  // initialize a new instance of the filter before each test
  var organization;
  beforeEach(inject(function ($filter) {
    organization = $filter('organization');
  }));

  it('should return the input prefixed with "organization filter:"', function () {
    var text = 'angularjs';
    expect(organization(text)).toBe('organization filter: ' + text);
  });

});
