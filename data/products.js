import { formatCurency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;
 
     products.forEach((product) => {
       if (product.id === productId) {
         matchingProduct = product;
       } 
     }); 
     return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  };

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  };

  getPrice() {
    return `$${formatCurency(this.priceCents)}`
  };

  extraInfoHTML() {
    return '';
  }
}

export class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    
  }

  extraInfoHTML() {
    return `
    <button class="size-chart-btn js-size-chart-btn-${this.id}">size chart</button>
    <div class="size-chart-modal js-size-chart-container-${this.id} hidden">
      <div class="size-shart-content">
        <h3>Size chart</h3>
        <table>
          <tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr>
          <tr><td>S</td><td>68-89 cm</td><td>66-69 cm</td><td>92-95 cm</td></tr>
          <tr><td>M</td><td>90-93 cm</td><td>70-73 cm</td><td>96-110 cm</td></tr>
          <tr><td>L</td><td>94-97 cm</td><td>74-89 cm</td><td>111-125 cm</td></tr>
        </table>
        <button class="close-chart-btn js-close-chart-btn-${this.id}">Close</button>
      </div>
    </div>
    `;
  }

  initEventListeners() {
    const sizeChartBtn = document.querySelector(`.js-size-chart-btn-${this.id}`);
    const sizeChartCont = document.querySelector(`.js-size-chart-container-${this.id}`);
    const closeChartBtn = document.querySelector(`.js-close-chart-btn-${this.id}`)

    sizeChartBtn.addEventListener('click',() => {
      sizeChartCont.classList.remove('hidden');
    });

    closeChartBtn.addEventListener('click',() => {
      sizeChartCont.classList.add('hidden');
    });
  };
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
    <a href="images/appliance-instructions.png" target="_blank">Instructions</a>
    <a href="images/appliance-warranty.png" target="_blank">Warranty</a>
    `
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json(); 
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.keywords.includes('appliances')) {
        return new Appliance(productDetails);
      } else {
        return new Product(productDetails);
      }
    });
  }).catch(() => {
    console.log('Unexpected error. Please try again later');
  });
  return promise;
};


