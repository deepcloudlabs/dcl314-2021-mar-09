//region express configuration
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = 6400;
const api = express();

api.use(bodyParser.json({limit: "1mb"}));
api.use(logger('dev'));
api.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, POST, PUT, DELETE, PATCH, GET");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
})
//endregion

//region mongo connection
const mongoose = require("mongoose");
const mongodb_url = "mongodb://localhost:27017/world";
const mongodb_opts = {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useCreateIndex": true,
    "useUnifiedTopology": true
};
mongoose.connect(mongodb_url, mongodb_opts);
//endregion

//region Schemas
let CitySchema = new mongoose.Schema({
    "_id": Number,
    "name": String,
    "population": Number
});
let CountrySchema = new mongoose.Schema({
    "_id": String,
    "continent": {
        type: String,
        required: false,
        default: "Africa",
        enum: ["Asia", "Africa", "Europe", "Oceania", "Antarctica",
            "North America", "South America"]
    },
    "name": {
        type: String,
        required: true
    },
    "population": {
        type: Number,
        required: false
    },
    "surfaceArea": {
        type: Number,
        required: false
    },
    "cities": [CitySchema]
})
let Country = mongoose.model('countries1', CountrySchema);
//endregion

//region rest api
// http://localhost:6400/world/api/v1/continents
api.get("/world/api/v1/continents", async (req,res) => {
    Country.distinct("continent",(err, continents)=>{
        res.set("Content-Type", "application/json");
        res.status(200).send(continents);
    })
});

// http://localhost:6400/world/api/v1/countries?continent=Asia
api.get("/world/api/v1/countries", async (req,res) => {
    let continent = req.query.continent || "Asia";
    Country.find({"continent": continent} ,(err, countries)=>{
        res.set("Content-Type", "application/json");
        res.status(200).send(countries);
    })
});

api.listen(port);
//endregion
