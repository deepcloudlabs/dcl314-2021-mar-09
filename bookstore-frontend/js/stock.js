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
        this.update = this.update.bind(this);
    }

    update(book) {
        //reflection
        for (let field in book) {
            if (this.hasOwnProperty(field)) {
                let value = book[field];
                this[field](value);
            }
        }
    }
}

class StockViewModel {
    constructor() {
        this.book = new Book({});
        this.books = ko.observableArray([]);
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
        });
        this.findBook = this.findBook.bind(this);
        this.retrieveBooks = this.retrieveBooks.bind(this);
        this.addBook = this.addBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.deleteRowBook = this.deleteRowBook.bind(this);
        this.updateRowBook = this.updateRowBook.bind(this);
    }

    findBook() {
        fetch(`${AppConfig.REST_API_BASE_URL}/books/${this.book.isbn()}`)
            .then(res => res.json())
            .then(book => {
                this.book.update(book);
                this.fileData().dataUrl(book.coverPhoto);
                toastr.success("The books has been retrieved.", "", AppConfig.TOASTR_CONFIG);
            })
    }

    retrieveBooks() {
        fetch(`${AppConfig.REST_API_BASE_URL}/books?page=0&size=100`)
            .then(res => res.json())
            .then(books => {
                books.forEach(book => book.price = ko.observable(book.price));
                books.forEach(book => book.quantity = ko.observable(book.quantity));
                this.books(books);
                toastr.success("The books has been retrieved.", "", AppConfig.TOASTR_CONFIG);
            })
    }

    addBook() {
        let book = ko.toJS(this.book);
        book._id = book.isbn;
        book.coverPhoto = this.fileData().dataUrl();
        delete book.isbn;
        fetch(`${AppConfig.REST_API_BASE_URL}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        }).then(res => res.json())
            .then(res => {
                toastr.success("The book has been inserted to the stock.", "", AppConfig.TOASTR_CONFIG);
            })
    }

    updateBook() {
        let book = ko.toJS(this.book);
        book._id = book.isbn;
        book.coverPhoto = this.fileData().dataUrl();
        delete book.isbn;
        fetch(`${AppConfig.REST_API_BASE_URL}/books/${this.book.isbn()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        }).then(res => res.json())
            .then(res => {
                toastr.success("The book has been updated in the stock.", "", AppConfig.TOASTR_CONFIG);
            })
    }

    deleteBook() {
        fetch(`${AppConfig.REST_API_BASE_URL}/books/${this.book.isbn()}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(book => {
                this.book.update(book);
                this.fileData().dataUrl(book.coverPhoto);
                toastr.success("The book has been removed from the stock.", "", AppConfig.TOASTR_CONFIG);
            })
    }

    updateRowBook(book) {
        let updatedBook = ko.toJS(book);
        fetch(`${AppConfig.REST_API_BASE_URL}/books/${updatedBook._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBook)
        }).then(res => res.json())
            .then(res => {
                toastr.success("The book has been updated in the stock.", "", AppConfig.TOASTR_CONFIG);
            })
    }

    deleteRowBook(book) {
        fetch(`${AppConfig.REST_API_BASE_URL}/books/${book._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(book => {
                this.book.update(book);
                this.fileData().dataUrl(book.coverPhoto);
                this.books( this.books().filter( bk => bk._id !== book._id ) );
                toastr.success("The book has been removed from the stock.", "", AppConfig.TOASTR_CONFIG);
            })
    }

}

let stockViewModel = new StockViewModel();
window.onload = () => {
    ko.applyBindings(stockViewModel);
}