import { loadHeaderFooter } from "./utils.mjs";

//W03: I Had to create an async main function to use await for loading the header and footer before initializing the product list, otherwise the product list wouldn't show up.
async function main() {
  await loadHeaderFooter();
}
main();
