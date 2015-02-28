'use strict';

describe('Service: acl', function () {

  // load the service's module
  beforeEach(module('projApp'));

  // instantiate service
  var acl;
  beforeEach(inject(function (_acl_) {
    acl = _acl_;
  }));

  it('should do something', function () {
    expect(!!acl).toBe(true);
  });

});
