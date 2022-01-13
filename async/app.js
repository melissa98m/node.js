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
 new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("All good")
        //reject(new Error("Error during"))
    }, 1500)
})
    .then(message => console.log(message))//si tout va bien on execute then
    .catch(err => console.log(err.message))//sinon erreur catch
console.log("Fin")

//Async/Await

