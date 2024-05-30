const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://riescomartina3:e9HFT9gxIMGBKrqn@cluster0.zokmrg4.mongodb.net/turnos'

);

const connection = mongoose.connection;


connection.on('connected', () => { 
    console.log('Database connected');
});

connection.on('error', (error) => {
    console.log('Error in MongoDb connection', error);
});

module.exports = mongoose;


