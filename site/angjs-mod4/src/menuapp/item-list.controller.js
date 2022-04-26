(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemListController', ItemListController);


  ItemListController.$inject = ['items', '$stateParams'];
  function ItemListController(items, $stateParams) {
    var controller = this;
    controller.items = items;
    controller.short_name = $stateParams.categoryShortName
  }

})();
