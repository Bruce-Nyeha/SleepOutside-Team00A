import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutObject = new CheckoutProcess("so-cart", ".products");

checkoutObject.init();
