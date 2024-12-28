const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/reliefPlatform", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error", err);
    }
};

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    walletAddress: String,
    totalDonations: Number,
});

const donationSchema = new mongoose.Schema({
    donor: String,
    amount: Number,
    blockchain: String,
    timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Donation = mongoose.model("Donation", donationSchema);

module.exports = { connectDB, User, Donation };
