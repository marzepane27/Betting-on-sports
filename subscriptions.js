const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

async function createSubscription(userId, type) {
    const subscription = new Subscription({ userId, type });
    return subscription.save();
}

module.exports = { createSubscription };
