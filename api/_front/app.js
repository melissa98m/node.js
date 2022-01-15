//Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const twig = require('twig');
//Variable globales
const app = express()
const port = 8081

//Middlewares
app.use(morgan)
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
app.get('/' , (req, res) => {
   res.render('index.twig', {
       name: req.params.name,
   })
})

//Lancement de l'app
app.listen(port, () => console.log('listening on port 8081'))
