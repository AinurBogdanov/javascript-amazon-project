import { cart } from '../data/cart-class.js'
import { products, loadProducts} from '../data/products.js';
import { formatCurency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  const url = new URLSearchParams(location.search)
  const rawSearch =  url.get('search');
  const search = rawSearch ? rawSearch.toLowerCase() : null;
 
  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      const productNameLowerCase = product.name.toLowerCase();
      let hasKeywordMatch = false;

      if (product.keywords) {
        hasKeywordMatch = product.keywords.some((word) => {
          return word.toLowerCase().includes(search);
        });
      }
      
      return productNameLowerCase.includes(search) || hasKeywordMatch;
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>
  
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
  
      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
  
      <div class="product-price">${product.getPrice()}</div>
  
      <div class="product-quantity-container">
        <select class=js-quantity-selector-${product.id}>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
  
      ${product.extraInfoHTML()}
  
      <div class="product-spacer"></div>
  
      <div class="added-to-cart js-added-cart-masage-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>
        
      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${product.id} >
        Add to Cart
      </button>
    </div>`;
  });
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  
  
  let timeOutId;  
  
  updateCartQuantity();
  
  addToCartButton();
  
  function displayAddeMassage(productId) {
    const jsCartMassage = document.querySelector(`.js-added-cart-masage-${productId}`);
    
    jsCartMassage.classList.add('added-to-cart-visible')
  
    clearTimeout(timeOutId);
    
    timeOutId = setTimeout(() => {
      jsCartMassage.classList.remove(`added-to-cart-visible`)
    },2000);      
  }; 
  
  function updateCartQuantity() {
    let cartQuantity = 0;
    
    cartQuantity = cart.calculateCartQuantity();
  
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity
  };
  
  function addToCartButton() {
    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
    
          const { productId } = button.dataset;
    
          cart.addToCart(productId);
          updateCartQuantity();
          displayAddeMassage(productId);
        })
      });
  }

  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href=`amazon.html?search=${search}`;
  });
}; 

