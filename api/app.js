const express = require('express');
const app = express();
const morgan = require('morgan');



const users = [
    {
        id: 1,
        name: "Mélissa"
    },
    {
        id:2,
        name: "John"
    },
    {
        id:3,
        name: "Fabien"
    }
]

//middlewere programe qui s'execute avant le reste
/*app.use((req , res , next) => {
    console.log('URL :' + req.url) //retourne dans le terminale l'url de la requete
    next();
})
app.use(morgan('dev'))

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
*/

app.use(morgan('dev'))

app.get('/api/v1/users/:id' , (req , res) => {
    res.send(users[(req.params.id)-1].name)
})

app.get('/api/v1/users' , (req , res)=>{
    if(req.query.max != undefined && req.query.max > 0){
        res.send(users.slice(0, req.query.max)) //permet de mettre un nombre de resultat voulu

    }else {
        res.send(users)
    }
})
app.listen('8080', () => {
    console.log('listening on 8080')
})




