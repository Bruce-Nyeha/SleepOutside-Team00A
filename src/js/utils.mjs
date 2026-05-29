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

<<<<<<< HEAD
  renderWithTemplate(headerTemplate, headerElement, null, updateCartCount);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  // get the main element where the alert will be inserted
  const main = document.querySelector("main");

  // if main is missing
  if (!main) return;

  // create element to hold the alert
  const alert = document.createElement("div");

  // add a class to style the alert
  alert.classList.add("alert");

  // create message text
  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  // create close button
  const closeButton = document.createElement("span");
  closeButton.textContent = "✖";
  closeButton.classList.add("alert-close");

  // append message and close button to alert
  alert.appendChild(messageElement);
  alert.appendChild(closeButton);

  // remove alert when clicking the close button
    closeButton.addEventListener("click", function () {
      main.removeChild(alert);
    });
  
  // add the alert to the top of main
  main.prepend(alert);
  
  // scroll user to the top of main to see the alert
  if (scroll)
    window.scrollTo(0, 0);
};
=======
    renderWithTemplate(headerTemplate, headerElement, null, updateCartCount);
    renderWithTemplate(footerTemplate, footerElement);
}

// Reusable custom alert banner function
export function alertMessage(message, scroll = true) {
  // 1. Create a brand new container element for the alert
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");

  // 2. Populate it with the text string and a neat close button
  alertElement.innerHTML = `<p>${message}</p><span>❌</span>`;

  // 3. Set up a click listener on the close button to remove it gracefully
  alertElement.querySelector("span").addEventListener("click", () => {
    alertElement.remove();
  });

  // 4. Target the main content section and prepend the banner right at the top
  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.prepend(alertElement);
  }

  // 5. If scroll is true, smoothly snap the window viewport back up to the top
  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
>>>>>>> e88f3395ceb32a95b67ccb3ddca3448aa7c0b45b
