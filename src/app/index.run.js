(function() {
  'use strict';

  angular
    .module('babysitter')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
