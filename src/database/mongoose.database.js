const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanegercluster.e9lkqko.mongodb.net/?retryWrites=true&w=majority&appName=TaskManegerCluster`
        )
        .then((res) => console.log("Connected to MongoDB!"))
        .catch((err) => console.log(err));
};

module.exports = connectToDatabase;
