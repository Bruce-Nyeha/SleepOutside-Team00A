import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => {
        return {
            id: item.Id,
            price: Number(item.FinalPrice),
            name: item.Name,
            quantity: item.quantity,
        };
    });
}

export default class CheckoutProcess { 
    constructor(key, outputSelector) { 
        this.key = key; 
        this.outputSelector = outputSelector; 
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

    displayOrderTotals() { 
        document.querySelector("#num-items").textContent = this.itemCount;
        document.querySelector("#total-cart").textContent = `$${this.subtotal.toFixed(2)}`;
        document.querySelector("#tax").textContent = `$${this.tax.toFixed(2)}`;
        document.querySelector("#shipping").textContent = `$${this.shipping.toFixed(2)}`;
        document.querySelector("#orderTotal").textContent = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;
        order.items = packageItems(this.cartItems);
        console.log("Object: ", order);

        try {
            const response = await services.checkout(order);
            console.log("Server success response:", response);

            // Clear out local storage cart contents cleanly
            localStorage.removeItem(this.key);

            // Redirect the window viewport to the success confirmation page
            window.location.href = "success.html";

        } catch (err) {
            console.log("Captured errors: ", err);

            // Clear out any old hanging alert blocks first
            const existingAlerts = document.querySelectorAll(".alert");
            existingAlerts.forEach(alert => alert.remove());

            // Loop and render dynamic alert messages for missing inputs
            if (err.message && typeof err.message === "object") {
                for (let key in err.message) {
                    alertMessage(err.message[key], true);
                }
            } else if (typeof err.message === "string") {
                alertMessage(err.message, true);
            } else {
                alertMessage("An error occurred during checkout. Please verify fields and try again.", true);
            }
        }
    }
}
