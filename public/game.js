// game.js
let idUser = window.location.pathname
idUser = idUser.slice(6).split('/')
console.log(idUser)
let firstCard = null;
let secondCard = null;
let selectedCard = []
let matchedPairs = 0;
let maxPoint = document.getElementById('maxPoint')?.textContent;
let level = document.getElementById('level')?.textContent;
let cards = document.querySelectorAll('.card_img')
cards.forEach((card) => {
    if(level.split(': ')[1] === 'easy'){
        card.style.width = '15%';
        card.style.height = '14%';
    }else if(level.split(': ')[1] === 'normal'){
        card.style.width = '11%';
        card.style.height = '11%';
    }else{
        card.style.width = '9%';
        card.style.height = '9%';
    }
});
console.log(level.split(': '))
if(level === 'easy'){
    console.log('easy')
}else if(level === 'normal'){
    console.log('normal')
}
document.getElementById('name').innerHTML = `Name:${idUser[0]}`
document.getElementById('point').innerHTML = `Point:${matchedPairs}`
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {

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
                firstCard.style.opacity = '0'
                secondCard.style.opacity = '0'
                matchedPairs++;
                document.getElementById('point').innerHTML = `Point:${matchedPairs}`
                // Check if the game is complete
                if (matchedPairs === Number(maxPoint)) {
                    alert('You win!');
                    window.location.href = '/';
                }
            } else {
                firstCard.style.transform = 'scale(1)';
                secondCard.style.transform = 'scale(1)';
            }

            firstCard = null;
            secondCard = null;
        });
    });
});
