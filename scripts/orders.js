import { loadProductsFetch } from "../data/products.js";
import { makeSearch } from "./shered/fetures.js";
import { renderOrdersHTML } from "./orders/renderOrders.js";
import { renderOrdersHeader } from "./orders/renderOrders.js";

loadPage();

async function loadPage() {
  await loadProductsFetch();
  renderOrdersHTML();
  renderOrdersHeader();
  makeSearch();
};





