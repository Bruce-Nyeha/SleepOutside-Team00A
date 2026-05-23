import { getLocalStorage } from "./utils.mjs";

// Cart Item Count
export function updateCartCount() {
    // Get cart data from local storage
    // If none, default to empty array
    const cart = getLocalStorage("so-cart") || [];

    // Count items
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    // Select the cart badge in DOM
    const badge = document.querySelector(".cart-count");

    // If no badge, stop
    if (!badge) return;

    // Update cart count in badge
    badge.textContent = count;

    // Hide badge if cart is empty
    badge.style.display = count > 0 ? "inline-block" : "none";

}