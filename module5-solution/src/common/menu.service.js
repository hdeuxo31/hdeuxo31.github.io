(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getFavoriteDish = function (favoriteDish) {
    // Extract letters and numbers using a regular expression
    var match = favoriteDish.match(/^([a-zA-Z]+)(\d+)$/);
    if (!match) {
      return Promise.reject("Invalid favoriteDish format");
    }

    var letters = match[1]; // Extract letters (one or more)
    var number = parseInt(match[2], 10) - 1; // Extract number and adjust index

    return $http.get(ApiPath + '/menu_items/' + letters + '/menu_items/' + number + '.json').then(function (response) {
      response.data.categoryShortName = letters;
      console.log("response.data = ", response.data);
      return response.data;
    });
  }
}

})();
