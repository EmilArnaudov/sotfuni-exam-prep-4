const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },

    city: {
        type: String,
        required: true,
        minlength: 3,
    },

    image: {
        type: String,
        required: true,
        validate: /^https?:\/\/.+$/
    },

    freeRooms: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },

    bookedUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: String,
        required: true,
    }
}),


Hotel = mongoose.model('Hotel', hotelSchema);


module.exports = Hotel;