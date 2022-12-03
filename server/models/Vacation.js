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

exports.Vacation = Vacation;