import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}"/>
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;         // (tents, etc.)
        this.dataSource = dataSource;     // object that provides the data
        this.listElement = listElement;    // HTML element where the product will be rendered (inserted and displayed)
        
    }


    async init() {
        const list = await this.dataSource.getData(); // get the data from the data source (ProductData)
        this.renderList(list);
    }

    renderList(list) {
       /* const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        console.log(list); */
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}