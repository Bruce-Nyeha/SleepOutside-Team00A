import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess { 
    constructor(key, outputSelector) { 
        this.key = key; // "so-cart"
        this.outputSelector = outputSelector; // "#total-cart"
        this.cartItems = [];
        this.itemCount = 0;
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
        
    }

    init() { 
        this.cartItems = getLocalStorage(this.key) || [];
        this.calculateItemSummary();
        console.log(this.itemCount);
    }

    calculateItemSummary() { 
        let taxRate = 0.06;
        let shipping = 0;

        this.itemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        this.subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
        this.tax = this.subtotal * taxRate;
        
        if (this.itemCount > 0) {
            shipping = 10 + (this.itemCount - 1) * 2;
        }
        
        this.shipping = shipping;
        this.orderTotal = this.subtotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }


   

    /*
    if (this.itemCount == 0) {
    shipping = 0;
    }
    if (this.itemCount == 1) {
    shipping = 10;
    } else if (this.itemCount > 1){
    shipping = 10 + ((item.Count - 1) * 2));
    } 
    
    
    */

    displayOrderTotals() { 
        document.querySelector("#num-items").textContent = this.itemCount;
        document.querySelector("#total-cart").textContent = `$${this.subtotal.toFixed(2)}`;
        document.querySelector("#tax").textContent = `$${this.tax.toFixed(2)}`;
        document.querySelector("#shipping").textContent = `$${this.shipping.toFixed(2)}`;
        document.querySelector("#orderTotal").textContent = `$${this.orderTotal.toFixed(2)}`;
    }
}