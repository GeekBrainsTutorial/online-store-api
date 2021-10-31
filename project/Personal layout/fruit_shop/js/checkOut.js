import module from "./basket"
let adding = module.adding
let removing = module.removing

function check_out() {
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let sum
    sum = cart_count.reduce(reducer);
    document.getElementById('product_table').innerHTML += cart_items.join(" ");
    document.getElementById('number_of_products').innerHTML += cart_items.length;
    document.getElementById('basket_table').innerHTML += sum;
}