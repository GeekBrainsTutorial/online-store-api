const data = [
    { title: 'Notebook', id: 1, price: 2000 },
    { title: 'Keyboard', id: 2, price: 200 },
    { title: 'Mouse', id: 3, price: 100 },
    { title: 'Gamepad', id: 4, price: 87 },
    { title: 'Новый Товар', id: 5 }
];
const renderProduct = (title, id, price = 'Цена товара', img = "https://placehold.it//150x100") => {
    return `
        <div class="product-item">
        <img src = "${img}" alt = "${title}">
            <div>
                <h3>${title}</h3>
                <p>${price}</p>
                <button>Купить</button>
            </div>
        </div>
    `
};

const render = (products) => {
    document.querySelector('.products').innerHTML = products.map(item => renderProduct(item.title, item.id, item.price)).join('');
};

let sum= () =>{
    let sum = 0;
    
    for(let products of data){
        sum +=products.price
    }
    return sum;
 }
render(data);
console.log(data)