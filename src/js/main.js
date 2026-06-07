import { loadHeaderFooter } from "./utils.mjs";
import { initNewsletter } from "./newsletter.js";

//W03: I Had to create an async main function to use await for loading the header and footer before initializing the product list, otherwise the product list wouldn't show up.
async function main() {
  await loadHeaderFooter();
  initNewsletter();
}
main();
