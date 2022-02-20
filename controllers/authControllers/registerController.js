const router = require('express').Router();
const auth = require('../../services/authServices');
const {TOKEN_COOKIE_NAME} = require('../../constants');
const createErrorMessage = require('../../utils/errorMessage');

router.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }

    res.render('register');
});

router.post('/', async (req, res) => {
    const { email, username, password, rePassword } = req.body;

    try {

        let user = await auth.register(email, username, password, rePassword);
        let token = await auth.createToken(user);

        res.cookie(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
        });

        return res.redirect('/')

    } catch (error) {
        console.log(error);
        // let errorMessages = createErrorMessage(Object.keys(error.errors));
        res.render('register', {})
    }

})

module.exports = router;