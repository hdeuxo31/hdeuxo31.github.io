(function () {
    'use strict';
    angular.module('public')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['MenuService', 'UserService']
    function UserInfoController(MenuService, UserService) {
        var userCtrl = this;

        var user = UserService.getUser();
        console.log("UserInfoController user : ", user);

        if (!user || Object.keys(user).length === 0) {
            console.log("No user registered.");
            userCtrl.userUndefined = true;
        } else {
            console.log("UserInfoController user is Ok")
            userCtrl.userUndefined = false;
            userCtrl.user = user;
            console.log("UserInfoController user : ", userCtrl.user);

            MenuService.getFavoriteDish(userCtrl.user.favorite_dish)
                .then(function (favoriteDish) {
                    userCtrl.favoriteDish = favoriteDish;
                    console.log("UserInfoController favoriteDish : ", userCtrl.favoriteDish);
                })
                .catch(function (error) {
                    console.log("Error fetching favorite dish: ", error);
                })


        }
    }
})();