(function () {
  "use strict";

  angular.module('public')
    .service('SignUpService', SignUpService);


  SignUpService.$inject = ['$http', 'ApiPath'];
  function SignUpService($http, ApiPath) {
    var service = this;

    service.users = []

    service.addUser = function (user) {
      service.users.push(user)
    }

    service.getUsers = function () {
      return service.users
    }

    // service.getCategories = function () {
    //   return $http.get(ApiPath + '/categories.json').then(function (response) {
    //     return response.data;
    //   });
    // };


    // service.getMenuItems = function (category) {
    //   var config = {};
    //   if (category) {
    //     config.params = { 'category': category };
    //   }

    //   return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
    //     return response.data;
    //   });
    // };

  }



})();
