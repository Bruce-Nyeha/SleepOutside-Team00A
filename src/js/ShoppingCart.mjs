import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    return `
<li class="cart-card">
<img src="${item.Image}" alt="Image of ${item.Name}">
<h2>${item.Name}</h2>
<p>$${item.FinalPrice}</p>
<p>Qty: ${item.Quantity || 1}</p>
</li>
  `;
}

export default class ShoppingCart {
    constructor(listElement) {
        this.listElement = listElement;
        this.items = [];
    }

    init() {
        this.items = getLocalStorage("so-cart") || [];
        this.renderCart(this.items);
    }

    renderCart(list) {
        renderListWithTemplate(
            cartItemTemplate,
            this.listElement,
            list,
            "afterbegin",
            true
        );
    }
}

