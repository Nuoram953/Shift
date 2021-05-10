
let left, right, img, title, desc = null

let titles = ["Aventure","Normal"]
let descs = [
    "Un mode de jeu ou vous devez accumulez le plus de point sans mourir. Chaque mauvaise entrée vous fait perdre 1 point de vie. Il est possible d'en gagner quand vous trouver un feu de camp",
    "Pratiquez-vous à écrire le plus rapidement possible dans le langage de votre choix"
]
let mode = ["adventure", "normal"]
let idx = 0;

window.addEventListener("load", () => {

    left = document.getElementById("left")
    right = document.getElementById("right")

    img = document.getElementById("picture")
    title = document.getElementById("mode-title")
    desc = document.getElementById("mode-desc")

    img.src = `/images/mode/${mode[idx]}.png`
    title.innerHTML = titles[idx]
    desc.innerHTML = descs[idx]

    left.addEventListener("click", () => {

        idx--;

        if (idx < 0) {
            idx = mode.length - 1
        }


        img.src = `/images/mode/${mode[idx]}.png`
        title.innerHTML = titles[idx]
        desc.innerHTML = descs[idx]


    })
    right.addEventListener("click", () => {

        idx++;

        if (idx > mode.length - 1) {
            idx = 0
        }
        img.src = `/images/mode/${mode[idx]}.png`
        title.innerHTML = titles[idx]
        desc.innerHTML = descs[idx]





    })
})