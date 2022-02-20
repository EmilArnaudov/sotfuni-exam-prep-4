const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/, 'Please enter a valid email.']
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
        validate: /^[a-zA-Z0-9]+$/,
        minlength: [5, 'Password should be at least 5 characters.']
    },
    
    bookedHotels: [{
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    }],

    offeredHotels: [{
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    }],
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;

            next();
        })
})


const User = mongoose.model('User', userSchema);



module.exports = User;