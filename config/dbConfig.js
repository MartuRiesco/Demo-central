const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI

);

const connection = mongoose.connection;


connection.on('connected', () => { 
    console.log('Database connected');
});

connection.on('error', (error) => {
    console.log('Error in MongoDb connection', error);
});

module.exports = mongoose;


