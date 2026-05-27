import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutObject = new CheckoutProcess("so-cart", ".products");

checkoutObject.init();

const formulario = document.forms["checkout"];

// Listen for the submit event on the form
formulario.addEventListener("submit", (event) => {
  event.preventDefault(); // It prevents doing what it would normally do on submit (refreshing both the page and the console)

  // Call the checkout method of the checkoutObject (CheckoutProcess instance)
  checkoutObject.checkout();
});
