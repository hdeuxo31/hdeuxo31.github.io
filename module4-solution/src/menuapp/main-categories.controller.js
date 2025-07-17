(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MainCategoriesListController', MainCategoriesListController);

    MainCategoriesListController.$inject = ['MenuDataService', 'items'];
    function MainCategoriesListController(MenuDataService, items) {
        var mainlist = this;
        console.log('Resolved items in MainCategoriesListController:', items); // Debugging line
        mainlist.items = items;
    }

})();