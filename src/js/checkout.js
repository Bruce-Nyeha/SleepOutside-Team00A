import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// load shared header and footer
loadHeaderFooter();

<<<<<<< HEAD
// create an instance of CheckoutProcess
// "so-cart" is the localStorage key for cart items
// ".products" is the selector where product output may be displayed
const checkoutObject = new CheckoutProcess("so-cart", ".products");

// initialize checkout process
// loads cart and calculates totals
checkoutObject.init();

// get checkout form from the document
const form = document.forms["checkout"];

// listen for form submission event
form.addEventListener("submit", function (event) {
  // prevent default form behavior (page reload + native submission)
  event.preventDefault();

  // get the first form from the document
  const myForm = document.forms[0];

  // check if all form fields satisfy HTML validation rules
  // returns true if valid, false if invalid
  const checkStatus = myForm.checkValidity();

  // display built-in browser validation messages
  // if any field is invalid, the browser shows helpful feedback to the user
  myForm.reportValidity();

  // only continue with checkout if the form passes validation
  if (checkStatus)
    // call the checkout method from CheckoutProcess instance
    // handles: form data collection, order object creation, API request, success/error handling
    checkoutObject.checkout();
=======
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
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
});
