const homeController = require('./controllers/homeController');
const loginController = require('./controllers/authControllers/loginController');
const registerController = require('./controllers/authControllers/registerController');
const logoutController = require('./controllers/authControllers/logoutController');
const hotelController = require('./controllers/hotelController');
const profileController = require('./controllers/profileController');

const router = require('express').Router();

router.use('/', homeController);
router.use('/login', loginController);
router.use('/register', registerController);
router.use('/logout', logoutController);
router.use('/hotels', hotelController);
router.use('/profile', profileController);

// router.use('/*', (req, res) => {{
//     return res.status('404').render('404');
// }})

module.exports = router;