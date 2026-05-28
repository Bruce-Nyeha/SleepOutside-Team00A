import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}


function packageItems(items) {
    const simplifiedItems = items.map(function(item) {
        // console.log(item);

        return {
            id: item.Id,
            price: Number(item.FinalPrice),
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

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
        // get the checkout form from the DOM
        const formElement = document.forms["checkout"];

        // convert form fields into a plain JS object
        const order = formDataToJSON(formElement);

        // add system-generated fields to the order object
        order.orderDate = new Date().toISOString();
        order.orderTotal = Number(this.orderTotal.toFixed(2));
        order.tax = Number(this.tax.toFixed(2));
        order.shipping = this.shipping;
        order.items = packageItems(this.cartItems);
        
        // console.log("Order Object: ", order); // temporary - for debugging

        try {
            const response = await services.checkout(order);

            // if successful, server returns confirmation data
            console.log("Checkout Success:", response.message);
            console.log("Order ID:", response.orderId);

            // clear cart contents from localStorage
            localStorage.removeItem(this.key);

            // redirect to success page
            window.location.href = "success.html";

        } catch (err) {
            // log full error for debugging purposes
            console.log("Checkout Failed!");
            console.log("Error Name: ", err.name);

            // default fallback message if structure is unexpected
            let errors = ["Checkout failed. Please try again."];

            // structured backend validation errors
            if (err.message && typeof err.message === "object") {
                errors = Object.values(err.message);
            }

            // string error from server
            else if (typeof err.message === "string") {
                errors = [err.message];
            }

            // display each error as its own alert
            errors.forEach(function (msg) {
                console.log("ALERTING: ", msg);
                alertMessage(msg);
            });

            // server error object is stored in err.message
            console.log("Error Details: ", err.message);
        }
    }

}