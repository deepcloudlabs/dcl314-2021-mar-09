class BookStoreViewModel {
    constructor() {
        this.books = ko.observableArray([]);
        this.retrieveBooks = this.retrieveBooks.bind(this);
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
    ko.applyBindings(bookStoreViewModel);
    bookStoreViewModel.retrieveBooks();
}