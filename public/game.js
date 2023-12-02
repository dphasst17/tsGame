// game.js
let idUser = window.location.pathname
idUser = idUser.slice(6).split('/')
let firstCard = null;
let secondCard = null;
let selectedCard = []
let matchedPairs = 0;
let maxPoint = document.getElementById('maxPoint')?.textContent;
let level = document.getElementById('level')?.textContent.split(': ')[1];
let cards = document.querySelectorAll('.card_img');
let count = level !== 'easy' ? level ==='normal' ? 50 : 20 :''
if(level !== 'easy'){
    let countdown = setInterval(function() {
        if (count < 0) {
            clearInterval(countdown);
            alert('You lose!');
            window.location.href = '/';
        }else{
            document.getElementById('timer').innerText = count;
            count--;
        }
    }, 2000);
}
cards.forEach((card) => {
    if(level === 'easy'){
        card.style.width = '15%';
        card.style.height = '14%';
    }else if(level === 'normal'){
        card.style.width = '11%';
        card.style.height = '11%';
    }else{
        card.style.width = '9%';
        card.style.height = '9%';
    }
});
setTimeout(() => {
    cards.forEach((card) => {
        if(level === 'normal' || level === 'hard'){
            document.querySelectorAll('.overlayCard').forEach(overlay => {
                overlay.style.position = 'absolute';
                if(level === "normal"){
                    overlay.style.width = "10%";
                    overlay.style.height = "20%";
                }else if(level === "hard"){
                    overlay.style.width = "8.5%";
                    overlay.style.height = "17%";
                }
            });
        }
    });
},2000)
document.getElementById('name').innerHTML = `Name:${idUser[0]}`
document.getElementById('point').innerHTML = `Point:${matchedPairs}`
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        if(level === "normal" || level === "hard"){
            document.getElementById(`overlay-${this.id}`).style.display = 'none'
            console.log(this.id)
        }
        if (firstCard === null) {
            this.style.transform = 'scale(1.1)';
            firstCard = this;
        } else if (secondCard === null) {
            if(this !== firstCard){
                this.style.transform = 'scale(1.1)';
                secondCard = this
            }else{
                firstCard = null;
                secondCard = null;
                this.style.transform = 'scale(1)';
            }
        }
        firstCard !== null && secondCard !== null && fetch('/check-match', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ img1: firstCard.src, img2: secondCard.src })
        })
        .then(response => response.json())
        .then(data => {
            if (data.match === true) {
                count = level !== 'easy' ? level ==='normal' ? 50 : 20 :''
                setTimeout(() => {
                    firstCard.style.opacity = '0'
                    secondCard.style.opacity = '0'
                    firstCard = null;
                    secondCard = null;
                },200)
                matchedPairs++;
                document.getElementById('point').innerHTML = `Point:${matchedPairs}`
                // Check if the game is complete
                if (matchedPairs === Number(maxPoint)) {
                    alert('You win!');
                    window.location.href = '/';
                }
            } else {
                setTimeout(() => {
                    document.getElementById(`overlay-${firstCard.id}`).style.display = 'block'
                    document.getElementById(`overlay-${secondCard.id}`).style.display = 'block'
                    firstCard.style.transform = 'scale(1)';
                    secondCard.style.transform = 'scale(1)';
                    firstCard = null;
                    secondCard = null;
                },500)
            }

            
        });
    });
});
