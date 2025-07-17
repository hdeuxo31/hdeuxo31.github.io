(function () {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function () {
            console.log("getAllCategories");
            return $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json"),
            }).then(function (result) {
                var data = result.data;
                console.log('Categories data fetched: ', data);
                return data;
            });
        };

        service.getItemsForCategory = function (categoryShortName) {
            console.log("getItemsForCategory : categoryShortName = ", categoryShortName);
            if (!categoryShortName) {
                console.error("categoryShortName is undefined or null");
            } else {
                console.log("categoryShortName = ", categoryShortName);
            }
            return $http({
                method: "GET",
                url: `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}.json`,
            }).then(function (result) {
                var data = result.data.menu_items;
                console.log('les items de la categorie :', data);
                return data;
            })
        };
    }


})();