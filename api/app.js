const {success, error , isErr , checkAndChange} = require('./assets/functions.js')
const mysql = require('promise-mysql')
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');
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
        app.use(config.rootAPI + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    UsersRouter.route('/')
            //GET all user
            .get(async (req, res) => {
                let allUsers = await Users.getAll(req.query.max)
                res.json(checkAndChange(allUsers))
            })
            //POST one user
            .post(async (req, res) => {
                let addUser = await Users.addUser(req.body.name)
                res.json(checkAndChange(addUser))
            })

        UsersRouter.route('/:id') //Routeur
            //GET one user with id
            //GET one user with id
            .get(async (req, res) => {
                let user = await Users.getById(req.params.id)
               res.json(isErr(user) ? error(user.message) : success(user))
            })
            //PUT modify one user with id
            .put(async (req, res) => {
                let updateUser = await Users.update(req.params.id, req.body.name)
                res.json(checkAndChange(updateUser))
            })
            //DELETE one user
            .delete(async (req, res) => {
                let deleteUser = await Users.delete(req.params.id)
                res.json(checkAndChange(deleteUser))
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




