import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const selectedItems = getLocalStorage("so-cart") || []; // get current cart items from local storage or initialize as empty array
  selectedItems.push(product); // add the new product to the cart array
  setLocalStorage("so-cart", selectedItems); // update local storage (imported) with the new cart array
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
