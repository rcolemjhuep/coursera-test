(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);



    function ShoppingListCheckOffService() {
        var initialList = [
            { name: "Cookies", quantity: 10, pricePerItem: 0.5 },
            { name: "Sodas", quantity: 5, pricePerItem: 1.0 },
            { name: "Chips", quantity: 6, pricePerItem: 0.75 },
            { name: "Gulab Jamuns", quantity: 100, pricePerItem: 0.35 },
            { name: "Sandwiches", quantity: 3, pricePerItem: 3.0 }]
        var toBuyItems = initialList;
        var holdingItems = [];

        this.getToBuyItems = function () {
            return toBuyItems;
        }


        this.buyItem = function (index) {
            var boughtItem = toBuyItems.splice(index, 1)[0];
            holdingItems.push(boughtItem);
        }
        this.getHoldingItems = function () {
            return holdingItems;
        }

        this.toBuyItemsIsEmpty = function () {
            return toBuyItems.length == 0;
        }

        this.holdingItemsIsEmpty = function () {
            return holdingItems.length == 0;
        }
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.toBuyList = ShoppingListCheckOffService.getToBuyItems();
        this.buyItem = function (index) {
            // Just check to see if there is a real number here first, less of head ache later
            if (isNaN(ShoppingListCheckOffService.getToBuyItems()[index].quantity)) { return }

            ShoppingListCheckOffService.buyItem(index);
        }

        this.buyListIsEmpty = function () {
            return ShoppingListCheckOffService.toBuyItemsIsEmpty();
        }

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.holdingItemsList = ShoppingListCheckOffService.getHoldingItems();
        this.holdingItemsListIsEmpty = function () {
            return ShoppingListCheckOffService.holdingItemsIsEmpty();
        }
    }

})();