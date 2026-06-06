import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./CartItemCount.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  checkCartTotal(cartItems);
}

function checkCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");

    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0,
    );

    document.querySelector("#total-cart").textContent = `$${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const imageSource = item.Images?.PrimaryMedium || item.Images?.PrimaryLarge;
  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}" role="button" aria-label="Remove ${item.Name} from cart" title="Remove item">&#10005;</span>
  <a href="#" class="cart-card__image">
    <img
      src="${imageSource}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button class="cart-card__qty-btn" data-id="${item.Id}" data-action="decrease" aria-label="Decrease quantity of ${item.Name}">&minus;</button>
    <span class="cart-card__qty-value">${item.quantity}</span>
    <button class="cart-card__qty-btn" data-id="${item.Id}" data-action="increase" aria-label="Increase quantity of ${item.Name}">+</button>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeFromCart(id) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updated = cartItems.filter((item) => String(item.Id) !== String(id));
  setLocalStorage("so-cart", updated);
  renderCartContents();
  updateCartCount();
}

function changeQuantity(id, delta) {
  const cartItems = getLocalStorage("so-cart") || [];
  const target = cartItems.find((item) => String(item.Id) === String(id));
  if (!target) return;
  const newQty = target.quantity + delta;
  let updated;
  if (newQty <= 0) {
    updated = cartItems.filter((item) => String(item.Id) !== String(id));
  } else {
    updated = cartItems.map((item) =>
      String(item.Id) === String(id) ? { ...item, quantity: newQty } : item,
    );
  }
  setLocalStorage("so-cart", updated);
  renderCartContents();
  updateCartCount();
}

function handleCartListClick(event) {
  const removeBtn = event.target.closest(".cart-card__remove");
  if (removeBtn) {
    removeFromCart(removeBtn.dataset.id);
    return;
  }
  const qtyBtn = event.target.closest(".cart-card__qty-btn");
  if (qtyBtn) {
    const delta = qtyBtn.dataset.action === "increase" ? 1 : -1;
    changeQuantity(qtyBtn.dataset.id, delta);
  }
}

renderCartContents();
loadHeaderFooter();
document
  .querySelector(".product-list")
  .addEventListener("click", handleCartListClick);
