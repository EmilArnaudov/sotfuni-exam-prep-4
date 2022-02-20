const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function getUserReservations(userId) {
    const user = await User.findById(userId).lean();

    let hotels = await Hotel.find({_id: {$in: user.bookedHotels}}).lean();
    hotels = hotels.map(x => {return {name: x.name}})

    return hotels;
}

module.exports = {
    getUserReservations,
}