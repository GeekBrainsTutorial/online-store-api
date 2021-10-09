class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let goodsSum = goods.reduce(reducer);
    }

    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
             block.innerHTML += item.render();
        }
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}
let list = new ProductList();


///////////////////////////////////////////////////////////////////////////////////////////////
class Basket{
    addToBasket(price){
        let basket = []

        }
    }
    removeFromBasket(price){

    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
class Hamburger{
    constructor(price, calories){
        this.size = price;
        this.price = calories;
    }
}

class Kitchen{
    makeBurger(size){
        let burger = new Hamburger(price, calories);
        return burger
    }
}

class Order{
    constructor(size, extras, add_spicy){
        this.big_small = size;
        this.salad_cheese_potato = extras;
        this.spicy = add_spicy;
        this.info = []
        this.createOrder();
    }
    createOrder(){
        let size = ['big', 'small'];
        let addings = ['salad', 'cheese', 'potato'];
        let spicy = ['yes', 'no'];
        let cooking = new Kitchen();
        if (size == 'big'){
            if (addings = 'salad' or 'cheese' or 'potato') {
                if (spicy = 'yes') {
                    info.push()
                }else {

                }
            }else{

            }
        }else{

        }
    }
}








