/*Asychrome gerer les asy
console.log("Debut")
//Callbacks (fonction executer dés que la tache est finie) = code imbriqué
getUser((user) => {
    console.log(user)
    getArticles(user, (articles) => {
        console.log(articles)
    })
})
console.log("Fin")

function getUser(next) {
    setTimeout(() => {
        next("User 1")
    }, 1500)
}

function getArticles(user, next) {
    setTimeout(() => {
        next([1, 2, 3])
    }, 1500)

*/
/*Promise ca va executer certaine tache et une fois quelles sont realiser on passe a une autre mais si il y a une
 erreur on passe a une tache special pour l'erreur
*/
console.log("Début")
/* new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("All good")
        //reject(new Error("Error during"))
    }, 1500)
})
    .then(message => console.log(message))//si tout va bien on execute then
    .catch(err => console.log(err.message))//sinon erreur catch*/
getUser()
    .then(user => getArticles(user))
    .then(articles => console.log(articles))//On peut mettre plusieurs promesses a la suite elle s'executeront
    .catch(err => console.log(err.message))//un seul catch suffit pour gerer les err
function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User 1")
            resolve("User 1")
            //reject(new Error("Error during getUser()"))
        }, 1500)
    })
}

function getArticles(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Error during getArticles()"))
           resolve([1, 2, 3])
        }, 1500)
    })
}
console.log("Fin")

//Async/Await

