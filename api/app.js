const express = require('express');
const app = express();


app.use((req , res , next) => {
    console.log('URL :' + req.url) //retourne dans le terminale l'url de la requete
    next();
})
app.get('/api', (req, res) => {
    res.send('Root API')
})

app.get('/api/v1', (req, res) => {
    res.send('API Version 1')
})

app.get('/api/v1/user/:id', (req, res) => {
    res.send(req.params)
})

app.listen('8080', () => {
    console.log('listening on 8080')
})



