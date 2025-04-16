import {cart} from '../../data/cart-class.js';
import {getProduct} from '../../data/products.js';
import { formatCurency } from '../utils/money.js';
// import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js'
import renderCheckoutHeader from './checkoutHeader.js'


export function renderOrderSummary() {
   let cartSummaryHTML = '';
   cart.cartItems.forEach((cartItem) => {
     const productId = cartItem.productId;
     const matchingProduct = getProduct(productId);

     const deliveryOptionId = cartItem.deliveryOptionId;
     const deliveryOption = getDeliveryOption(deliveryOptionId);    
     const dateString =  calculateDeliveryDate(deliveryOption);

     cartSummaryHTML += `
      <div 
       class="cart-item-container 
       js-cart-item-container-${matchingProduct.id}
       js-cart-item-container
      ">
         <div class="delivery-date">
           Delivery date: ${dateString}
         </div>
 
          <div class="cart-item-details-grid">
            <img class="product-image"
             src="${matchingProduct.image}">
 
            <div class="cart-item-details">
             <div class="product-name js-product-name-${matchingProduct.id}">
               ${matchingProduct.name}
             </div>
             <div class="product-price js-product-price-${matchingProduct.id}">
               ${matchingProduct.getPrice()}
             </div>

             <div class="
              product-quantity 
              js-product-quantity-${matchingProduct.id}
             ">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-update-list-id="${matchingProduct.id}">
                  Update
                </span>
                <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id} " maxlength="3" />
                <span class="link-primary save-link" data-save-link-id="${matchingProduct.id}">
                  Save
                </span>
                <span class=" delete-quantity-link link-primary js-delete-link 
                  js-delete-link-${matchingProduct.id} "
                  data-product-id="${matchingProduct.id}"
                  >
                  Delete
                </span>
              </div>
            </div>
             <span class="arror-quantity-massage dissapear-class">
               not a valid quantity
             </span>
          </div>
 
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>

      </div>
     `;
   });
 

   function deliveryOptionsHTML(matchingProduct,cartItem) {
      let html = '';
      deliveryOptions.forEach((deliveryOption) => {

      const dateString =  calculateDeliveryDate(deliveryOption)
    
      const priceString = deliveryOption.priceCents 
      === 0
      ? 'Free'
      : `$${formatCurency(deliveryOption.priceCents)} -`
  
      const isChecked = deliveryOption.id ===
      cartItem.deliveryOptionId;
  
      html += ` 
      <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}"
      >
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}"
        >
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
      })
   return html;
   };
 
   document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
 


   document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
        link.addEventListener('click', () => { 
          const productId = link.dataset.productId;

          //  const container = document.querySelector(
            //    `.js-cart-item-container-${productId}`
            //  );
            //  container.remove();

         

          cart.removeFromCart(productId);

         renderCheckoutHeader();
         renderOrderSummary();
         renderPaymentSummary();

       });
     });
       


  //  updateCartQuantity();
 
  //  function updateCartQuantity() {
  //    const quantity = calculateCartQuantity(cart);
 
  //    if (quantity === 0) {
  //      document.querySelector('.js-checkout-quantity')
  //    .innerHTML = `cart is empty`
  //    } else {
  //      document.querySelector('.js-checkout-quantity')
  //      .innerHTML = `${quantity} items`
  //    }
  //  };
 
   activateUpdateLink();
   function activateUpdateLink() {
     document.querySelectorAll('.js-update-link')
     .forEach((link) => {
 
       link.addEventListener('click', () => {
         const productId = link.dataset.updateListId;
 
         document.querySelector(`.js-cart-item-container-${productId}`)
         .classList.add('js-editing-quantity');   
       });
     });  
   }
 
   savingItemQuantity();
 
 
   function savingItemQuantity() {
     document.querySelectorAll('.save-link')
       .forEach((link) => {
         const productId = link.dataset.saveLinkId;
         const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
 
         link.addEventListener('click', () => {

           setNewQuantity(productId);
           renderCheckoutHeader();
         });
 
         quantityInput.addEventListener('keydown', (event) => {
           if (event.key === 'Enter') {
             setNewQuantity(productId);
             renderCheckoutHeader();
           }
         })
       }); 
   };
 
   function setNewQuantity(productId) {
     let newQuantity = Number(document.querySelector(`.js-cart-item-container-${productId} .quantity-input`)
     .value)
     
     document.querySelector(`.js-cart-item-container-${productId}`)
       .classList.remove('js-editing-quantity');

     if (newQuantity <= 0 || isNaN(newQuantity)) {
       newQuantity = 1;
    
     }
     cart.updateItemQuantity(productId,newQuantity);
     cart.saveToStorage();
    renderPaymentSummary();
    renderOrderSummary();

   }
 
 
 
   document.querySelectorAll('.js-delivery-option')
     .forEach((element) => {
       element.addEventListener('click', () => {
         const {productId, deliveryOptionId} = element.dataset;
         cart.updateDeliveryOption(productId,deliveryOptionId);
         renderOrderSummary();
         renderPaymentSummary();
       });
     });
}