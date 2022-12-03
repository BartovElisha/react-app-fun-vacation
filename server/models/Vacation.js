const mongoose = require('mongoose');

const vacationSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
});

const Vacation = mongoose.model('Vacation', vacationSchema);

/* Created Object 
    Vacation {
        data: value,
        location: value,
        price: value,
        _id: value, --> Added by mongo DB automaticly
        __v: value  -> Added by mongo DB automaticly Version
    }
*/

exports.Vacation = Vacation;