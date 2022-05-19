"use strict";

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { }
];

const renderGoodsItem = (title = 'Товар закончился', price = '0') => 
    `<div class='goodsItem'>
        <img src='image/defGoods.png' alt='good'>
        <h3>${title}</h3>
        <p>${price}$</p>
        <button class="cartButtonAdd" type="button">Добавить</button>
    </div>`;

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goodsList').innerHTML = goodsList.join('');
};

renderGoodsList(goods);




