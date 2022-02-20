const router = require('express').Router();
const { getAvailableHotels } = require('../services/hotelServices')

router.get('/', async (req, res) => {
   let hotels = await getAvailableHotels();
   hotels = hotels.sort((a, b) => b.freeRooms - a.freeRooms);

   res.render('home', {hotels});
})

module.exports = router;