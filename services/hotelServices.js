const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function getAvailableHotels() {
    return Hotel.find({}).lean(); 
};

async function addHotel(data) {
    const {name, city, image, freeRooms, owner} = data;

    const hotel = new Hotel({name, city, image, freeRooms, owner});

    return hotel.save();
}

async function editHotel(hotelId, data) {
    const {name, city, image, freeRooms} = data;

    return Hotel.findOneAndUpdate({_id: hotelId}, {name: name, city: city, image: image, freeRooms: freeRooms}, {runValidators: true});
}

async function bookHotel(hotelId, userId) {
    
    await Promise.all([
        Hotel.findOneAndUpdate({_id: hotelId}, {$push: {bookedUsers: userId}, $inc: {freeRooms: -1}}, {runValidators: true}),
        User.findOneAndUpdate({_id: userId}, {$push: {bookedHotels: hotelId}}, {runValidators: true}),
    ]);
}

async function getHotelDetails(hotelId, user) {
    const hotel = await Hotel.findById(hotelId).lean();
    hotel.bookedUsers = hotel.bookedUsers.map(x => x.toString());
        
    if (!user) {
        return hotel;
    }

    user.isOwner = false;
    user.hasBooked = false;

    if (hotel.owner === user._id) {
        user.isOwner = true;
    }

    if (hotel.bookedUsers.includes(user._id)) {
        user.hasBooked = true;
    }

    return [hotel, user]
}

module.exports = {
    getAvailableHotels,
    addHotel,
    getHotelDetails,
    editHotel,
    bookHotel,
}