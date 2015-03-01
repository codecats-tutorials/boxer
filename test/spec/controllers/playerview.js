'use strict';

describe('Controller: PlayerviewCtrl', function () {

  // load the controller's module
  beforeEach(module('projApp'));

  var PlayerviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayerviewCtrl = $controller('PlayerviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
