class Food {
    constructor(meal) {
        this._type = meal.type;
        if (this._type === undefined) {
            throw new Error('Unknown type of meal')
        }
        this._price = meal.price;
        this._calories = meal.calories;
    }
    get Price () {
        return this._price
    }
    get Calories () {
        return this._calories
    }
    get Type () {
        return this._type
    }

}

class Hamburger extends Food {
    constructor(meal, stuffing) {
        super(meal);
        this._stuffing = stuffing;
        if (this._stuffing === undefined) {
            throw new Error('You should choose stuffing')
        }
        this._size = meal.size;
        this._type = meal.type + ' with ' + stuffing.type;
        this._price = meal.price + stuffing.price;
        this._calories = meal.calories + stuffing.calories;

    }
    get Size () {
        return this._size;
    }
    get Stuffing () {
        return this._stuffing.type;
    }
}
class Salad extends Food {
    static defaultWeight = 100;
    constructor(meal, weight = 100) {
        super(meal);
        this._weight = weight;
        if (this._weight <= 0) {
            throw new Error('Incorrect weight of salad');
        }
        this._price = meal.price * this._weight / Salad.defaultWeight;
        this._calories = meal.calories * this._weight / Salad.defaultWeight;
    }

    get Weight () {
        return this._weight;
    }
}
class Drinks extends Food {
    constructor(meal) {
        super(meal);
    }
}
class Order {
    constructor() {
        this._orderList = [];
        this.isPaid = false;
        this._totalPrice = 0;
        this._totalCalories = 0;
    }
    add (position, quantity = 1) {
        if (this.isPaid) {
            throw new Error('You can not change order. It is already paid');
        }
        for (let i = 0; i < quantity; i++) {
            this._orderList.push(position);
        }
    }
    removeByName (name, quantuty = 1) {
        if (this.isPaid) {
            throw new Error('You can not change order. It is already paid');
        }
        let index = this._orderList.findIndex(item => item === name);
        if (index !== -1) {
            this._orderList.splice(index, quantuty);
        }
    }
    removeByIndex (index) {
        if (this.isPaid) {
            throw new Error('You can not change order. It is already paid');
        }
        if (index !== -1) {
            this._orderList.splice(index, 1);
        }
    }
    get CalculateTotalPrice () {
        return this._totalPrice = this._orderList.reduce((acc, item) =>
            acc + item._price, 0)
    }
    get CalculateTotalCalories () {
        return this._totalCalories = this._orderList.reduce((acc, item) =>
            acc + item._calories, 0)
    }
    get OrderList () {
        return this._orderList;
    }
    pay () {
        this.isPaid = true;
    }
}

// Test

const smallHamWithPotato = new Hamburger(SMALL, POTATO);
console.log(smallHamWithPotato.Type); //Small Hamburger with potato
console.log(smallHamWithPotato.Size); // small
console.log(smallHamWithPotato.Stuffing); // potato

const olivierSalad150 = new Salad(OLIVIER, 150);
console.log(olivierSalad150.Price) // 75
console.log(olivierSalad150.Weight) // 150

const coffeeDrink = new Drinks(COFFEE)
console.log(coffeeDrink.Calories) // 20

const orderTest = new Order()
orderTest.add(smallHamWithPotato, 2);
orderTest.add(olivierSalad150, 3);
orderTest.add(coffeeDrink);
console.log(orderTest.OrderList); // [Hamburger, Hamburger, Salad, Salad, Salad, Drinks]
orderTest.removeByName(olivierSalad150, 2)
console.log(orderTest.OrderList); // [Hamburger, Hamburger, Salad, Drinks]
// orderTest.pay();
// orderTest.removeByIndex(3) // error
console.log(orderTest.CalculateTotalPrice) // 285
console.log(orderTest.CalculateTotalCalories) // 200