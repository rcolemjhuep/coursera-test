(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
    function ToBuyController($scope) {
        $scope.checkIfTooMuch = function () {
            var foodList = $scope.foodList;

            if (foodList === undefined || foodList == "") {
                $scope.output = "Please enter data first";
                $scope.outputClassText = "badInput";
                $scope.outputClassBorder = "badBorder";
                return;
            }

            var foodArray = foodList.split(",");
            var counter = 0;
            foodArray.forEach(function (element) {
                if (element.trim() != "") {
                    counter++;
                }
            })
            $scope.output = (counter < 4) ? "Enjoy!" : "Too Much!";
            $scope.outputClassText = "goodInput";
            $scope.outputClassBorder = "goodBorder";
        };
    }
    ToBuyController.$inject = ['$scope'];
    function AlreadyBoughtController($scope) {
        $scope.checkIfTooMuch = function () {
            var foodList = $scope.foodList;

            if (foodList === undefined || foodList == "") {
                $scope.output = "Please enter data first";
                $scope.outputClassText = "badInput";
                $scope.outputClassBorder = "badBorder";
                return;
            }

            var foodArray = foodList.split(",");
            var counter = 0;
            foodArray.forEach(function (element) {
                if (element.trim() != "") {
                    counter++;
                }
            })
            $scope.output = (counter < 4) ? "Enjoy!" : "Too Much!";
            $scope.outputClassText = "goodInput";
            $scope.outputClassBorder = "goodBorder";
        };
    }
    AlreadyBoughtController.$inject = ['$scope'];
})();