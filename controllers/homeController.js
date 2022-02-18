const router = require('express').Router();
const { getAvailableHotels } = require('../services/hotelServices')

router.get('/', async (req, res) => {
   const hotels = await getAvailableHotels();
   console.log(hotels);

   res.render('home', {hotels});
})

module.exports = router;