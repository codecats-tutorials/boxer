'use strict';

describe('Service: RestResource', function () {

  // load the service's module
  beforeEach(module('projApp'));

  // instantiate service
  var RestResource;
  beforeEach(inject(function (_RestResource_) {
    RestResource = _RestResource_;
  }));

  it('should do something', function () {
    expect(!!RestResource).toBe(true);
  });

});
