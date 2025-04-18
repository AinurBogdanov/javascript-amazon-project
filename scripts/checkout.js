import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
// import "../data/car.js";
// import "../data/backend-practice.js";
// import '../data/cart-class.js';

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);

  } catch (error) {
    console.log('Unexpected error. Please try again later');
  }

  renderOrderSummary();
  renderCheckoutHeader();
  renderPaymentSummary();
};

loadPage();
/*
Promise.all([
  loadProductsFetch(), 
  new Promise ((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderCheckoutHeader();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value)
  return new Promise ((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderCheckoutHeader();
  renderPaymentSummary();
});
*/

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderCheckoutHeader();
//     renderPaymentSummary();
//   });
// });
