const os = require('os');

console.log(os.arch())  // module permettant de savoir les composant
console.log(os.homedir()) // dans quels fichier home
console.log(os.cpus())

const fs = require('fs');      //permet d'ecrit dans un fichier txt et lire
fs.readFile("test.txt", "utf8", (err, data) => {  //lis le contenue du fichier
    if (err) {
        console.log(err) //si il y a une erreur l'afficher
    } else {
        console.log(data)
        fs.writeFile("test.txt", "Hello world ca va", "utf8", (err, data) => {  //sinon ecrire dans la fichier
            fs.readFile("test.txt", "utf8", (err, data) => { // et lire le fichier
                console.log(data) //afficher le contenue du fichier
            })
        })
    }
})
const http = require('http');

http.createServer((req, res) => {   // créer un site web
    if (req.url == '/') {
        res.writeHead(200, {'Content-type': "text/html"})
        res.write("<h1>Accueil</h1>\n") // ecrit sur la page
        res.end()
    } else if (req.url == "/test") {
        fs.readFile("test.txt", "utf8", (err, data) => { // lis le fichier sur la page /test

            if (err) {
                send404(res)
            } else {
                res.writeHead(200, {'Content-type': "text/html"})
                res.write(data)
                res.end()
            }
        })
    } else {
        send404(res)
    }
}).listen(8080)

function send404(res) {
    res.writeHead(404, {'Content-type': "text/html"})
    res.write("<span style='color:red'>Error 404 </span>")
    res.end()// fin de la requete (quand on a fini d'envoyer)

}

const mod1 = require("module1");

mod1.sayHello()
mod1.sayHi()
console.log(mod1.hello)
