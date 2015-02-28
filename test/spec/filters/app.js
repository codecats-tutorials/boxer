'use strict';

describe('Filter: app', function () {

  // load the filter's module
  beforeEach(module('projApp'));

  // initialize a new instance of the filter before each test
  var app;
  beforeEach(inject(function ($filter) {
    app = $filter('app');
  }));

  it('should return the input prefixed with "app filter:"', function () {
    var text = 'angularjs';
    expect(app(text)).toBe('app filter: ' + text);
  });

});
