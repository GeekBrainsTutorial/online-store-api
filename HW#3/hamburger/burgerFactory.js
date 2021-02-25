class Param {
    name = '';
    price = 0;
    calories = 0;

    constructor(el) {
        this.name = el.value;
        ({price: this.price, cal: this.calories} = Burger.burgerParams[this.name])
    }
}

class Burger {
    static burgerParams = {
        big: {
            price: 100,
            cal: 40
        },
        small: {
            price: 50,
            cal: 20
        },
        salad: {
            price: 20,
            cal: 5
        },
        cheese: {
            price: 10,
            cal: 20
        },
        potato: {
            price: 15,
            cal: 10
        },
        mayo: {
            price: 20,
            cal: 5
        },
        spices: {
            price: 15,
            cal: 0
        }
    };

    size = null;
    add = null;
    toppings = [];

    constructor(size, add, toppings) {
        this.size = new Param(this._select(size));
        this.add = new Param(this._select(add));
        this.toppings = this._selectAll(toppings).map(el => new Param(el));
    }

    get price() {
        return this._sum('price')
    }

    get calories() {
        return this._sum('calories')
    }

    showSum(price, calories) {
        document.querySelector(price).textContent = this.price;
        document.querySelector(calories).textContent = this.calories;
    }

    _select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    _selectAll(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
    }

    _sum(value) {
        let result = this.size[value] + this.add[value];
        this.toppings.forEach(topping => result += topping[value]);
        return result;
    }
}


















