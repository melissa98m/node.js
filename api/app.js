const {success, error} = require('./assets/functions')
const mysql = require('promise-mysql')
const express = require('express');
const morgan = require('morgan')('dev');
const config = require('./assets/config.json')

mysql.createConnection({
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
}).then((db) => {

        console.log("Connection established")
        const app = express();

        let UsersRouter = express.Router()
        let Users = require('./assets/classes/users-class')(db, config)
        console.log(Users)

        app.use(morgan)
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
            //GET one user with id
            .get((req, res) => {
                db.query("SELECT * FROM users WHERE id= ?", [req.params.id], (err, result) => {
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
                if (req.body.name) {
                    db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, result) => { // je verifie si l'user existe
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            if (result[0] != undefined) {
                                db.query('SELECT * FROM users WHERE name = ? AND id != ?', [req.body.name, req.params.id], (err, result) => { // si il existe je verifie sont nom
                                    if (err) {
                                        res.json(error(err.message))
                                    } else {
                                        if (result[0] != undefined) { // si c'est le meme nom
                                            res.json(error("Same name"))
                                        } else { // sinon je le modifie
                                            db.query('UPDATE users SET name = ? WHERE id = ?', [req.body.name, req.params.id], (err, result) => {
                                                if (err) {
                                                    res.json(error(err.message))
                                                } else {
                                                    res.json(success(true))
                                                }
                                            })
                                        }
                                    }
                                })
                            } else {
                                res.json(error("Wrong id value"))
                            }
                        }
                    })
                } else {
                    res.json(error("No name value"))
                }
            })
            //DELETE one user
            .delete((req, res) => {
                db.query("SELECT * FROM users WHERE id= ?", [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        if (result[0] != undefined) {
                            db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
                                if (err) {
                                    res.json(error(err.message))
                                } else {
                                    res.json(success(true))
                                }
                            })
                        } else {
                            res.json(error("Wrong id value"))
                        }
                    }
                })
            })

        app.use(config.rootAPI + '/users', UsersRouter)

        app.listen(config.port, () => {
            console.log('listening on 8080')
        })

    }
).catch((err) => {
    console.log("Error during database connection")
    console.log(err.message)
})




