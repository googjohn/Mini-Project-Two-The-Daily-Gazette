const sections = document.getElementsByTagName('section');
const moreTrendNews = document.querySelector('.more-trend-news');
const mTn = moreTrendNews.children
const mtn = [...mTn];

for (let ii = 0; ii < sections.length; ii++) ii % 2 === 0 ? sections[ii].style.backgroundColor = '#ffffff' : sections[ii].style.backgroundColor = '#eaeaea';

for (let ii = 0; ii < mtn.length; ii++) {
    const listItem = mtn[ii];
    if (ii % 2 === 0) {
        listItem.style.backgroundColor = '#eaeaea'
    } else {
        listItem.style.backgroundColor = '#a6a6a6'
    }
}