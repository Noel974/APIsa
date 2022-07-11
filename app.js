const express = require('express');

const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRoutes = require('./routes/User');

const path = require('path');

require('dotenv').config();

// connexion a la base de données mongoDB
mongoose.connect(`mongodb+srv://noel:Emmanuel@cluster0.pxrqail.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// Permet d'analyser le corps de la requête.
app.use(express.json());

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

// configuration des CORS doit être placé avant les routes de l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH', 'OPTIONS');
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')))

// configuration des routes
app.use('/api/auth', userRoutes);

module.exports = app; 