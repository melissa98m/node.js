//Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const twig = require('twig');
const axios = require('axios');
const {error} = require("../assets/functions");
//Variable globales
const app = express()
const port = 8081
const fetch = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

//Middlewares
app.use(morgan)
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
//Page accueil
app.get('/', (req, res) => {
    res.render('index.twig', {
        name: req.params.name,
    })
})
//Page tout les users
app.get('/users/', (req, res) => {
    apiCall(req.query.max ? '/users?max='+req.query.max :'/users', res, (result) => {
        res.render('users.twig', {
            users: result
        })
    })
})
//Page d'un user
app.get('/users/:id', (req, res) => {
    apiCall('/users/' + req.params.id, res, (result) => {
        res.render('oneUser.twig', {
            user: result
        })
    })
})
//Lancement de l'app
    app.listen(port, () => console.log('listening on port 8081'))

//Functions
    function renderError(res, errMsg) {
        res.render('error.twig', {
            errorMsg: errMsg
        })
    }
        function apiCall(url, res, next) {
            fetch.get(url)
                .then((response) => {
                    if (response.data.status == 'success') {
                        next(response.data.result)
                    } else {
                        renderError(res, response.data.message)
                    }
                })
                .catch((err) => {
                    renderError(res, err.message)
                })

        }

