(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemChecker = this;

  itemChecker.itemsRequired = ShoppingListCheckOffService.getItems();
  itemChecker.transferItem = function (itemIndex) {
    try {
      
      ShoppingListCheckOffService.transferItem(itemIndex);
    } catch (error) {
      itemChecker.errorMessage = error.message;
    }
    
  };
  
}
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemChecked = this;
  itemChecked.itemsBought = ShoppingListCheckOffService.showItems();
  
}
function ShoppingListCheckOffService(){
var service = this;

var itemsRequired = [ {
                       itemName: 'Cookies',
                       quantity: 10
                       },
                       {
                        itemName: 'Chips',
                        quantity: 5
                       },
                       {
                       itemName: 'Cereal bars',
                       quantity: 8
                      },
                      {
                      itemName: 'Milk',
                      quantity: 5
                      },
                     {
                      itemName : 'Bread',
                      quantity: 3
                      }
                      ];
                      
var itemsBought = [];
 service.getItems = function () {
    return itemsRequired;
  }; 
  
 service.transferItem = function (itemIndex) {
  for(var i = 0; i <= itemsRequired.length; i++){
   var item = {
            itemName: itemsRequired[i].itemName,
            itemQuantity: itemsRequired[i].quantity
              };
                 
                 if((item.itemName == itemsRequired[itemIndex].itemName) && (itemsBought.length < 5)) {
                  itemsBought.push(item);
                  itemsRequired.splice(itemIndex, 1);
                 }
                 
                  if (itemsBought.length == 5 ) {
                    throw new Error("Everything is bought!");
                  }
    
    }
  };  
  service.showItems = function(){
    return itemsBought;
  } ;    
}

})();
