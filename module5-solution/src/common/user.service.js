(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


function UserService() {
  var userService = this;

  var user = {};

  userService.createUser = function (newUser) {
      user = newUser;
      console.log("new user : ", user)
  };

  userService.getUser = function () {
      return user;
  };
}

})();
