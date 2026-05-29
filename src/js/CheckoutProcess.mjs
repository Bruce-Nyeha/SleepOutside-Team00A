import { getLocalStorage } from "./utils.mjs";
<<<<<<< HEAD
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";
=======
import { ExternalServices }from "./ExternalServices.mjs";
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b

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
<<<<<<< HEAD
    const simplifiedItems = items.map(function(item) {
        // console.log(item);

=======
    const simplifiedItems = items.map((item) => {
        console.log(item);
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
        return {
            id: item.Id,
            price: Number(item.FinalPrice),
            name: item.Name,
<<<<<<< HEAD
            quantity: 1,
=======
            quantity: item.quantity,
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
        };
    });
    return simplifiedItems;
}

<<<<<<< HEAD
export default class CheckoutProcess {
    constructor(key, outputSelector) {
=======
export default class CheckoutProcess { 
    constructor(key, outputSelector) { 
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
        this.key = key; // "so-cart"
        this.outputSelector = outputSelector; // "#total-cart"
        this.cartItems = [];
        this.itemCount = 0;
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
<<<<<<< HEAD

    }

    init() {
=======
        
    }

    init() { 
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
        this.cartItems = getLocalStorage(this.key) || [];
        this.calculateItemSummary();
    }

<<<<<<< HEAD
    calculateItemSummary() {
=======
    calculateItemSummary() { 
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
        let taxRate = 0.06;
        let shipping = 0;

        this.itemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        this.subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
        this.tax = this.subtotal * taxRate;
<<<<<<< HEAD

        if (this.itemCount > 0) {
            shipping = 10 + (this.itemCount - 1) * 2;
        }

=======
        
        if (this.itemCount > 0) {
            shipping = 10 + (this.itemCount - 1) * 2;
        }
        
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
        this.shipping = shipping;
        this.orderTotal = this.subtotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }


<<<<<<< HEAD
    displayOrderTotals() {
=======
    displayOrderTotals() { 
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
        document.querySelector("#num-items").textContent = this.itemCount;
        document.querySelector("#total-cart").textContent = `$${this.subtotal.toFixed(2)}`;
        document.querySelector("#tax").textContent = `$${this.tax.toFixed(2)}`;
        document.querySelector("#shipping").textContent = `$${this.shipping.toFixed(2)}`;
        document.querySelector("#orderTotal").textContent = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
<<<<<<< HEAD
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

=======
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;
        order.items = packageItems(this.cartItems);
        console.log("Object: ",order);

               try {
            const response = await services.checkout(order);
            console.log("Server success response:", response);

            // Clear out the cart items from the browser's localStorage memory
            localStorage.removeItem(this.key);

            // Take the user directly to your new success page
            window.location.href = "success.html";

        } catch (err) {
            console.log(err);
        }

    }
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
}