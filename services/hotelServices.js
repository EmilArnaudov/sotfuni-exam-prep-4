const Hotel = require('../models/Hotel');

async function getAvailableHotels() {
    return Hotel.find({}).lean(); 
};

async function addHotel(data) {
    const {name, city, image, freeRooms, owner} = data;

    const hotel = new Hotel({name, city, image, freeRooms, owner});

    return hotel.save();
}

async function getHotelDetails(hotelId) {
    return Hotel.findById(hotelId).lean();
}

module.exports = {
    getAvailableHotels,
    addHotel,
    getHotelDetails,
}