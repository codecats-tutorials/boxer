'use strict';

describe('Filter: fields', function () {

  // load the filter's module
  beforeEach(module('projApp'));

  // initialize a new instance of the filter before each test
  var fields;
  beforeEach(inject(function ($filter) {
    fields = $filter('fields');
  }));

  it('should return the input prefixed with "fields filter:"', function () {
    var text = 'angularjs';
    expect(fields(text)).toBe('fields filter: ' + text);
  });

});
