class Book {
    constructor(book) {
        this.isbn = ko.observable(book.isbn || "123456789");
        this.title = ko.observable(book.title || "nodejs");
        this.author = ko.observable(book.author || "jack bauer");
        this.year = ko.observable(book.year || 2020);
        this.edition = ko.observable(book.edition || 1);
        this.publisher = ko.observable(book.publisher || "a book company");
        this.price = ko.observable(book.price || 50);
        this.quantity = ko.observable(book.quantity || 100);
        this.coverPhoto = ko.observable(book.coverPhoto || AppConfig.NO_IMAGE);
    }
}

class StockViewModel {
    constructor() {
        this.book = new Book({});
        this.books = ko.observableArray([]);
        this.fileData = ko.observable({
            dataUrl : ko.observable(AppConfig.NO_IMAGE)
        });
        this.findBook = this.findBook.bind(this);
        this.retrieveBooks = this.retrieveBooks.bind(this);
        this.addBook = this.addBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    findBook() {
    }

    retrieveBooks() {
    }

    addBook() {
    }

    updateBook() {
    }

    deleteBook() {
    }

}

let stockViewModel = new StockViewModel();
window.onload = () => {
    ko.applyBindings(stockViewModel);
}