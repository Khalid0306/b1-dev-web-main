console.log('Jeu démarré');

// let pour créer une variable
let box = document.querySelector('.box');
let click = 0;
let scoreElement = document.querySelector('#score');
let userForm = document.querySelector('#user-form');
let scoreList = document.querySelector('#score-list ul');
let scores = [];


let chrono = 12;
let chronoElement =  document.querySelector('#chrono');
chronoElement.innerHTML = chrono;

let gameStart = false
userForm.style.display = 'none'; // Cache le formulaire lors du démarrage du jeu

function startGame() {
    gameStart = true;
};

function updateScoreList() {
    localStorage.setItem('scores', JSON.stringify(scores));

    scoreList.innerHTML = '';
    scores.forEach(score => {
        let listItem = document.createElement('li');
        listItem.textContent = `${score.pseudo}: ${score.score}`;
        scoreList.appendChild(listItem);
    });
}

function loadScores() {
    let storedScores = localStorage.getItem('scores');
    if (storedScores) {
        scores = JSON.parse(storedScores);
    }
}

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let pseudo = document.querySelector('#pseudo').value;
    let userScore = {pseudo: pseudo, score: click};

    scores.push(userScore);
    scores.sort((a, b) => b.score - a.score);

    updateScoreList();
});

box.addEventListener("click", () => {
if(gameStart == true && chrono != 0)
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
    while( top <= 400 || top >= (window.innerHeight - 200) || left <= 200|| left >= (window.innerWidth -200))
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

loadScores();
updateScoreList();

// Pour créer un timer, 1000, car c'est en milliseconde
//répète une fonction toutes le secondes dans notre cas 
//Le chrono se lance a partir du moment ou la valeur gameStar est true c'est a dire on click sur le bon start.
setInterval( () => {
    if (gameStart == true){
        
        if( chrono != 0 )
        {
            chrono--;
            chronoElement.innerHTML = chrono;
        } else {
            gameStart = false;
            if (userForm.style.display !== 'block') {
                userForm.style.display = 'block'; // Affiche le formulaire lorsque le chrono atteint 0
        }
        /*if( chrono == 0 )
        {
            clearInterval;  
        }*/
        }
    }
},1000);

