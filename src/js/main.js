import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// create an instance of the ProductList class
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();
