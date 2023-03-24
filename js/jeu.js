console.log('Jeu démarré');

// let pour créer une variable
let box = document.querySelector('.box');
let click = 0;
let scoreElement = document.querySelector('#score');

let chrono = 12;
let chronoElement =  document.querySelector('#chrono');
chronoElement.innerHTML = chrono;

let gameStart = false

function startGame() {
    gameStart = true;
};

box.addEventListener("click", () => {
if( chrono != 0 )
{
    console.log('click sur la box !');
    click += 1;
    // innerHTML C'est pour écrire dans le HTML
    scoreElement.innerHTML = click;
    // Génère un nombre aléatoire qui sera stocké dans la variable top
    // window.innerHeight C'est pour récupérer la taille de l'écran
    let top = Math.floor(Math.random() * window.innerHeight);
    let left = Math.floor(Math.random() * window.innerWidth);
    // Vérifie si la cible apparait dans la zone de jeu
    while( top <= 200 || top >= (window.innerHeight - 200) || left <= 200|| left >= (window.innerWidth -200))
    {
        top = Math.floor(Math.random() * window.innerHeight);
        left = Math.floor(Math.random() * window.innerWidth);
    }
    // On fait `${}` pour pouvoir utiliser une valeur JavaScript dans du CSS
    box.style.top = `${top}px`;
    box.style.left = `${left}px`;
    box.style.backgroundColor = "red";
}
});

// Pour créer un timer, 1000, car c'est en milliseconde
//répète une fonction toutes le secondes dans notre cas 
setInterval( () => {
    if (gameStart == true){
        
        if( chrono != 0 )
        {
            chrono--;
            chronoElement.innerHTML = chrono;
        }
        if( chrono == 0 )
        {
            clearInterval;  
        }
    }
}, 1000);