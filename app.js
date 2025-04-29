(function () {
'use strict';
var app = angular.module('LaunchMenu', [])
    
app.controller('LaunchMenuController', function ($scope) {
    $scope.listOfItem = "";
    $scope.message = "";

    $scope.handledClick = function () {
        // trim the input string and check if it's empty
        if ($scope.listOfItem.trim() === '') {
            $scope.message = "Please enter data first";
            $scope.messageClass = "message-ko";
            return;
        }

        // Split the input string by commas
        var items = $scope.listOfItem.split(',')

        // Filter out empty strings and trim whitespace
        var nonEmptyItems = items.filter(function (item) {
            return item.trim() !== '';
        });

        // Count the number of non-empty items
        var itemCount = nonEmptyItems.length;

        // Update the message with the count
        if (itemCount === 0) {
            $scope.message = "Please enter data first";
            $scope.messageClass = "message-ko";
        } else if (itemCount <= 3) {
            $scope.message = "Enjoy!";
            $scope.messageClass = "message-ok";

        } else {
            $scope.message = "Too much!";
            $scope.messageClass = "message-ok";
        }
    };
});


})();
