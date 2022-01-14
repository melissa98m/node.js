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

    static addUser(name) {

        return new Promise((next) => {
            if (name != undefined && name.trim() != '') {
                name = name.trim()
                db.query('SELECT * FROM users WHERE name = ?', [name])
                    .then((result) => {
                        if (result[0] != undefined) {
                            next(new Error("Name already in use"))
                        } else {
                            return db.query('INSERT INTO users(name) VALUES(?)', [name])
                        }
                    })
                    .then(() => {
                        return db.query('SELECT * FROM users WHERE name = ?', [name])
                    })
                    .then((result) => {
                        next({
                            id: result[0].id,
                            name: result[0].name
                        })
                    })
                    .catch((err) => next(err))
            } else {
                next(new Error("No name value"))
            }
        })
    }

    static update(id, name) {

        return new Promise((next) => {
            if (name != undefined && name.trim() != '') {
                name = name.trim()
                db.query('SELECT * FROM users WHERE id = ?', [id])
                    .then((result) => {
                        if (result[0] != undefined) {
                            return db.query('SELECT * FROM users WHERE name = ? AND id != ?', [name, id])
                        } else {
                            next(new Error('Wrong id value'))
                        }
                    })
                    .then((result) => {
                        if (result[0] != undefined) {
                            next(new Error("Same name"))
                        } else {
                            return db.query('UPDATE users SET name = ? WHERE id = ?', [name, id])
                        }
                    })
                    .then(() => next(true))
                    .catch((err) => next(err))
            } else {
                next(new Error("No name value"))
            }
        })
    }

    static delete(id) {
        return new Promise((next) => {
            db.query("SELECT * FROM users WHERE id= ?", [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        return db.query("DELETE FROM users WHERE id = ?", [id])
                    } else {
                        next(new Error("Wrong id value"))
                    }
                })
                .then(() =>next(true))
                .catch((err) => next(err))
        })
    }
}