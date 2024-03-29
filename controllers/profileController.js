const { isAuthenticated } = require('../middlewares/authMiddleware');
const { getUserReservations } = require('../services/userServices');

const router = require('express').Router();

router.use(isAuthenticated)

router.get('/:id', async (req, res) => {
    const bookedHotels = await getUserReservations(req.user._id);
    console.log(bookedHotels);

    res.render('profile', {bookedHotels})
})

module.exports = router;