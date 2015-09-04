(function() {
  'use strict';

  angular
    .module('kata')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

    vm.title = 'Code Kata';
  }
})();
