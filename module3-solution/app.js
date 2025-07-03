(function () {
    'use strict';
    var app = angular.module('NarrowItDownApp', []);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            scope: {
                items: '<',
                onRemove: '&'
            },
            templateUrl: 'foundItems.html'
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;
        
        list.term = "";
        list.foundItems = [];

        list.searchItem = function () {
            list.foundItems = [];
            MenuSearchService.getMatchedMenuItems(list.term).then(function (foundItems) {
                list.foundItems = foundItems;
                list.nothingFound = foundItems.length === 0;
            });
        }

        list.removeItem = function (index) {
            list.foundItems.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            console.log("searchTerm", searchTerm);
            return $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"),
            }).then(function (result) {
                var data = result.data;
                var allItems = [];
                // Extract all menu_items arrays and flatten them into allItems
                Object.keys(data).forEach(function (key) {
                    allItems = allItems.concat(data[key].menu_items);
                })
                console.log(allItems);

                // empty
                if (!searchTerm || searchTerm.trim() === "") {
                    return Promise.resolve([]);
                }

                // process result and only keep items that match
                var foundItems = allItems.filter(function (item) {
                    return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                })
                return foundItems;
            });
        };
    }

})();


