
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

}