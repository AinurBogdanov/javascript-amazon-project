import {getDeliveryOption} from "./deliveryOptions.js";

export class Cart {
  cartItems = undefined;
  #localStorageKey = undefined;

  constructor(localStorageKey) {
  this.localStorageKey = localStorageKey;
  this.#loadFromStorage();
  };

  #loadFromStorage() {
    this.cartItems  = JSON.parse(localStorage.getItem(this.localStorageKey)) || 
  [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }];
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    const quantityElement =  document.querySelector(`.js-quantity-selector-${productId}`)
  
     const quantity = quantityElement ? Number(quantityElement.value)
      || 1 : 1;
     
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart (productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      } 
    });
    if (!matchingItem) return;
  
   if(!getDeliveryOption(deliveryOptionId)) return;
    
    matchingItem.deliveryOptionId = deliveryOptionId;
  
   this.saveToStorage();
  };

  updateItemQuantity(productId,newQuantity)  {
    this.cartItems.forEach((item) => {
      if (item.productId === productId ) {
        item.quantity = newQuantity;
      }
    })
  }

};

export const cart = new Cart('cart.oop'); 
 
// const businessCart = new Cart('cart-business');
 

export function calculateCartQuantity(cart) {
  let cartQuantity = 0;
  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
   });
  return cartQuantity;
}
