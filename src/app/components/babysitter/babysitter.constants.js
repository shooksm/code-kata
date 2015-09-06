/* global moment:false */
(function() {
  'use strict';

  angular
    .module('kata.babysitter')
    .constant('moment', moment)
    .constant('forDisplay', 'h:mm a')
    .constant('startNoEarlierThan', moment({h:17, m:0, s: 0}))
    .constant('finishNoLaterThan', moment().add(1, 'd').set('h', 4).set('m', 0))
    .constant('midnight', moment().startOf('day').add(1, 'd'))
    .constant('beforeBedTimeRate', 12)
    .constant('bedTimeToMidnightRate', 8)
    .constant('afterMidnightRate', 16);

})();
