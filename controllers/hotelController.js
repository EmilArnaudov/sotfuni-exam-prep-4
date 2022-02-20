const Hotel = require('../models/Hotel');
const { addHotel, editHotel, getHotelDetails, bookHotel } = require('../services/hotelServices');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const createErrorMessage = require('../utils/errorMessage');

const router = require('express').Router();

router.use(isAuthenticated)

router.get('/delete/:id', async (req, res) => {
    const hotelId = req.params.id;
    await Hotel.findByIdAndDelete(hotelId);

    return res.redirect('/');
})

router.get('/book/:id', async (req, res) => {
    const hotelId = req.params.id;
    const userId = req.user._id;

    try {
        await bookHotel(hotelId, userId)
        const hotelData = await getHotelDetails(hotelId, req.user);
        res.locals.hotel = hotelData[0];
        res.locals.user = hotelData[1];

        return res.redirect(`/hotels/details/${hotelId}`); 
    } catch (error) {
        console.log(error);
    }
})

router.post('/edit/:id', async (req, res) => {
    const hotelId = req.params.id;
    const hotelData = req.body;

    try {
        await editHotel(hotelId, hotelData);
        return res.redirect('/')
    } catch (error) {
        let hotel = await Hotel.findById(hotelId).lean();
        let errorMessages = createErrorMessage(error);
        res.render('edit', {hotel, errorMessages})
    }
})

router.get('/edit/:id', async (req, res) => {
    const hotelId = req.params.id;

    const [hotel, user] = await getHotelDetails(hotelId, req.user);

    res.render('edit', {hotel})
})

router.get('/details/:id', async (req, res) => {
    const hotelId = req.params.id;

    const [hotel, user] = await getHotelDetails(hotelId, req.user);

    res.render('details', {hotel, user})
})


router.get('/add', (req, res) => {
    res.render('create');
})

router.post('/add', async (req, res) => {
    let hotelData = req.body;
    hotelData.owner = req.user._id;

    try {
        let hotel = await addHotel(hotelData);
        return res.redirect('/')
    } catch (error) {
        let errorMessages = createErrorMessage(error);
        res.render('create', {errorMessages})
    }
})

module.exports = router;