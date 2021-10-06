const products = [
    {id: 1, title: 'Notebook', price: 2000, image: 'images/laptop.jpg'},
    {id: 2, title: 'Mouse', price: 20, image: 'images/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 200, image: 'images/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50, image: 'images/gamepad.jpg'},
];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title, price, image) => {
        return `
            <div class="container">
                <div class="card">
                    <h3>${title}</h3>
                    <p>${price}</p>
                    <image src="${image}"></image>
                    <button class="buy-btn">Купить</button>                     
                </div>
            </div>`
};

const renderPage = (list) => {
    const productsList = list.map(item => renderProduct(item.title, item.price, item.image));
    // console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(" ");
};

renderPage(products);
