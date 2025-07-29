(function () {
    'use strict';
    angular.module('public')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$scope','$timeout','MenuService', 'UserService']
    function RegistrationController($scope,$timeout,MenuService, UserService) {
        var reg = this;

        reg.user = {};
        reg.completed = false;


        reg.submit = function () {
            console.log("click on submit button")
            UserService.createUser(reg.user);
            reg.completed = true;
        };

        reg.validateFavoriteDish = function () {
            if (!reg.user.favorite_dish) {
                // Reset validity if input empty
                reg.favoriteDishValid = false;
                return;
            }

            MenuService.getFavoriteDish(reg.user.favorite_dish)
                .then(function (data) {
                    reg.favoriteDishValid = !!data;
                    console.log("favorite dish found = ", data);
                    console.log("reg.favoriteDishValid = ", reg.favoriteDishValid );
                })
                .catch(function (error) {
                    // Use $timeout to ensure the view updates
                    $timeout(function () {
                        reg.favoriteDishValid = false;
                        //console.error("Error fetching favorite dish: ", error);
                        console.log("reg.favoriteDishValid = ", reg.favoriteDishValid );
                    })
                })
        };

        // Surveiller les changements du champ favoriteDish
        $scope.$watch(function () {
            return reg.user.favorite_dish;
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                reg.validateFavoriteDish();
            }
        });
    }
})();