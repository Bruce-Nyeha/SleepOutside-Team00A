// Dynamically produces the product detail pages
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    // Initialize page elements
    async init() {
        // Fetch product info from server
        this.product = await this.dataSource.findProductById(this.productId);

        // Draw the main product information onto the screen
        this.renderProductDetails();

        // 🚀 TRIGGER: Load any saved reviews for this item right away
        this.renderComments();

        // Add a click listener to the Add to Cart button
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));

        // Listen for review form submissions
        document
            .getElementById("comment-form")
            .addEventListener("submit", this.addComment.bind(this));
    }

    // Handle Cart Submissions
    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        const existingItem = cartItems.find((item) => item.Id === this.product.Id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const cartItem = {
                Id: this.product.Id,
                Name: this.product.Name,
                FinalPrice: this.product.FinalPrice,
                Images: this.product.Images,
                Colors: this.product.Colors,
                quantity: 1
            };
            cartItems.push(cartItem);
        }

        setLocalStorage("so-cart", cartItems);

        // Clear any old active banners first
        const existingAlerts = document.querySelectorAll(".alert");
        existingAlerts.forEach(alert => alert.remove());

        // Fire your custom cart success alert banner
        alertMessage(`${this.product.Name} successfully added to your cart!`, false);
    }

    // Render Product Info Blocks to DOM
    renderProductDetails() {
        document.querySelector(".product-detail h3").textContent = this.product.Brand.Name;
        document.querySelector(".product-detail h2").textContent = this.product.Name;
        document.querySelector(".product-detail img").src = this.product.Images.PrimaryLarge;
        document.querySelector(".product-detail img").alt = this.product.Name;
        document.querySelector(".product-card__price").textContent = `$${this.product.FinalPrice}`;
        document.querySelector(".product__color").textContent = this.product.Colors[0].ColorName;
        document.querySelector(".product__description").textContent = this.product.Description;
        document.querySelector("#addToCart").dataset.id = this.product.Id;
    }

    // Render Item Reviews
    renderComments() {
        const commentsContainer = document.getElementById("comments-list");
        if (!commentsContainer) return;

        const commentsKey = `comments-${this.productId}`;
        const comments = getLocalStorage(commentsKey) || [];

        commentsContainer.innerHTML = "";

        if (comments.length === 0) {
            commentsContainer.innerHTML = "<p class='no-comments'>No reviews yet. Be the first to write one!</p>";
            return;
        }

        comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment-card");
            commentDiv.innerHTML = `
                <p class="comment-meta"><strong>${comment.author}</strong> • <small>${comment.date}</small></p>
                <p class="comment-content">${comment.text}</p>
            `;
            commentsContainer.appendChild(commentDiv);
        });
    }

    // Save and Display New Reviews
    addComment(event) {
        event.preventDefault();

        const authorInput = document.getElementById("comment-author");
        const textInput = document.getElementById("comment-text");

        const newComment = {
            author: authorInput.value,
            text: textInput.value,
            date: new Date().toLocaleDateString()
        };

        const commentsKey = `comments-${this.productId}`;
        let comments = getLocalStorage(commentsKey) || [];

        comments.push(newComment);
        setLocalStorage(commentsKey, comments);

        authorInput.value = "";
        textInput.value = "";

        this.renderComments();
    }
}
