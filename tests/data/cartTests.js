import { cart } from '../../data/cart-class.js';
import { formatCurency } from '../../scripts/utils/money.js';

describe('test suite: add to cart', () => {
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
      }, {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
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
          $${formatCurency(product.priceCents)}
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
  afterEach(() => {
    document.querySelector('.js-products-grid').innerHTML = '';
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    cart.loadFromStorage();
    
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart.oop', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":2,"deliveryOptionId":"1"}]');
  });
 
  
  it('adds a new product in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    cart.loadFromStorage();

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart.oop', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]');
  });
});

describe('test suite: removing item from cart',() => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    cart.loadFromStorage();
  });

  it('removes by id', () => {
    expect(cart.cartItems.length).toEqual(1);
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems).toEqual([]);
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });

  it('does not romoves if id not in cart', () => {
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart.oop', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]');
    });
})    
describe('test suite: update delivery option', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    });
    cart.loadFromStorage();
  });
  it('updates the delvery option', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart.oop', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"2"}]');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('2')
    cart.updateDeliveryOption('e43638cebbvgvbjkbbbbbbbb','2')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('2')
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','1231273912931')
    expect(cart.cartItems[0].deliveryOptionId).toEqual('2')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })

  });


