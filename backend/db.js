const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

// MongoDB URI (include the database name at the end)
const mongoURI =process.env.DB_LINK;

// Function to connect to MongoDB
const connectToMongo = async () => {  
  try {
    await mongoose.connect(mongoURI, {
     
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

module.exports = connectToMongo;
