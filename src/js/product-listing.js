import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function main() {
  await loadHeaderFooter();

  const category = getParam("category") || "tents";
  const titleSpan = document.querySelector(".title");

  if (titleSpan) {
    titleSpan.textContent = category
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const dataSource = new ExternalServices();
  const listElement = document.querySelector(".product-list");
  const productList = new ProductList(category, dataSource, listElement);

  productList.init();

  const sortSelect = document.querySelector("#sort-select");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const criteria = event.target.value;
      productList.sortList(criteria);
    });
  }
}
main();
