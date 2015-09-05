(function() {
  'use strict';

  angular
    .module('kata.babysitter')
    .factory('babysitterService', babysitterService);

  /** @ngInject */
  function babysitterService($q, forDisplay, startNoEarlierThan, finishNoLaterThan) {
    var service = {
      calculateCharge: calculateCharge
    }, startMoment, finishMoment, bedTimeMoment;

    return service;

    function calculateCharge(start, finish, bedTime) {
      startMoment = start;
      finishMoment = finish;
      bedTimeMoment = bedTime;
      return $q(calculatePromise);
    }

    function calculatePromise(resolve, reject) {
      if (!angular.isDefined(startMoment)) {
        return reject('The start time was not supplied');
      }

      if (startMoment.isBefore(startNoEarlierThan)) {
        return reject(startMoment.format(forDisplay) + ' start is earlier than ' + startNoEarlierThan.format(forDisplay));
      }

      if (!angular.isDefined(finishMoment)) {
        return reject('The finish time was not supplied');
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

      return resolve('');
    }
  }
})();
