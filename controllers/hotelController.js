const { addHotel } = require('../services/hotelServices');
const createErrorMessage = require('../utils/errorMessage');

const router = require('express').Router();

router.get('/details/:id', async (req, res) => {
    const hotelId = req.params.id;

    const hotel = await getHotelDetails(hotelId);
})


router.get('/add', (req, res) => {
    res.render('create');
})

router.post('/add', async (req, res) => {
    let hotelData = req.body;
    hotelData.owner = req.user._id;

    try {
        let hotel = await addHotel(hotelData);
        console.log(hotel);
        return res.redirect('/')
    } catch (error) {
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        res.render('create', {errorMessages})
    }
})

module.exports = router;