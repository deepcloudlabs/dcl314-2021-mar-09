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
        enum: ["Asia","Africa", "Europe", "Oceania", "Antarctica",
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

Country.find({"continent": "Asia"},
            (err,asianCountries) => {
                   asianCountries.forEach( ctry => console.log(ctry.name));
            }
);