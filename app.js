(function () {
'use strict';
var app = angular.module('ShoppingListCheckOff', []);

app.controller('ToBuyController', ToBuyController);
app.controller('AlreadyBoughtController', AlreadyBoughtController);
app.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var itemToBuy = this;

    itemToBuy.items = ShoppingListCheckOffService.getItems();
    console.log('itemToBuy = ', itemToBuy.items);

    itemToBuy.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    }


}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var itemAlreadyBought = this;

    itemAlreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
    console.log('itemToBought = ', itemAlreadyBought.items);
}

function ShoppingListCheckOffService() {
    var service = this;

    // List of items
    var startItem = [
        { name: "cookies", quantity: 10 },
        { name: "coca-cola", quantity: 20 },
        { name: "banana", quantity: 5 },
        { name: "strawberry", quantity: 3 },
        { name: "pear", quantity: 7 }
    ]

    var itemAlreadyBought = [];

    service.getItems = function () {
        return startItem;
    }

    service.buyItem = function(itemIndex) {
        var item = startItem[itemIndex];
        itemAlreadyBought.push(item);
        startItem.splice(itemIndex, 1);
    }

    service.getBoughtItems = function () {
        return itemAlreadyBought;
    }
}

})();
