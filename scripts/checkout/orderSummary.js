import { calculateCartQuantity, cart, removeFromCart,
  updateItemQuantity, saveToStorage, updateDeliveryOption
 } from '../../data/cart.js';
 import { products,getProduct} from '../../data/products.js';
 import { formatCurency } from '../utils/money.js';
 import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
 
 import {deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
 
 const today = dayjs();
 
 const deliveryDate = today.add(7, 'days');
  console.log(deliveryDate.format('dddd, MMMM D'));
 
export function renderOrderSummary() {
   let cartSummaryHTML = '';
 
   cart.forEach((cartItem) => {
     const productId = cartItem.productId;
     
     const matchingProduct = getProduct(productId);

     const deliveryOptionId = cartItem.deliveryOptionId;
 
     const deliveryOption = getDeliveryOption(deliveryOptionId);    
 
     const deliveryDate = today.add(
       deliveryOption.deliveryDays,
       'days'
     );
     const dateString = deliveryDate.format(
       'dddd, MMMM D'
     );
       
     cartSummaryHTML += `
       <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
         <div class="delivery-date">
           Delivery date: ${dateString}
         </div>
 
         <div class="cart-item-details-grid">
           <img class="product-image"
             src="${matchingProduct.image}">
 
           <div class="cart-item-details">
             <div class="product-name">
               ${matchingProduct.name}
             </div>
             <div class="product-price">
               $${formatCurency(matchingProduct.priceCents)}
             </div>
             <div class="product-quantity">
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
               <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${matchingProduct.id}">
                 Delete
               </span>
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
       </div>
     `;
   });
 
   function deliveryOptionsHTML(matchingProduct,cartItem) {
 
     let html = '';
   deliveryOptions.forEach((deliveryOption) => {
     const today = dayjs();
     const deliveryDate = today.add(
       deliveryOption.deliveryDays,
       'days'
     );
     const dateString = deliveryDate.format(
       'dddd, MMMM D'
     );
 
 
     const priceString = deliveryOption.priceCents 
     === 0
       ? 'Free'
       : `$${formatCurency(deliveryOption.priceCents)} -`
 
       const isChecked = deliveryOption.id ===
       cartItem.deliveryOptionId;
 
       
     html += ` 
       <div class="delivery-option js-delivery-option"
       data-product-id="${matchingProduct.id}"
       data-delivery-option-id="${deliveryOption.id}">
         <input type="radio"
           ${isChecked ? 'checked' : ''}
           class="delivery-option-input"
           name="delivery-option-${matchingProduct.id}">
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
 
         removeFromCart(productId);
 
         const container = document.querySelector(
           `.js-cart-item-container-${productId}`
         );
 
         container.remove();
 
         updateCartQuantity();
       });
     });
       
   updateCartQuantity();
 
   function updateCartQuantity() {
     const quantity = calculateCartQuantity(cart);
 
     if (quantity === 0) {
       document.querySelector('.js-checkout-quantity')
     .innerHTML = `cart is empty`
     } else {
       document.querySelector('.js-checkout-quantity')
       .innerHTML = `${quantity} items`
     }
   };
 
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
         });
 
         quantityInput.addEventListener('keydown', (event) => {
           if (event.key === 'Enter') {
             setNewQuantity(productId);
           }
         })
       }); 
   };
 
   function setNewQuantity(productId) {
     let newQuantity = Number(document.querySelector(`.js-cart-item-container-${productId} .quantity-input`)
     .value)
     
     document.querySelector(`.js-cart-item-container-${productId}`)
       .classList.remove('js-editing-quantity');
 
     const quantityLabel = document.querySelector(`.js-cart-item-container-${productId} .quantity-label`)
 
     if (newQuantity <= 0 || isNaN(newQuantity)) {
       quantityLabel.innerHTML = 1;
       newQuantity = 1;
       document.querySelector(`.js-cart-item-container-${productId} .arror-quantity-massage`)
       .classList.remove('dissapear-class');
     } else {
       document.querySelector(`.js-cart-item-container-${productId} .arror-quantity-massage`)
       .classList.add('dissapear-class');
     }
 
     updateItemQuantity(productId,newQuantity);
 
     saveToStorage();
     updateCartQuantity();
 
     document.querySelector(`.js-cart-item-container-${productId} .quantity-label`)
     .innerHTML = newQuantity;
   }
 
 
 
   document.querySelectorAll('.js-delivery-option')
     .forEach((element) => {
       element.addEventListener('click', () => {
         const {productId, deliveryOptionId} = element.dataset;
         updateDeliveryOption(productId,deliveryOptionId);
         renderOrderSummary();
       });
     });
}