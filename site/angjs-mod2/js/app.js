(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    function ShoppingListCheckOffService() {
        var toBuyItems = [{ name: "Cookies", amount: 10 }, { name: "Soda", amount: 5 }];
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
            ShoppingListCheckOffService.buyItem(index);
            // console.log(this.buyListIsEmpty())
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