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
  };
  initEventListeners() {
    return;
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
      if (sizeChartCont.classList.contains('hidden')) {
        sizeChartCont.classList.remove('hidden');
      } else {
        sizeChartCont.classList.add('hidden');
      }
    });

    closeChartBtn.addEventListener('click',() => {
      sizeChartCont.classList.add('hidden');
    });
  };
}

export class Appliance extends Product {
  constructor(productDetails) {
    super(productDetails);
  }
  initEventListeners() {
    const openButton = document.querySelector(`.js-show-warranty-btn-${this.id}`);
    const closeButton = document.querySelector(`.js-hide-warranty-btn-${this.id}`);
    const container = document.querySelector(`.js-warranty-modal-content-${this.id}`)
   
    
    openButton.addEventListener('click',(event) => {
      container.classList.remove('hidden');
      const card = event.target.closest('.product-container');
      const rect = card.getBoundingClientRect();
      const popupRect = container.getBoundingClientRect();
      console.log(popupRect);

      if (rect.left + popupRect.width > window.innerWidth) {
        container.style.left = 'auto';
        container.style.right = '0';
      }
    });
    closeButton.addEventListener('click',() => {
      container.classList.add('hidden');
    });
  }
  extraInfoHTML() {
    return `
    <button class="show-warranty-btn js-show-warranty-btn-${this.id}">Warranty</button>
    <div class="warranty-modal-content js-warranty-modal-content-${this.id} hidden ">
      <h1>Warranty</h1>
      <p>some warranty text that confirms that the product has all propeties that is     writen on the web site</p>  
      <button class="hide-warranty-btn js-hide-warranty-btn-${this.id}">close</button>
    </div>
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


