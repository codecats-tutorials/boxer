'use strict';

describe('Controller: CoachesCtrl', function () {

  // load the controller's module
  beforeEach(module('projApp'));

  var CoachesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoachesCtrl = $controller('CoachesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
