
let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Users
}
let Users = class {

    static getById(id) {
        return new Promise((next) => {
            db.query("SELECT * FROM users WHERE id= ?", [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        next(result[0])
                    } else {
                        next(new Error("Wrong id value"))
                    }
                })
                .catch((err) => next(err))
        })
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max != undefined && max > 0) {
                db.query('SELECT * FROM users LIMIT 0,?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            } else if (max != undefined) {
                next(new Error('Wrong value'))
            } else {
                db.query('SELECT * FROM users')
                    .then((result) => next(result))
                    .catch((err) => next(err))
            }
        })

    }
}