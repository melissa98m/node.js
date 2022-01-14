const {success, error} = require('./functions')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const config = require('./config')

const db = mysql.createConnection({
    host: 'localhost',
    database: 'nodejs',
    user: 'root',
    password: 'tiger',
})

db.connect((err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Connection established")

        const app = express();

        let UsersRouter = express.Router()

        app.use(morgan('dev'))
        app.use(express.json()) // for parsing application/json
        app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

        UsersRouter.route('/')
            //GET all user
            .get((req, res) => {
                if (req.query.max != undefined && req.query.max > 0) {
                    db.query('SELECT * FROM users LIMIT 0,?', [req.query.max], (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            res.json(success(result))
                        }
                    })
                } else if (req.query.max != undefined) {
                    res.json(error('Wrong value'))
                } else {
                    db.query('SELECT * FROM users', (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            res.json(success(result))
                        }
                    })
                }
            })
            //POST one user
            .post((req, res) => {
                if (req.body.name) {

                    db.query('SELECT * FROM users WHERE name = ?', [req.body.name], (err, result) => { //verifie si le nom est pas deja pris
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            if (result[0] != undefined) {
                                res.json(error('Name already in use'))
                            } else {
                                db.query('INSERT INTO users(name) VALUES (?)', [req.body.name], (err, result) => { //insert le nouveau user
                                    if (err) {
                                        res.json(error(err.message))
                                    } else {
                                        db.query('SELECT * FROM users WHERE name = ?', [req.body.name], (err, result) => { // on recupere ensuite sans id
                                            if (err) {
                                                res.json(error(err.message))
                                            } else {
                                                res.json(success({  //on envoi le succes avec le nom et l'id
                                                    id: result[0].id,
                                                    name: result[0].name
                                                }))
                                            }
                                        })

                                    }
                                })

                            }

                        }
                    })
                }
            })

        UsersRouter.route('/:id') //Routeur
            //GET one member with id
            .get((req, res) => {
                db.query("SELECT * FROM members WHERE id= ?", [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        if (result[0] != undefined) {
                            res.json(success(result[0]))
                        } else {
                            res.json(error("Wrong id value"))
                        }
                    }
                })

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

        app.use(config.rootAPI + '/users', UsersRouter)

        app.listen(config.port, () => {
            console.log('listening on 8080')
        })

    }
})


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










