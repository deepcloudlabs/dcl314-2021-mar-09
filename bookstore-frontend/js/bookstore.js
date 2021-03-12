class LineItem {
    constructor(book) {
        this.isbn = book._id;
        this.price = book.price;
        this.title = book.title;
        this.quantity = ko.observable(1).extend({
            required: true,
            min: 1
        });
    }
};

class Order {
    constructor() {
        this.lines = ko.observableArray([]);
        this.totalPrice = ko.computed(()=>{
           return this.lines().map( item => Number(item.price)*Number(item.quantity()))
                              .reduce((sum,total) => sum+total, 0.0);
        });
        this.formInvalid = ko.computed(()=>{
            for (let item of this.lines()){
                if (! item.quantity.isValid())
                    return true;
            }
            return false;
        })
        this.addToBasket = this.addToBasket.bind(this);
        this.clear = this.clear.bind(this);
        this.removeFromBasket = this.removeFromBasket.bind(this);
    }

    clear(){
        this.lines([]);
    }

    addToBasket(book) {
        for (let item of this.lines()){
            if (item.isbn === book._id){
                item.quantity(item.quantity()+1);
                return;
            }
        }
        this.lines.push(new LineItem(book));
    }

    removeFromBasket(item) {
       this.lines(this.lines().filter( lineItem => lineItem.isbn !== item.isbn));
    }
}

class BookStoreViewModel {
    constructor() {
        this.books = ko.observableArray([]);
        this.order = new Order();
        this.retrieveBooks = this.retrieveBooks.bind(this);
        this.purchase = this.purchase.bind(this);
    }

    purchase(){
        let order = ko.toJS(this.order);
        fetch(`${AppConfig.REST_API_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        }).then(res => res.json())
            .then(res => {
                toastr.success("Order is successfully handled.", "", AppConfig.TOASTR_CONFIG);
                this.order.clear();
            })
    }

    retrieveBooks() {
        fetch(`${AppConfig.REST_API_BASE_URL}/books?page=0&size=100`)
            .then(res => res.json())
            .then(books => {
                this.books(books);
                toastr.success("The books has been retrieved.", "", AppConfig.TOASTR_CONFIG);
            })
    }
}


let bookStoreViewModel = new BookStoreViewModel();
window.onload = () => {
    ko.validation.init({
        decorateElement: true,
        decorateElementOnModified: true,
        insertMessages: true,
        errorElementClass: 'text-danger',
        errorMessageClass: 'help-block text-danger'
    }, true);
    knockoutLocalize('en');
    ko.applyBindings(bookStoreViewModel);
    bookStoreViewModel.retrieveBooks();
}