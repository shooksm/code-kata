(function() {
  'use strict';

  describe('babysitter.service', function(){

    var babysitterService, bedTime, bedTimeBeforeEarliestStart, bedTimeAfterLatestFinish, earlyStart, lateFinish,
      moment, rootScope, validFinishSameDay, validFinishNextDay, validStart;

    beforeEach(function () {
      module('kata.babysitter');
      inject(function (_babysitterService_, _moment_, $rootScope) {
        babysitterService = _babysitterService_;
        moment = _moment_;
        rootScope = $rootScope;
        earlyStart = moment({h:16, m:30});
        validStart = moment({h:17, m:45});
        lateFinish = moment().add(1, 'd').set('h', 5).set('m', 20);
        validFinishSameDay = moment().set('h', 23).set('m', 55);
        validFinishNextDay = moment().add(1, 'd').set('h', 2).set('m', 10);
        bedTime = moment({h:21, m:30});
        bedTimeBeforeEarliestStart = moment({h:16, m:30});
        bedTimeAfterLatestFinish = moment().add(1, 'd').set('h', 6);
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

    it('should reject the promise when the finish time is before the start time', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge(validFinishSameDay, validStart).then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('Finish time can not be before the start time');
    }));

    it('should reject the promise when the bed time is undefined', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge(validStart, validFinishSameDay).then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('The bed time was not supplied');
    }));

    it('should reject the promise when the bed time is before the earliest start time', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge(validStart, validFinishSameDay, bedTimeBeforeEarliestStart).then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('The bed time is before the earliest start time');
    }));

    it('should reject the promise when the bed time is after the latest finish time', inject(function() {
      var resolved, rejected;

      babysitterService.calculateCharge(validStart, validFinishSameDay, bedTimeAfterLatestFinish).then(
        function (value) {
          resolved = value;
        },
        function (value) {
          rejected = value;
        }
      );

      rootScope.$apply();

      expect(resolved).toBeUndefined();
      expect(rejected).toBe('The bed time is after the latest finish time');
    }));

    it('should have a hoursBetweenTimes method', inject(function () {
      expect(angular.isFunction(babysitterService.hoursBetweenTimes)).toBe(true);
    }));

    it('should return 0 hours when hoursBetweenTimes is called with a difference of 0 hours', inject(function() {
      var start, finish;
      start = finish = moment();

      expect(babysitterService.hoursBetweenTimes(start, finish, start, finish)).toBe(0);
    }));

    it('should return 2 hours when hoursBetweenTimes is called with a difference of 1h 30m', inject(function() {
      var start = moment(),
        finish = moment().add(1, 'h').add(30, 'm');

      expect(babysitterService.hoursBetweenTimes(start, finish, start, finish)).toBe(2);
    }));

    it('should return 0 hours when hoursBetweenTimes is called with a finish before min', inject(function() {
      var start = moment(),
        finish = moment().add(1, 'h'),
        min = moment().add(2, 'h'),
        max = moment().add(3, 'h');

      expect(babysitterService.hoursBetweenTimes(start, finish, min, max)).toBe(0);
    }));

    it('should return 0 hours when hoursBetweenTimes is called with a start after max', inject(function() {
      var start = moment().add(2, 'h'),
        finish = moment().add(3, 'h'),
        min = moment(),
        max = moment().add(1, 'h');

      expect(babysitterService.hoursBetweenTimes(start, finish, min, max)).toBe(0);
    }));

    it('should return 1 hours when hoursBetweenTimes is called with a start before min', inject(function() {
      var start = moment(),
        finish = moment().add(2, 'h'),
        min = moment().add(1, 'h'),
        max = moment().add(3, 'h');

      expect(babysitterService.hoursBetweenTimes(start, finish, min, max)).toBe(1);
    }));

    it('should return 1 hours when hoursBetweenTimes is called with a finish after max', inject(function() {
      var start = moment().add(1, 'h'),
        finish = moment().add(3, 'h'),
        min = moment(),
        max = moment().add(2, 'h');

      expect(babysitterService.hoursBetweenTimes(start, finish, min, max)).toBe(1);
    }));
  });
})();
