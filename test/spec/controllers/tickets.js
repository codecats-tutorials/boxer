'use strict';

describe('Controller: TicketsCtrl', function () {

  // load the controller's module
  beforeEach(module('projApp'));

  var TicketsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TicketsCtrl = $controller('TicketsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
