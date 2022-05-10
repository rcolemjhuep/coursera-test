(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['SignUpService'];
  function SignUpController(SignUpService) {
    var $ctrl = this;

    $ctrl.user = null;

    $ctrl.submit = function () {
      SignUpService.setUser($ctrl.user);
    }
  }
})();
