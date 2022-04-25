(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })

      // Categories list page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/category-list.template.html',
        controller: 'CategoryListController as catList',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories()
          }]
        }
      })

      // Item detail
      .state('mainList.itemDetail', {
        // url: '/item-detail/{itemId}',
        templateUrl: 'src/menuapp/templates/item-detail.template.html',
        controller: 'ItemDetailController as itemDetail',
        params: {
          itemId: null
        }
      });

  }

})();
