(function() {
  'use strict';

  angular
    .module('kata')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
