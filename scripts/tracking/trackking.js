import { getOrderById } from '../../data/orders.js';
import { getProduct } from '../../data/products.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';

export function renderTrakingHTML() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrderById(orderId);
  const product = getProduct(productId);

  const orderProducts = order.products;
  
  let orderProduct;

  orderProducts.forEach(product => {
    if(product.productId === productId) {
      orderProduct = product;
    }
  });

  const arraivingDay = dayjs(orderProduct.estimatedDeliveryTime);
  const curentDay = dayjs();
  const orderTime = dayjs(order.orderTime);
  const progress = (curentDay - orderTime) / (arraivingDay - orderTime) * 100;
 
  const trakingHTML = `
   <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${arraivingDay.format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${progress <= 49 ? 'current-status' : ''} ">
            Preparing
          </div>
          <div class="progress-label  ${progress > 49 && progress <= 99 ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${progress >= 100 ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%;
          
          "></div>
        </div>
      </div>
  `;
  document.querySelector('.main').innerHTML = trakingHTML;
}