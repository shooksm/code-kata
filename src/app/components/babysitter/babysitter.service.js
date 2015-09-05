(function() {
  'use strict';

  angular
    .module('kata.babysitter')
    .factory('babysitterService', babysitterService);

  /** @ngInject */
  function babysitterService($q) {
    var service = {
      calculateCharge: calculateCharge
    };

    return service;

    function calculateCharge() {
      return $q(calculatePromise);
    }

    function calculatePromise(resolve, reject) {
      if (true) {
        resolve('');
      } else {
        reject('');
      }
    }
  }
})();
