import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutObject = new CheckoutProcess("so-cart", "#checkout");
checkoutObject.init();

const form = document.forms["checkout"];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isFormValid = form.reportValidity();

  if (isFormValid) {
    checkoutObject.checkout();
  }
});
