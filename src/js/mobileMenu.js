const mobileBtn = document.querySelector('#mobile-nav-btn');
const mobileBtns = document.querySelectorAll('.mobile-btn');
const navigation = document.querySelector('nav');
const userSearch = document.querySelector('.user-search');
const user = document.querySelector('.user');
const mobileNavigation = document.querySelector('.main-navigation');
const entmentElement = mobileNavigation.children[0].lastElementChild.previousElementSibling.previousElementSibling;
const scitechElement = mobileNavigation.children[0].lastElementChild.previousElementSibling;
const firstElement = mobileNavigation.children[0].firstElementChild;
const lastElement = mobileNavigation.children[0].lastElementChild;
let isMobileActive = false;

function mobileNavHandle() {
    if (isMobileActive) {
        if (isMobileActive) {
            mobileBtn.classList.remove('active');
            mobileNavigation.classList.remove('mobile-active');

            windowSizeHandle();
        };

        isMobileActive = false;
    } else {

        if (!isMobileActive) {
            mobileBtn.classList.toggle('active');
            mobileNavigation.classList.toggle('mobile-active');

            entmentElement.style.display = 'block';
            scitechElement.style.display = 'block';
        };

        isMobileActive = true;
    };
};

function windowSizeHandle() {
    const maxWidth900 = window.matchMedia('(max-width: 900px)');
    const maxWidth1024 = window.matchMedia('(max-width: 1024px)');

    if (maxWidth900.matches) {
        entmentElement.style.display = 'none';
    } else {
        entmentElement.style.display = 'block';
    };

    if (maxWidth1024.matches) {
        scitechElement.style.display = 'none';
    } else {
        scitechElement.style.display = 'block';

    };
};
window.addEventListener('resize', () => {
    if (!mobileNavigation.classList.contains('mobile-active')) {

        windowSizeHandle();
    }
});

mobileBtn.addEventListener('click', () => {
    mobileNavHandle();

    mobileBtns.forEach(button => {
        button.classList.toggle('close-btn');
    });
});
