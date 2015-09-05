(function() {
  'use strict';

  angular
    .module('kata.babysitter')
    .factory('babysitterService', babysitterService);

  /** @ngInject */
  function babysitterService() {
    var service = {
      calculateCharge: calculateCharge
    };

    return service;

    function calculateCharge() {

    }
  }
})();
