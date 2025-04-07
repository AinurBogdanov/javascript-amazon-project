export const cart = [];

  export function addToCart(productId) {
    let matchingItem;


    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    console.log(productId) 

    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`)
    .value);
    
    document.querySelector(`.js-quantity-selector-${productId}`)
    .value = 1;


    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
      });
    }
  }