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
        var directiveController = this

        directiveController.foundListEmpty = function () {
            return (directiveController.found.length == 0)
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowList = this;

        // Description of item we are looking for
        narrowList.searchTerm = "";

        // Initially empty list
        narrowList.found = []


        // Remove item by index
        narrowList.removeItem = function (itemIndex) {
            narrowList.found.splice(itemIndex, 1);
        };

        // Search bar function for finding our search term
        narrowList.narrowFoundList = function () {

            if (narrowList.searchTerm === undefined || narrowList.searchTerm == "") {
                narrowList.found = []
            }
            else {
                MenuSearchService.getMatchedMenuItems(narrowList.searchTerm).then(function (items) {
                    narrowList.found = items;
                });
            }
        }
    }

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;

        // Get all menu items available
        service.getMenuItems = function () {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
                return result.data.menu_items;
            });
        }


        // Get all menu items where name or description match search term
        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
                // process result and only keep items that match
                return result.data.menu_items.filter(function (item) {
                    var lowerDescription = item.description.toLowerCase();
                    var lowerName = item.name.toLowerCase();
                    var lowerSearch = searchTerm.toLowerCase();
                    return lowerDescription.includes(lowerSearch) || lowerName.includes(lowerSearch);
                })
            });
        }
    }
})();