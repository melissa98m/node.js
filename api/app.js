const {success, error} = require('functions')
const express = require('express');
const app = express();
const morgan = require('morgan');


const users = [
    {
        id: 1,
        name: "Mélissa"
    },
    {
        id: 2,
        name: "John"
    },
    {
        id: 3,
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
let UsersRouter = express.Router()

app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

UsersRouter.route('/')
    //GET all user
    .get((req, res) => {
        if (req.query.max != undefined && req.query.max > 0) {
            res.json(success(users.slice(0, req.query.max))) //permet de mettre un nombre de resultat voulu

        } else if (req.query.max != undefined) {
            res.json(error('Wrong value'))

        } else {
            res.json(success(users))
        }
    })
    //POST one user
    .post((req, res) => {
        if (req.body.name) {
            let sameName = false
            for (let i = 0; i < users.length; i++) {
                if (users[i].name == req.body.name) {
                    res.json(error("Name already in use"))
                    sameName = true
                    break
                }
            }
            if (sameName) {
                res.json(error("Name already in use"))
            } else {
                let user = {
                    id: createId(),
                    name: req.body.name
                }
                users.push(user)
                res.json(success(user))
            }
        } else {
            res.json(error('No name value'))
        }
    })

UsersRouter.route('/:id') //Routeur
    //GET one member with id
    .get((req, res) => {
        let index = getIndex(req.params.id);
        if (typeof (index) == 'string') {
            res.json(error(index))
        } else {
            res.json(success(users[index]))
        }
    })
    //PUT modify one user with id
    .put((req, res) => {
        let index = getIndex(req.params.id);
        if (typeof (index) == 'string') {
            res.json(error(index))
        } else {
            let same = false
            for (let i = 0; i < users.length; i++) {
                if (req.body.name == users[i].name && req.params.id != users[i].id) {
                    same = true
                    break
                }
            }
            if (same) {
                res.json(error('Same name'))

            } else {
                users[index].name = req.body.name
                res.json(success(true))
            }
        }
    })
    //DELETE one user
    .delete((req, res) => {

        let index = getIndex(req.params.id);
        if (typeof (index) == 'string') {
            res.json(error(index))
        } else {
            users.splice(index, 1)
            res.json(success(users))
        }
    })

app.use('/api/v1/users', UsersRouter)

app.listen('8080', () => {
    console.log('listening on 8080')
})

function getIndex(id) {  //fonction pour avoir l'index
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return i
        }
    }
    return "Wrong id"
}

function createId() {
    return lastUser = users[users.length - 1].id + 1

}






