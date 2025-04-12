import {addToCart, cart, loadFromStorage, removeFromCart} from '../../data/cart.js';
import { formatCurency } from '../../scripts/utils/money.js';

describe('test suite add to cart', () => {
  beforeEach(() => {
    const products = [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel"
        ]
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
          stars: 4,
          count: 127
        },
        priceCents: 2095,
        keywords: [
          "sports",
          "basketballs"
        ]
      }];
    let productsHTML = '';
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-contatiner')
    .innerHTML = `
      <div class="products-grid js-products-grid"></div>
    `;

    products.forEach((product) => {
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
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
    
        <div class="product-price">
          $${ formatCurency(product.priceCents)}
        </div>
    
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

  });



  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
  });
 
  
  it('adds a new product in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
  });
});

describe('removing item from cart',() => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });

  it('removes by id', () => {
    expect(cart.length).toEqual(1);
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart).toEqual([]);
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });

  it('does not romoves if id not in cart', () => {
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });
})    