class Order {
    static lastID = 0;

    #id;
    #productId;
    #productName;
    #quantity;
    #date;
    #status;
    #customerName;

    constructor(productId, productName, quantity, date, status, customerName) {
        this.#id = ++Order.lastID;
        this.#productId = productId;
        this.#productName = productName;
        this.#quantity = quantity;
        this.#date = date;
        this.#status = status;
        this.#customerName = customerName;
    }

    set orderDate(_date) {
        if (_date instanceof Date && !isNaN(_date)) {
            this.#date = _date;
        } else {
            this.#date = new Date();
        }
    }

    set status(_status) {
        if (_status.trim() === "") {
            this.#status = "No status";
        } else {
            this.#status = _status.trim();
        }
    }

    set customerName(_customerName) {
        if (_customerName.trim() === "") {
            this.#customerName = "No customer name";
        } else {
            this.#customerName = _customerName.trim();
        }
    }

    get id() {
        return this.#id;
    }

    get productId() {
        return this.#productId;
    }

    get productName() {
        return this.#productName;
    }

    get quantity() {
        return this.#quantity;
    }

    get date() {
        return this.#date;
    }

    get status() {
        return this.#status;
    }

    get customerName() {
        return this.#customerName;
    }

    getOrder() {
        return {
            id: this.#id,
            productId: this.#productId,
            productName: this.#productName,
            quantity: this.#quantity,
            date: this.#date,
            status: this.#status,
            customerName: this.#customerName,
        };
    }
}
let orders = [
    { products: [product[1], product[2], product[6]], date: new Date('2024-01-20'), status: 'pending', customerName: 'ahmed' },
    { products: [product[4], product[9], product[14]], date: new Date('2024-01-22'), status: 'pending', customerName: 'ali' },
    { products: [product[7], product[8]], date: new Date('2024-01-05'), status: 'pending', customerName: 'mohamed' },
    { products: [product[10], product[15], product[14]], date: new Date('2024-01-27'), status: 'pending', customerName: 'ismail' },
    { products: [product[17]], date: new Date('2024-01-27'), status: 'pending', customerName: 'hatem' },
];
export { Order };
