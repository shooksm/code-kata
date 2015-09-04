(function() {
  'use strict';

  describe('main.controller', function(){

    beforeEach(module('kata'));

    it('should define a title and contain a value', inject(function($controller) {
      var vm = $controller('MainController');

      expect(vm.title).toBeDefined();
      expect(vm.title).toBe('Code Kata');
    }));
  });
})();
