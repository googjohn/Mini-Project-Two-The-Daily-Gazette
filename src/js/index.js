const sections = document.getElementsByTagName('section');
const moreTrendNews = document.querySelector('.more-trend-news');
const mTn = moreTrendNews.children
const mtn = [...mTn];

const moreEntertainmentNews = document.querySelector('.more-entertainment-news')
const mEn = moreEntertainmentNews.children
const men = [...mEn];

const moreScitechNews = document.querySelector('.more-scitech-news')
const mSn = moreScitechNews.children
const msn = [...mSn];

const moreSportsNews = document.querySelectorAll('.more-sports-news')
const mSportn = moreSportsNews.forEach( ol => {
    ol.style.paddingBottom = '20px';
    listItemStyle(ol.children)
});

for (let ii = 0; ii < sections.length; ii++) ii % 2 === 0 ? sections[ii].style.backgroundColor = '#ffffff' : sections[ii].style.backgroundColor = '#eaeaea';

function listItemStyle(arr) {
    for (let ii = 0; ii < arr.length; ii++) {
        const listItem = arr[ii];
        if (ii % 2 === 0) {
            listItem.style.backgroundColor = '#eaeaea';
        } else {
            listItem.style.backgroundColor = '#a6a6a6'
        }
    }
}

listItemStyle(mtn)
listItemStyle(men)
listItemStyle(msn)