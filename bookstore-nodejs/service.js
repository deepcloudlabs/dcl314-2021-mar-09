require("./utility");

//region domain model using mongoose ✔
const mongoose = require("mongoose");
const mongodb_url = "mongodb://localhost:27017/bookstore";
const mongodb_opts = {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useCreateIndex": true,
    "useUnifiedTopology": true
};
mongoose.connect(mongodb_url, mongodb_opts);

const updatableBookFields = [
    "publisher", "price", "quantity", "coverPhoto"
];

const bookSchema = new mongoose.Schema({
    "_id": { // isbn
        type: String,
        required: true
    },
    "title": {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    "author": {
        type: String,
        required: true
    },
    "year": {
        type: Number,
        required: true,
        max: 2021
    },
    "publisher": {
        type: String,
        required: true
    },
    "edition": {
        type: Number,
        required: false,
        min: 1,
        default: 1
    },
    "price": {
        type: Number,
        required: true,
        min: 5
    },
    "quantity": {
        type: Number,
        required: true,
        min: 0
    },
    "coverPhoto": {
        // if it is more than ~16 MB -> GridFS -> Data + MetaData ( JSON Document )
        // MongoDB: maximum document size is 16MB (hard limit)
        type: String,
        required: false,
        default: AppConfig.NO_IMAGE
    }
});
let Book = mongoose.model("books", bookSchema);
//endregion

//region express configuration ✔
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = 7200;
const api = express();

api.use(bodyParser.json({limit: "5mb"}));
api.use(logger('dev'));
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, POST, PUT, DELETE, PATCH, GET");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
})
//endregion

//region book stock rest over http api : express.js ✔
// REST API: Resource -> Book -> books
//         ✔  1. GET, POST, PUT/PATCH,  DELETE
//            2. URL Design: http(s)://localhost:7200
//                           protocol://ip:port /resource/path
//                  i. path variable -> :isbn
//                 ii. query parameter -> /books?page=10&size=25
//                         page, size -> query parameter
//         ✔  3. Representation: application/json, application/xml, ...
api.get("/books/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    Book.findOne(
        {"_id": isbn},
        {"coverPhoto": false},
        (err, book) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(404).send({status: "failed", reason: err});
            } else {
                res.status(200).send(book);
            }
        }
    )
})

api.get("/books/:isbn/cover", (req, res) => {
    let isbn = req.params.isbn;
    Book.findOne(
        {"_id": isbn},
        {"coverPhoto": true, "_id": false},
        (err, book) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(404).send({status: "failed", reason: err});
            } else {
                res.status(200).send(book);
            }
        }
    )
})

// http://localhost:7200/books?page=10&size=25
api.get("/books", (req, res) => {
    let page = Number(req.query.page || 0);
    let size = Number(req.query.size || 25);
    let offset = page * size;
    Book.find(
        {},
        {coverPhoto: false},
        {skip: offset, limit: size},
        (err, books) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(404).send({status: "failed", reason: err});
            } else {
                res.status(200).send(books);
            }
        }
    )
})

api.post("/books", (req, res) => {
    let book = req.body;
    let entity = new Book(book);
    entity.save((err, newBook) => {
        res.set("Content-Type", "application/json");
        if (err) {
            res.status(404).send({status: "failed", reason: err});
        } else {
            res.status(200).send({"status": "ok"});
        }
    })
})

function patchOrPut(req, res) {
    let book = req.body;
    let isbn = req.params.isbn;
    let updatedBook = {};
    // reflection
    for (let field in book) {
        if (updatableBookFields.includes(field)) {
            updatedBook[field] = book[field];
        }
    }
    Book.update(
        {_id: isbn},
        {$set: updatedBook},
        {upsert: false},
        (err, newBook) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(404).send({status: "failed", reason: err});
            } else {
                res.status(200).send({"status": "ok"});
            }
        }
    )
}

api.put("/books/:isbn", (req, res) => {
    patchOrPut(req, res);
})

api.patch("/books/:isbn", (req, res) => {
    patchOrPut(req, res);
})

api.delete("/books/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    Book.findOneAndDelete({
            "_id": isbn
        }, {coverPhoto: false},
        (err, removedBook) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(404).send({status: "failed", reason: err});
            } else {
                res.status(200).send(removedBook);
            }
        })
})

//endregion ✔

//region bookstore rest over http api : express.js

//endregion

//region websocket/socket.io configuration

//endregion

//region bam (business activity monitoring) rest over ws api : socket.io

//endregion

api.listen(port);