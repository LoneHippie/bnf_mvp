//DOM variables for pop-ups on about us section

const card1 = document.getElementById('info-0');
const card2 = document.getElementById('info-1');
const card3 = document.getElementById('info-2');
const card4 = document.getElementById('info-3');

const popUp1 = document.getElementById('pop-up-0');
const popUp2 = document.getElementById('pop-up-1');
const popUp3 = document.getElementById('pop-up-2');
const popUp4 = document.getElementById('pop-up-3');

const popUpClose1 = document.getElementById('pop-up_close-0');
const popUpClose2 = document.getElementById('pop-up_close-1');
const popUpClose3 = document.getElementById('pop-up_close-2');
const popUpClose4 = document.getElementById('pop-up_close-3');

const cards = [card1, card2, card3, card4];
const popUps = [popUp1, popUp2, popUp3, popUp4];
const closes = [popUpClose1, popUpClose2, popUpClose3, popUpClose4];

//Functionality for about us/info cards

//init state, all closed
cards.forEach(el => {
    if (el.classList.contains('pop-up--active')) {
        el.classList.remove('pop-up--active');
    }
});

cards.forEach((el, index) => {
    el.addEventListener('click', function() {
        popUps[index].classList.add('pop-up--active');
    })
});

closes.forEach((el, index) => {
    el.addEventListener('click', function() {
        popUps[index].classList.remove('pop-up--active');
    })
});
 
