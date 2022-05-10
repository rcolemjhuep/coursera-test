(function () {
  "use strict";

  angular.module('public')
    .service('SignUpService', SignUpService);


  SignUpService.$inject = ['$http', 'ApiPath', '$q'];
  function SignUpService($http, ApiPath, $q) {
    var service = this;

    service.user = null;

    service.setUser = function (user) {
      service.user = user
    }


    service.getUserFavoriteDish = function () {

      console.log(service.user)
      if (service.user == null) {
        return $q.resolve(null)
      }

      var url = `${ApiPath}/menu_items/${service.user.favoriteDish}.json`
      console.log(url)
      return $http.get(url).then(function (response) {
        return response.data;
      });
    };

    service.getUser = function () {
      return service.user
    }


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
