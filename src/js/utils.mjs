import { updateCartCount } from "./CartItemCount.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
    
    parentElement.innerHTML = template;

    if (callback) {
        callback(data);
    }
   
}

export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

export async function loadHeaderFooter() { 
    const headerTemplate = await loadTemplate("../partials/header.html");   //W03: the await keyword was correct (Bruce was right all the time) but we forgot to make the function async, which is required to use await.
    const headerElement = document.querySelector("#dynamic-header");

    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#dynamic-footer");

    renderWithTemplate(headerTemplate, headerElement, null, updateCartCount);
    renderWithTemplate(footerTemplate, footerElement);
}