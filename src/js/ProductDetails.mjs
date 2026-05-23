
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
        this.product = await this.dataSource.findProductById(this.productId);

        //console.log(this.product);
        //console.log(this.product.Image);

        this.renderProductDetails();

        // add listener to Add to Cart button
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

        if (this.product.Colors && this.product.Colors.length > 0) {
            document.querySelector(".product__color").textContent =
                this.product.Colors[0].ColorName;
        }

        document.querySelector(".product__description").textContent =
            this.product.Description;

        document.querySelector("#addToCart").dataset.id =
            this.product.Id;
    }
}