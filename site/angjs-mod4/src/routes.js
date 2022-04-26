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

      // Category Item List 
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/menuapp/templates/category-items.template.html',
        controller: 'ItemListController as itemList',
        resolve: {
          items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
          }]

        }
      });

  }

})();
