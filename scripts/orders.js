import { getProduct,loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11/esm/index.js';
import { formatCurency } from "./utils/money.js";
import { Cart } from "../data/cart-class.js";

//   let orders = orderFromBack || [
//   { 
//     id:"de98a5ea-5f4f-4581-8e5e-55af6f875231",
//     orderTime:"2025-04-18T02:28:57.176Z",

//     products:[{
//       productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//       quantity: 1,
//       estimatedDeliveryTime:'2025-04-25T02:28:57.176Z', 
//       variation:null
//     }, {
//       productId: 'e4f64a65-1377-42bc-89a5-e572d19252e2', 
//       quantity: 3, 
//       estimatedDeliveryTime: '2025-04-25T02:28:57.176Z', 
//       variation: null
//     }]
//   },{
//     id:"de98a5ea-5f4f-4581-8e5e-55af6f875232",
//     orderTime:"2025-04-18T02:28:57.176Z",

//     products:[{
//       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity: 2,
//       estimatedDeliveryTime:'2024-02-25T02:28:57.176Z', 
//       variation:null
//     }, {
//       productId: 'aad29d11-ea98-41ee-9285-b916638cac4a', 
//       quantity: 3, 
//       estimatedDeliveryTime: '2025-04-25T02:28:22.176Z', 
//       variation: null
//     }]
//   }
// ];
Cart.loadFromStorage();
console.log(orders);
console.log(Cart.cartItems);
loadPage();
async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = '';
  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');
    console.log(orderTimeString);


    ordersHTML += `
    <div class="order-container">

      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTimeString}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
      ${productsListHTML(order)}
      </div> 
    </div>  
    `
    
    function productsListHTML(order) {
      let productsListHTML = '';

      order.products.forEach((product) => {
      
        const mathchingProduct = getProduct(product.productId);
        productsListHTML += `
          <div class="product-image-container">
            <img src="${mathchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${mathchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=123&productId=456">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `
      });
      return productsListHTML;
    };
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

}