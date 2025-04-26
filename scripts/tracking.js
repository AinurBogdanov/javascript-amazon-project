import { loadProductsFetch } from '../data/products.js';
import { renderTrakingHTML } from './tracking/trackking.js';

renderTrakingPage();

async function renderTrakingPage() {
  await loadProductsFetch();
  renderTrakingHTML();
};