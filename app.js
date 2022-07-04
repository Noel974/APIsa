const express = require('express');

const app = express();

app.use((req, res, next)=> {
    console.log('Requete reçue!');
    next();
});

app.use((req, res, next)=>{
    res.status(201);
    next();
});

app.use((req, res)=> {
    res.json ({message: 'votre rquete a bien recue !'})
});

app.use((req, res)=> {
    console.log ('Response envoyée avec sucès')
})

module.exports = app; 