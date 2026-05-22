import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// Wait until the DOM is fully loaded before running any DOM queries
document.addEventListener("DOMContentLoaded", () => {
  // Read category from URL
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  // Update page title dynamically
  const titleElement = document.querySelector("#page-title");
  if (titleElement && category) {
    const formattedCategory = category
      ? category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "";
    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }

  // Create data source (API connection)
  const dataSource = new ProductData(category);

  // Get the container where products will be rendered
  const listElement = document.querySelector(".product-list");

  // Create ProductList instance and initialize it
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();

  // Sorting functionality (dropdown listener)
  const sortSelect = document.querySelector("#sort-select");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const criteria = event.target.value;
      productList.sortList(criteria);
    });
  }
});
