

let getRequest = url => {
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                reject('some error');
                return;
            }

            resolve(xhr.responseText);
        }
    });
};
getRequest('tel.json').then();


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

class Item{
    product_name = '';
    price = 0;
    id_product = 0;
    img = '';
    rendered = false;

    constructor(product, img = 'https://placehold.it/200x150') {
        ({ product_name: this.product_name, price: this.price, id_product: this.id } = product);
        this.img = img;
    }

    render() {
        this.rendered = true;
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.product_name}">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" data-id="${this.id_product}">Купить</button>
                 </div>
             </div>`
    }
    
}
class ProductItem extends Item{}
class CartItem  extends Item{
    quantity = 0;

    constructor(product,img = 'https://placehold.it/50x100'){
        super(product,img);
        this.quantity = product.quantity;
    }
    changeQuantity(count){
        this.quantity +=count;
        this._updateItem();
    }
    removeMarkup(){
        document.querySelector(`.cart-item[data-id = "${this.id_product}"]`).remove();
    }
    render(){
        this.rendered = true;
        return `<div class = "cart-item" data-id ="${this.id_product}">
                <dic class ="product-bio">
                <img src ="${this.img}" alt ="Image">
                <div class ="product-desc">
                <p class ="product-title">${this.product_name}</p>
                <p class ="product-quantity">Quantity: ${this.quantity}</p>
                <p class ="product-single-price">$${this.price} each</p>
                </div>
                </div>
                <div class ="right-block">
                <p class ="product-price">$${this.quantity*this.price}</p>
                <button class ="del-btn" data-id ="${this.id_product}">&times;</button>
                </div>
                </div>
        `
    }
    _updateItem(){
        const block = document.querySelector(`.cart-item[data-id = "${this.id_product}"]`);
        block.querySelector(`.product-quantity`).textContent = `Quantity: ${this.quantity}`
        block.querySelector(`.product-price`).textContent = `$${this.quantity*this.price}`
    }
}
class List{
    static itemsMap ={
        Products: ProductItem,
        Cart: CartItem
    }
    static API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

    products = [];
    container = null;
    url =''

    constructor(selector,url) {
        this.container = document.querySelector(selector);
        this.url = url
        this._init()
    }
    getJson(url){
        return fetch(url ? url : `${List.API + this.url}`)
            .then(result => result.json())
    }
    handleData(data){
        for(let item of data){
            this.products.push(new List.itemsMap[this.constructor.name](item))
        }
        this._render()
    }
    calcSum() {
        return this.products.reduce((accum, item) => accum += item.price, 0);
    }
    getItem(id){
        return this.products.find(el => el.id_product === id)
    }
    _init(){}
    _render(){
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }

            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
class Products extends List{
    cart = null;
    constructor(cart,container =".products",url = "/catalogData.json"){
        super(container,url)
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data))
    }

    _init() {
         this.container.addEventListener('click',e =>{
             if(e.target.classList.contains('.buy-btn')){
                 const id = +e.target.dataset.id;
                 this.cart.addProduct(this.getItem(id))
             }
         })
    }
    
}

class Cart extends List{
    constructor(container = '.cart-block',url = '/getBasket.json'){
        super(container,url);
        this.getJson()
            .then(data => this.handleData(data.contents))
    }
    addProduct(product){
        this.getJson(`${List.API}/addToBasket.json`)
            .then(data =>{
                if(data.result){
                    let find = this.products.find(el => el.id_product === product.id_product)
                    if(find){
                        find.changeQuantity(1)
                        return
                    }
                    let prod = Object.assign({quantity:1},product)
                    this.handleData([prod])
                }else{
                    console.log('error')
                }
            })
    }
    removeProdoct(product){
        this.getJson(`${List.API}/deleteFromBasket.json`)
            .then(data =>{
                if(data.result){
                    if(product.quantity > 1){
                        product.changeQuantity(-1)
                        return
                    }
                    this.products.splice(this.products.indexOf(product),1)
                    product.removeMarkup();
                }else{
                    console.log('error')
                }
            })
    }
    _init() {
        this.container.addEventListener('click',e =>{
            if(e.target.classList.contains('.del-btn')){
                const id = +e.target.dataset.id;
                this.removeProdoct(this.getItem(id))
            }
        });
        document.querySelector(`.btn-cart`).addEventListener('click',()=>{
            this.container.classList.toggle('invisible')
        })
   }
}
const cart = new Cart()
const list = new Products(cart)
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


//Все что смог сам реализовать. Не могу читать чужой код. Сразу становиться непонятно где что, кто что наследует и т.д.


// let Render = Boolean;
// Render = false;

// function dropCart(){
//     aside = '<aside class="side">Нажми еще раз чтоб закрыть!</aside>';
//     reside = '<div>Корзина</div>'
//     if(Render === false){
//         Render = true;
//         document.querySelector('.btn-cart').insertAdjacentHTML('beforeend',aside);
//         console.log(Render)
//         return
//     }else(Render === true)
//     {
//         Render = false;
//         document.querySelector('.btn-cart').innerHTML = reside;
//         console.log(Render)
//         return
//     }

// }
///////////////////////////////////////////////////////////////////////////////////////////////
