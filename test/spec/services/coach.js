'use strict';

describe('Service: coach', function () {

  // load the service's module
  beforeEach(module('projApp'));

  // instantiate service
  var coach;
  beforeEach(inject(function (_coach_) {
    coach = _coach_;
  }));

  it('should do something', function () {
    expect(!!coach).toBe(true);
  });

});
