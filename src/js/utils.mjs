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

export function alertMessage(message, scroll = true) {
    const main = document.querySelector('main');
    if (!main) return;

    const alert = document.createElement('div');
    alert.classList.add('alert');

    // Le metemos estilos inline bien fuertes para que se vea sí o sí
    alert.style.backgroundColor = '#f8d7da';
    alert.style.color = '#721c24';
    alert.style.border = '1px solid #f5c6cb';
    alert.style.padding = '15px';
    alert.style.margin = '15px 0';
    alert.style.borderRadius = '4px';
    alert.style.display = 'flex';
    alert.style.justifyContent = 'space-between';
    alert.style.alignItems = 'center';
    alert.style.fontWeight = 'bold';
    alert.style.fontFamily = 'sans-serif';

    alert.innerHTML = `<span>${message}</span><span class="alert-close" style="cursor: pointer; font-weight: bold; padding: 0 10px;">X</span>`;

    alert.addEventListener('click', function (e) {
        if (e.target.classList.contains('alert-close') || e.target.innerText === 'X') {
            main.removeChild(this);
        }
    });

    // Lo inyectamos arriba de todo adentro de <main>
    main.prepend(alert);

    if (scroll) {
        window.scrollTo(0, 0);
    }
}