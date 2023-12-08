const mobileBtn = document.querySelector('#mobile-nav-btn');
const mobileBtns = document.querySelectorAll('.mobile-btn');
const mobileNavigation = document.querySelector('.main-navigation');
const userSearch = document.querySelector('.user-search');

mobileBtn.addEventListener('click', (event) => {
    mobileBtn.classList.toggle('active');

    mobileBtns.forEach( btn => {
        btn.classList.toggle('close-btn');
    })
    console.log(event.target)
})