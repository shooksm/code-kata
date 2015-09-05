/* global moment:false */
(function() {
  'use strict';

  angular
    .module('kata.babysitter')
    .constant('moment', moment)
    .constant('forDisplay', 'h:mm a')
    .constant('startNoEarlierThan', moment({h:17, m:0}));

})();
