(function() {
  'use strict';

  describe('babysitter.service', function(){

    var babysitterService, earlyStart, moment, rootScope;

    beforeEach(function () {
      module('kata.babysitter');
      inject(function (_babysitterService_, _moment_, $rootScope) {
        babysitterService = _babysitterService_;
        moment = _moment_;
        rootScope = $rootScope;
        earlyStart = moment({h:16, m:30});
      });
    });

    it('should have a calculateCharge method', inject(function() {
      expect(angular.isFunction(babysitterService.calculateCharge)).toBe(true);
    }));

    it('should return a promise when calculateCharge is called', inject(function() {
      expect(angular.isFunction(babysitterService.calculateCharge().then)).toBe(true);
    }));

    it('should reject the promise when the start time is undefined', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge().then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('The start moment was not supplied');
    }));

    it('should reject the promise when the start time is before 5PM', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge(earlyStart, moment()).then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('4:30 pm start is earlier than 5:00 pm');
    }));
  });
})();
