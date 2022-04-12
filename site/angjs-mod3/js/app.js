(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .directive('foundItems', FoundItemsDirective)
        .service("MenuSearchService", MenuSearchService);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }


    function NarrowItDownDirectiveController() {
        var list = this;

        list.cookiesInList = function () {
            for (var i = 0; i < list.items.length; i++) {
                var name = list.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }

            return false;
        };
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowList = this;
        var promise = MenuSearchService.getMenuItems()

        promise.then(function (items) {
            narrowList.found = items
        })

        narrowList.removeItem = function (itemIndex) {
            narrowList.found.splice(itemIndex, 1);
        };


    }

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this

        service.getMenuItems = function () {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
                // process result and only keep items that match
                return result.data.menu_items
            });
        }

        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
                // process result and only keep items that match
                return result.data.menu_items
            });
        }
    }
})();