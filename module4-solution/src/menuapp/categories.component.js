(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'src/menuapp/templates/categoriesList.template.html',
            bindings: {
                items: '<'
            }
        });

})();