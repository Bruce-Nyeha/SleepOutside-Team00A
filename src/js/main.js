import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();
loadHeaderFooter();

const sortSelect = document.querySelector("#sort-select");

if (sortSelect) {
  sortSelect.addEventListener("change", (event) => {
    const criteria = event.target.value;
    productList.sortList(criteria);
  });
}
