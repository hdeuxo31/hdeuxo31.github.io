(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MainItemsListController', MainItemsListController);

    MainItemsListController.$inject = ['MenuDataService', 'itemsForCategory'];
    function MainItemsListController(MenuDataService, itemsForCategory) {
        var mainItemList = this;
        console.log('Resolved items in MainItemsListController:', itemsForCategory);
        mainItemList.items = itemsForCategory;
    }

})();