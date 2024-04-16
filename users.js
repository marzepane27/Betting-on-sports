const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

async function registerUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    return newUser.save();
}

async function authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
}

module.exports = { registerUser, authenticateUser };
