import { cart } from '../../data/cart-class.js'
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';


export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    console.log(product.priceCents)

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents +=  deliveryOption.priceCents;
  });
  
  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;

  const totalCents = totalBeforeTax + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.calculateCartQuantity()})</div>
      <div class="payment-summary-money js-payment-total-no-shipping">
       $${cart.calculateCartQuantity()}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">
        $${cart.calculateCartQuantity()}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-payment-before-tax">
       $${cart.calculateCartQuantity()}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money js-estimated-tax">
      $${cart.calculateCartQuantity()}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">
        $${cart.calculateCartQuantity()}
      </div>
    </div>

    <button class="place-order-button button-primary 
    js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
  .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart.cartItems
          })
        });
  
        const order = await response.json()
        addOrder(order);

      } catch (error) {
        console.log('unexpected error. try again later.')
      }
      cart.cartItems = [];
      cart.saveToStorage();
      console.log(cart.cartItems);
      console.log('cart hase been cleared')
    
      window.location.href = 'orders.html';
    });
}