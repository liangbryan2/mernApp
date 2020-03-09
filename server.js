// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

// MONGO
const MONGODB_URI_ATLAS = 'mongodb+srv://liangbryan2:Merrychristmas@mernapp-kkhds.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// SERVER
app.use(morgan('tiny'));
app.use('/api', routes);



app.listen(PORT, console.log(`Server is starting at ${PORT}`));