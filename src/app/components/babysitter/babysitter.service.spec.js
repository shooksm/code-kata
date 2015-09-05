(function() {
  'use strict';

  describe('babysitter.service', function(){

    var babysitterService, earlyStart, lateFinish, moment, rootScope, validStart;

    beforeEach(function () {
      module('kata.babysitter');
      inject(function (_babysitterService_, _moment_, $rootScope) {
        babysitterService = _babysitterService_;
        moment = _moment_;
        rootScope = $rootScope;
        earlyStart = moment({h:16, m:30});
        validStart = moment({h:17, m:45});
        lateFinish = moment({h:5, m:20});
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
      expect(rejected).toBe('The start time was not supplied');
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

    it('should reject the promise when the finish time is undefined', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge(validStart).then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('The finish time was not supplied');
    }));

    it('should reject the promise when the finish time is after 4AM', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge(validStart, lateFinish).then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('5:20 am finish is later than 4:00 am');
    }));
  });
})();
