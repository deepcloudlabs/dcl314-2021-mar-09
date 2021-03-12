class LineItem {
    constructor(item) {
        this.isbn = item.isbn;
        this.title = item.title;
        this.price = item.price;
        this.quantity = ko.observable(item.quantity);
        this.total = ko.computed(() => {
            return Number(this.price) * Number(this.quantity());
        })
    }
};

class BamViewModel {
    constructor() {
        this.items = ko.observableArray([]);
        this.volume = ko.computed(() => {
            return this.items().map(item => item.total()).reduce((sum, vol) => sum + vol, 0.0);
        })
        this.quantity = ko.computed(() => {
            return this.items().map(item => item.quantity()).reduce((sum, q) => sum + q, 0);
        })
        this.data = {
            labels: ko.observableArray([]),
            datasets: [
                {
                    label: ['Cumulative Volume'],
                    backgroundColor: "rgba(220,220,220,0.2)",
                    borderColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: ko.observableArray([])
                },
                {
                    label: ["New Order's Volume"],
                    backgroundColor: "rgba(220,220,220,0.2)",
                    borderColor: "rgba(20,20,100,1)",
                    pointColor: "rgba(20,20,120,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(20,20,120,1)",
                    data: ko.observableArray([])
                }
            ]
        };
        this.connect = this.connect.bind(this);
        this.addItem = this.addItem.bind(this);
        this.reset = this.reset.bind(this);
    }

    addItem(item) {
        for (let lineItem of this.items()) {
            if (item.isbn === lineItem.isbn) {
                lineItem.quantity(lineItem.quantity() + item.quantity);
                return;
            }
        }
        this.items.push(new LineItem(item))
    }

    reset() {
        this.items([]);
        this.data.datasets[0].data([]);
        this.data.datasets[1].data([]);
    }

    connect() {
        this.socket = io(AppConfig.WS_URL);
        this.socket.on("connect", () => {
            toastr.success("Connected to the server!", "", AppConfig.TOASTR_CONFIG);
            this.socket.on("order", order => {
                toastr.success("New order has arrived!", "", AppConfig.TOASTR_CONFIG);
                order.lines.forEach(item => this.addItem(item));
                let total = order.lines.map(item => item.price * item.quantity).reduce((sum, vol) => sum + vol, 0.0);
                this.data.datasets[0].data.push(this.volume());
                this.data.datasets[1].data.push(total);
                let now = new Date().toTimeString();
                now = now.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
                this.data.labels.push(now);
            })
        })
    }
}

let bamViewModel = new BamViewModel();
window.onload = () => {
    ko.applyBindings(bamViewModel);
    bamViewModel.connect();
}