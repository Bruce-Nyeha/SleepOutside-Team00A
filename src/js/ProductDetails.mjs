
// Dynamically produces the product detail pages
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    // initialize page
    async init() {
        // Use the data source to get the details for the current product
        this.product = await this.dataSource.findProductById(this.productId);

        // The product details are needed before rendering the HTML
        this.renderProductDetails();

        // Once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));

    }

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        document.querySelector(".product-detail h3").textContent =
            this.product.Brand.Name;

        document.querySelector(".product-detail h2").textContent =
            this.product.Name;

        document.querySelector(".product-detail img").src =
            this.product.Images.PrimaryLarge;

        document.querySelector(".product-detail img").alt =
            this.product.Name;

        document.querySelector(".product-card__price").textContent =
            `$${this.product.FinalPrice}`;

        document.querySelector(".product__color").textContent =
            this.product.Colors[0].ColorName;

        document.querySelector(".product__description").textContent =
            this.product.Description;

        document.querySelector("#addToCart").dataset.id =
            this.product.Id;
    }
}