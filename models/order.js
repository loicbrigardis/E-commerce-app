const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', CartItemSchema);

const OrderSchema = new mongoose.Schema({
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    updated: Date,
    user: { type: mongoose.Schema.ObjectId, ref: "User" }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

OrderSchema.plugin(beautifyUnique);

module.exports = { Order, CartItem }