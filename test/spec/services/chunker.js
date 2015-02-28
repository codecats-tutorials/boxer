'use strict';

describe('Service: chunker', function () {

  // load the service's module
  beforeEach(module('projApp'));

  // instantiate service
  var chunker;
  beforeEach(inject(function (_chunker_) {
    chunker = _chunker_;
  }));

  it('should do something', function () {
    expect(!!chunker).toBe(true);
  });

});
