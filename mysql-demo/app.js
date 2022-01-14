const mysql = require('mysql')
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
        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log(result[0].name)
            }
        })
    }
})

