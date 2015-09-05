(function() {
  'use strict';

  describe('babysitter.service', function(){

    var babysitterService;

    beforeEach(function () {
      module('kata.babysitter');
      inject(function (_babysitterService_) {
        babysitterService = _babysitterService_;
      });
    });

    it('should have a calculateCharge method', inject(function() {
      expect(angular.isFunction(babysitterService.calculateCharge)).toBe(true);
    }));

    it('should return a promise when calculateCharge is called', inject(function() {
      expect(angular.isFunction(babysitterService.calculateCharge().then)).toBe(true);
    }));
  });
})();
