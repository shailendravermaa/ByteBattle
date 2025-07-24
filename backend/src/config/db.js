const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.DB_CONNECT_STRING,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 1, // Critical for serverless
      minPoolSize: 1,
      socketTimeoutMS: 30000,
    })
}

module.exports = main;


