const app = new Vue({
    el: '#app',
    data: {
        cart_count: cart_count = [],
        cart_items: cart_items = [],
    },
    methods: {
        adding: function (child_1) {
            let product, price, table
            table = document.getElementsByClassName("table")[0];
            product = table.children[0].children[child_1].children[0].outerText;
            price = table.children[0].children[child_1].children[1].outerText;
            cart_items.push(product)
            cart_count.push(parseInt(price))
            return document.getElementsByClassName("current_items")[0].innerHTML += `&nbsp ${product}`
        },

        removing: function () {
            let a = document.getElementsByClassName("current_items")[0].innerHTML;
            let removeElement = a.slice(0, -1);
            cart_count.pop()
            cart_items.pop()
            document.getElementsByClassName("current_items")[0].innerHTML = removeElement;
        },
    }
})



