(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['SignUpService'];
  function SignUpController(SignUpService) {
    var $ctrl = this;

    $ctrl.submit = function () {
      SignUpService.addUser({
        'firstName': $ctrl.user.firstName,
        'lastName': $ctrl.user.lastName,
        'email': $ctrl.user.email,
        'phoneNumber': $ctrl.user.phoneNumber,
        'favoriteDish': $ctrl.user.favoriteDish,
      });
    }
  }
})();
