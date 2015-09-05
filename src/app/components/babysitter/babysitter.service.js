(function() {
  'use strict';

  angular
    .module('kata.babysitter')
    .factory('babysitterService', babysitterService);

  /** @ngInject */
  function babysitterService($q, forDisplay, startNoEarlierThan) {
    var service = {
      calculateCharge: calculateCharge
    }, startMoment, finishMoment;

    return service;

    function calculateCharge(start, finish) {
      startMoment = start;
      finishMoment = finish;
      return $q(calculatePromise);
    }

    function calculatePromise(resolve, reject) {
      if (!angular.isDefined(startMoment)) {
        return reject('The start moment was not supplied');
      }

      if (startMoment.isBefore(startNoEarlierThan)) {
        return reject(startMoment.format(forDisplay) + ' start is earlier than ' + startNoEarlierThan.format(forDisplay));
      }

      return resolve('');
    }
  }
})();
