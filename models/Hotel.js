const mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Hotel name cannot be less than 4 characters.']
    },

    city: {
        type: String,
        required: true,
        minlength: [3, 'City name cannot be less than 3 characters.']
    },

    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\/.+$/, 'Your hotel image must be a valid link.']
    },

    freeRooms: {
        type: Number,
        required: true,
        min: [0, 'Hotel cannot have less than 0 free rooms.'],
        max: [100, 'Hotel cannot have more than 100 free rooms.'],
    },

    bookedUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    }
})

const Hotel = mongoose.model('Hotel', hotelSchema);



module.exports = Hotel;