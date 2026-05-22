import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="/product_pages/index.html?id=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    // using the dataSource to get the list of products
    async init() {
        const data = await this.dataSource.getData(this.category);
        this.products = data || [];
        this.renderList(this.products);
    }

    renderList(list) {
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", false);
    }

    sortList(criteria) { 
        let sortedList = Array.isArray(this.products) ? [...this.products] : [];

        if (sortedList.length === 0) { 
            return;
        }

        let sortOptions = {
            "name-asc": (a, b) => a.Name.localeCompare(b.Name),
            "name-desc": (a, b) => b.Name.localeCompare(a.Name),
            "price-asc": (a, b) => parseFloat(a.FinalPrice) - parseFloat(b.FinalPrice),
            "price-desc": (a, b) => parseFloat(b.FinalPrice) - parseFloat(a.FinalPrice)
        };

        if (sortOptions[criteria]) { 
            sortedList.sort(sortOptions[criteria]);
        }

        this.renderList(sortedList);
    }
}