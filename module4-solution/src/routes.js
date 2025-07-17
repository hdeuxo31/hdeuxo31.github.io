(function () {
    'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/')

    // *** Set up UI states ***
    $stateProvider
    // Home page
    .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
    })

    // Categories page
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/main-categorieslist.template.html',
        controller: 'MainCategoriesListController as mainList',
        resolve: {
            items: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
    })

    .state('categories.itemDetail', {
        url: '/categorie-detail/{itemShortName}',
        templateUrl: 'src/menuapp/templates/main-itemslist.template.html',
        controller: 'MainItemsListController as mainItemList',
        resolve: {
            itemsForCategory: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                console.log("itemShortName in resolve:", $stateParams.itemShortName);
                if (!$stateParams.itemShortName) {
                    console.error("itemShortName is undefined or null");
                }
                return MenuDataService.getItemsForCategory($stateParams.itemShortName);
            }]
        }
    });
}


})();