//Asychrome gerer les asy
console.log("Debut")
//Callbacks (fonction executer dés que la tache est finie) = code imbriqué
getUser((user) => {
    console.log(user)
    getArticles(user, (articles) => {
        console.log(articles)
    })
})
//Promise
//Async/Await
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
}
