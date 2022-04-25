(function () {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService);


  MenuDataService.$inject = ['$http']
  function MenuDataService($http) {
    var service = this;



    service.getAllCategories = function () {
      return $http.get('https://davids-restaurant.herokuapp.com/categories.json').then(function (result) {
        return result.data
      })
    }


    service.getCategories = function () {
      return service.categories
    }


    service.getItemsForCategory = function (categoryShortName) {
      return $http.get(`https://davids-restaurant.herokuapp.com/menu_items.json?category=${categoryShortName}`).then(function (result) {
        return result.data.menu_items
      })
    }


    var promise = service.getAllCategories();
    promise.then(function (result) {
      service.categories = result
    })

  }

})();
