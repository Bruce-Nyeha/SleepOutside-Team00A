import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector(".product-list");

// Read category dynamically from URL
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || "tents"; // fallback ensures page still works if no category is provided
}

//W03: I Had to create an async main function to use await for loading the header and footer before initializing the product list, otherwise the product list wouldn't show up.
async function main() {
  await loadHeaderFooter();

  const category = getCategoryFromURL();

  const dataSource = new ProductData(category);
  const productList = new ProductList(category, dataSource, listElement);

  await productList.init();

  const sortSelect = document.querySelector("#sort-select");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      // const criteria = event.target.value;
      productList.sortList(event.target.value);
    });
  }
}
main();
