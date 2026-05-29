import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutObject = new CheckoutProcess("so-cart", "#checkout");

checkoutObject.init();

const form = document.forms["checkout"];

// Listen for the submit event on the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  //check form validation status
  const isValid = form.checkValidity();

  if (!isValid) {
    form.reportValidity();
  } else {
    checkoutObject.checkout();
  }
});
