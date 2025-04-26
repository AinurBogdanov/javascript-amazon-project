import { getProduct,loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11/esm/index.js';
import { formatCurency } from "./utils/money.js";
import { cart } from '../data/cart-class.js'

loadPage();


async function loadPage() {
  await loadProductsFetch();
  renderOrders();
  renderOrdersHeader();
};

function renderOrders() {
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

            <button class="buy-again-button button-primary 
              js-buy-again-button" 
              data-product-id="${product.productId}">

              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>

            <div class="added-message js-added-message-${product.productId}">
              <img class="add-image" src="images/icons/checkmark.png">
              added
            </div>            
            </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `
      });
      return productsListHTML;
    };
    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

    buyItAgainButton()
    
    
    const timeOutIds = {};
    
    function buyItAgainButton() {
      document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;
          cart.addToCart(productId);
          renderOrdersHeader();
          
          displayAddMassage(productId);
        });
      })
    };

    function displayAddMassage(productId) {
      if (timeOutIds[productId]) {
        clearTimeout(timeOutIds[productId]);
      }

      const messageEl = document.querySelector(`.js-added-message-${productId}`)
       messageEl.classList.add('add-message-visible')

      timeOutIds[productId] = setTimeout(() => {
        messageEl.classList.remove('add-message-visible');
        console.log(timeOutIds)
        delete timeOutIds[productId];
        console.log(timeOutIds)
      }, 2000);
    }
  });
}

function renderOrdersHeader() {
  const cartQuantity = cart.calculateCartQuantity(); 
  const ordersHeaderHTML = `
      <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar js-search-bar" type="text" placeholder="Search">
    
          <button class="search-button js-search-button">
            <img class="search-icon" src="images/icons/search-icon.png">
          </button>

      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity">${cartQuantity}</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
      `
  document.querySelector('.amazon-header').innerHTML = ordersHeaderHTML;

  makeSearch();
};

function makeSearch() {
  const searchBtn = document.querySelector('.js-search-button');
  const searchBar = document.querySelector('.js-search-bar');

  searchBtn.addEventListener('click', () => {
    const inputEl = document.querySelector('.js-search-bar')
    const search = inputEl.value;
    window.location.href=`amazon.html?search=${search}`;
    inputEl.value = '';
  });

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const inputEl = document.querySelector('.js-search-bar')
      const search = inputEl.value;
      window.location.href=`amazon.html?search=${search}`;
      inputEl.value = '';
    }
  });
}