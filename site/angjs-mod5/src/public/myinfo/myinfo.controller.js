(function () {
  "use strict";

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['SignUpService', 'ApiPath', 'menuItem'];
  function MyInfoController(SignUpService, ApiPath, menuItem) {
    var $ctrl = this;
    $ctrl.basePath = ApiPath
    $ctrl.menuItem = menuItem

    $ctrl.getUser = function () {
      return SignUpService.getUser();
    }

    $ctrl.getMenuItem = function () {
      return $ctrl.menuItem;
    }
  }

})();
