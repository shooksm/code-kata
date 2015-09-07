(function() {
  'use strict';

  angular
    .module('kata.babysitter')
    .factory('babysitterService', babysitterService);

  /** @ngInject */
  function babysitterService($q, forDisplay, startNoEarlierThan, finishNoLaterThan, beforeBedTimeRate, bedTimeToMidnightRate, afterMidnightRate, midnight, moment) {
    var service = {
      calculateCharge: calculateCharge,
      hoursBetweenTimes: hoursBetweenTimes
    }, startMoment, finishMoment, bedTimeMoment;

    return service;

    /**
     * Establishes start, finish and bed times to the service and returns back a promise that will resolve with the
     * total charge for the night or reject if there are issues with the start, finish and/or bed time properties.
     * @param start {moment}
     * @param finish {moment}
     * @param bedTime {moment}
     * @returns {promise}
     */
    function calculateCharge(start, finish, bedTime) {
      startMoment = start;
      finishMoment = finish;
      bedTimeMoment = bedTime;
      return $q(calculatePromise);
    }

    /**
     * Handles validating start, finish and bed time. Performs the rate calculation.
     * @param resolve {function}
     * @param reject {function}
     * @returns {function}
     */
    function calculatePromise(resolve, reject) {
      if (!angular.isDefined(startMoment)) {
        return reject('The start time was not supplied');
      }

      if (!moment.isMoment(startMoment)) {
        return reject('The start time is not a Moment');
      }

      if (startMoment.isBefore(startNoEarlierThan)) {
        return reject(startMoment.format(forDisplay) + ' start is earlier than ' + startNoEarlierThan.format(forDisplay));
      }

      if (!angular.isDefined(finishMoment)) {
        return reject('The finish time was not supplied');
      }

      if (!moment.isMoment(finishMoment)) {
        return reject('The finish time is not a Moment');
      }

      if (finishMoment.isAfter(finishNoLaterThan)) {
        return reject(finishMoment.format(forDisplay) + ' finish is later than ' + finishNoLaterThan.format(forDisplay));
      }

      if (finishMoment.isBefore(startMoment)) {
        return reject('Finish time can not be before the start time');
      }

      if (!angular.isDefined(bedTimeMoment)) {
        return reject('The bed time was not supplied');
      }

      if (!moment.isMoment(bedTimeMoment)) {
        return reject('The bed time is not a Moment');
      }

      if (bedTimeMoment.isBefore(startNoEarlierThan)) {
        return reject('The bed time is before the earliest start time');
      }

      if (bedTimeMoment.isAfter(finishNoLaterThan)) {
        return reject('The bed time is after the latest finish time');
      }

      return resolve(
        hoursBetweenTimes(startMoment, finishMoment, startNoEarlierThan, bedTimeMoment) * beforeBedTimeRate +
        hoursBetweenTimes(startMoment, finishMoment, bedTimeMoment, midnight) * bedTimeToMidnightRate +
        hoursBetweenTimes(startMoment, finishMoment, midnight, finishNoLaterThan) * afterMidnightRate
      );
    }

    /**
     * Responsible for calculating the number of hours between two bounds. In the case of this application the bounds
     * are the time the baby sitter started (S) and finished (F) watching kids compared against subsets of the night
     * they worked like start time to bed time or bed time to midnight represented as min (N) and max (X).
     *
     * Scenario #1 - Start and Finish are before the Min and Max bounds return 0 hours
     * S      F    N           X
     * |-----|-----|-----|-----|-----|-----|
     *
     * Scenario #2 - Start and Finish are after the Min and Max bounds return 0 hours
     * N           X   S          F
     * |-----|-----|-----|-----|-----|-----|
     *
     * Scenario #3 - Start is after Min, use Start to compare the difference
     * S           N     F     X
     * |-----|-----|-----|-----|-----|-----|
     *
     * Scenario #4 - Start is before Min, use Min to compare the difference
     * N           S     F     X
     * |-----|-----|-----|-----|-----|-----|
     *
     * Scenario #5 - Finish is before Max, use Finish to compare the difference
     *       N     S           F     X
     * |-----|-----|-----|-----|-----|-----|
     *
     * Scenario #6 - Finish is after Max, use Max to compare the difference
     *       N     S           X     F
     * |-----|-----|-----|-----|-----|-----|
     *
     * @param start {moment}
     * @param finish {moment}
     * @param min {moment}
     * @param max {moment}
     * @returns {number}
     */
    function hoursBetweenTimes(start, finish, min, max) {
      var comparisonStart, comparisonFinish;

      // Covers Scenario #1
      if (finish.isBefore(min)) {
        return 0;
      }

      // Covers Scenario #2
      if (start.isAfter(max)) {
        return 0;
      }

      if (start.isAfter(min)) {
        // Covers Scenario #3
        comparisonStart = start;
      } else {
        // Covers Scenario #4
        comparisonStart = min;
      }

      if (finish.isBefore(max)) {
        // Covers Scenario #5
        comparisonFinish = finish;
      } else {
        // Covers Scenario #6
        comparisonFinish = max;
      }

      return Math.ceil(comparisonFinish.diff(comparisonStart, 'h', true));
    }
  }
})();
