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

// back to top button
const backToTopButton = document.querySelector('.back-to-top button');
backToTopButton.addEventListener('click', backToTop)

window.addEventListener('scroll', scrollHandle)

let isScrolling = false;

function scrollHandle() {
   
    if (window.scrollY > 1000) {
        backToTopButton.style.display = 'block'
    } else {
        backToTopButton.style.display = 'none'
    }
    
    
    // let currentScrollPosition = initialSCroll + window.scrollY;
    // console.log(currentScrollPosition);
    
    
    
    setTimeout(
        scrollPosition,
        3000
    )

    function scrollPosition() {
            const initialSCroll = window.scrollY;
            // console.log(initialSCroll);
        // const currentPosition = initialSCroll + window.scrollY;
        // console.log(currentPosition);

        if (initialSCroll > 0) {
            isScrolling = true;
            // console.log(isScrolling);
        }
    }
    scrollPosition();






    const header = document.querySelector('header');
    if (window.scrollY > 1000) {
        header.style.position = 'relative';
        header.style.transition = 'all 1s ease'
        header.style.backgroundColor = 'rgba(0,0,0, .5)'
        header.style.backdropFilter = 'blur(10px)'
    } else {
        header.style.position = 'fixed';
        header.style.backgroundColor = '#000000fe'
        header.style.backdropFilter = 'none'
    } 
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
}