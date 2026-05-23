//import ProductData from "./ProductData.mjs";
//import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

/*const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);*/

//W03: I Had to create an async main function to use await for loading the header and footer before initializing the product list, otherwise the product list wouldn't show up.
async function main() {
  await loadHeaderFooter();

  /*productList.init();

  const sortSelect = document.querySelector("#sort-select");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const criteria = event.target.value;
      productList.sortList(criteria);
    });
  }*/
}
main();
