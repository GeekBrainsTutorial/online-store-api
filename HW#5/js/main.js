

const App = {
    data() {
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            showCart: false,
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/50x100',
            cartItems: [],
            catalogUrl: '/catalogData.json',
            products: [],
            userSearch: '',
            imgCatalog: 'https://placehold.it/200x150'
        }
    },
    computed: {
        filtered() {
            return this.products.filter(el => new RegExp(this.userSearch, 'i').test(el.product_name));
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
        },
        addProduct(product){
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        remove(product){
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
                })
        }
    },
    mounted(){
        this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
    }
};

Vue.createApp(App).mount('#app');


// let getRequest = url => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> new ActiveXObject();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState !== 4) {
//                 return;
//             }
//
//             if (xhr.status !== 200) {
//                 reject('some error');
//                 return;
//             }
//
//             resolve(xhr.responseText);
//         }
//     });
// };
//
// getRequest('tel.json').then()

// class Item {
//     product_name = '';
//     price = 0;
//     id_product = 0;
//     img = '';
//     rendered = false;
//
//     constructor(product, img = 'https://placehold.it/200x150') {
//         ({ product_name: this.product_name, price: this.price, id_product: this.id_product } = product);
//         this.img = img;
//     }
//
//     render() {
//         this.rendered = true;
//         return `<div class="product-item" data-id="${this.id_product}">
//                  <img src="${this.img}" alt="${this.product_name}">
//                  <div class="desc">
//                      <h3>${this.product_name}</h3>
//                      <p>${this.price}</p>
//                      <button class="buy-btn" data-id="${this.id_product}">Купить</button>
//                  </div>
//              </div>`
//     }
// }
//
// class ProductItem extends Item {}
//
// class CartItem extends Item {
//     quantity = 0;
//
//     constructor(product, img = 'https://placehold.it/50x100') {
//         super(product, img);
//         this.quantity = product.quantity;
//     }
//
//     changeQuantity(count) {
//         this.quantity += count;
//         this._updateItem();
//     }
//
//     removeMarkup() {
//         document.querySelector(`.cart-item[data-id="${this.id_product}"]`).remove();
//     }
//
//     render() {
//         this.rendered = true;
//         return `<div class="cart-item" data-id="${this.id_product}">
//                 <div class="product-bio">
//                 <img src="${this.img}" alt="Some image">
//                 <div class="product-desc">
//                 <p class="product-title">${this.product_name}</p>
//                 <p class="product-quantity">Quantity: ${this.quantity}</p>
//                 <p class="product-single-price">$${this.price} each</p>
//                 </div>
//                 </div>
//                 <div class="right-block">
//                 <p class="product-price">$${this.quantity*this.price}</p>
//                 <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>
//                 </div>`
//     }
//
//     _updateItem() {
//         const block = document.querySelector(`.cart-item[data-id="${this.id_product}"]`);
//         block.querySelector(`.product-quantity`).textContent = `Quantity: ${this.quantity}`;
//         block.querySelector(`.product-price`).textContent = `$${this.quantity*this.price}`;
//     }
// }
//
// class List {
//     static itemsMap = {
//         Products: ProductItem,
//         Cart: CartItem
//     };
//     static API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;
//
//     products = [];
//     container = null;
//     url = '';
//
//     constructor(selector, url) {
//         this.container = document.querySelector(selector);
//         this.url = url;
//         this._init();
//     }
//
//     getJson(url) {
//         return fetch(url ? url : `${List.API + this.url}`)
//             .then(result => result.json())
//     }
//
//     handleData(data) {
//         for (let item of data) {
//             this.products.push(new List.itemsMap[this.constructor.name](item));
//         }
//         this._render();
//     }
//
//     getItem(id) {
//         return this.products.find(el => el.id_product === id);
//     }
//
//     calcSum() {
//         return this.products.reduce((accum, item) => accum += item.price, 0);
//     }
//
//     _init() {}
//
//     _render() {
//         for (let product of this.products) {
//             if (product.rendered) {
//                 continue;
//             }
//
//             this.container.insertAdjacentHTML('beforeend', product.render())
//         }
//     }
//
// }
//
//
// class Products extends List {
//     cart = null;
//     filtered = [];
//
//     constructor(cart, container = '.products', url = "/catalogData.json") {
//         super(container, url);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//
//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.products.filter(el => regexp.test(el.product_name));
//         this.products.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//
//
//     _init() {
//         this.container.addEventListener('click', e => {
//             if (e.target.classList.contains('buy-btn')) {
//                 const id = +e.target.dataset['id'];
//                 this.cart.addProduct(this.getItem(id))
//             }
//         });
//
//         document.querySelector(`.search-form`).addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector(`.search-field`).value);
//         });
//     }
// }
//
// class Cart extends List {
//     constructor(container = '.cart-block', url = '/getBasket.json') {
//         super(container, url);
//         this.getJson()
//             .then(data => this.handleData(data.contents));
//     }
//
//     addProduct(product) {
//         this.getJson(`${List.API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     let find = this.products.find(el => el.id_product === product.id_product);
//                     if (find) {
//                         find.changeQuantity(1);
//                         return;
//                     }
//
//                     let prod = Object.assign({ quantity: 1 }, product);
//                     this.handleData([prod]);
//                 } else {
//                     console.log('some error');
//                 }
//             })
//     }
//
//     removeProduct(product) {
//         this.getJson(`${List.API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     if (product.quantity > 1) {
//                         product.changeQuantity(-1);
//                         return;
//                     }
//
//                     this.products.splice(this.products.indexOf(product), 1);
//                     product.removeMarkup();
//                 } else {
//                     console.log('some error');
//                 }
//             })
//     }
//
//     _init() {
//         this.container.addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 const id = +e.target.dataset['id'];
//                 this.removeProduct(this.getItem(id))
//             }
//         });
//
//         document.querySelector(`.btn-cart`).addEventListener('click', () => {
//             this.container.classList.toggle('invisible');
//         })
//     }
// }
//
// const cart = new Cart();
// const list = new Products(cart);
// list.getJson(`getProducts.json`).then(data => list.handleData(data));




