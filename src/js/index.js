const sections = document.getElementsByTagName('section');
const moreTrendNews = document.querySelector('.more-trend-news');
// const mTn = moreTrendNews.children
// const mtn = [...mTn];

const moreEntertainmentNews = document.querySelector('.more-entertainment-news')
// const mEn = moreEntertainmentNews.children
// const men = [...mEn];

const moreScitechNews = document.querySelector('.more-scitech-news')
// const mSn = moreScitechNews.children
// const msn = [...mSn];

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

// listItemStyle(mtn)
// listItemStyle(men)
// listItemStyle(msn)

// apikeys global variable
const globalApiKeys = {
    apiKey_1: "59933f0e365a71e63e8b2c9e38d08455",
    apiKey_2: "bd6c2317d02803fb4cf4fa5deaff149c",
    apiKey_3: "9167dae881545d7d1ebf42ac1186d6ae",
    apiKey_4: "702589ec14e5977ff3ff15d3eb3a4b50",
    apiKey_5: "0654717037bb66a37e42b59e8ade6a64",
    apiKey_6: "2d27b969040914f83bf30e7959ad9349",
    apiKey_7: "e701311bc9b2249184c539cd496d8466",
    apiKey_8: "26fd80a7289d79b300b99af28392c8c7",
    apiKey_9: "d7dfd99147ac538715d80f39a0277163",
    apiKey_10: "1321923f82f3680d72f02d2147d154b6",
}

// function to fetch data
async function fetchAPIData() {
    // gnews parameter
    const gnews_params = {
        apiKey_1: "59933f0e365a71e63e8b2c9e38d08455",
        apiKey_2: "bd6c2317d02803fb4cf4fa5deaff149c",
        apiKey_3: "9167dae881545d7d1ebf42ac1186d6ae",
        apiKey_4: "702589ec14e5977ff3ff15d3eb3a4b50",
        category : 'nation',
        country : 'ph',
        language : 'en',
        max : 10,
    }

    const { apiKey_1, apiKey_2, apiKey_3, apiKey_4, category, country, language, max } = gnews_params;
    
    const carouselNews = document.querySelector('#carousel-news.grid-item')
    const boxNews = document.querySelector('#box-news.grid-item .grid-container')

    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=ph&max=10&apikey=${apiKey_1}`);
    const {articles} = await response.json();
    
    // console.log(articles)

    for (let ii = 0; ii < articles.length; ii++) {
        const article = articles[ii];
        
        if (ii < 1) {
            const carouselDiv = document.createElement('div');
            carouselDiv.classList = 'card';
            // div.setAttribute('id', 'carousel-news');
            carouselDiv.innerHTML = 
                `<div class='card-image'>
                    <img src=${article.image} alt="">
                </div>
                <div class="card-content">
                    <div class="news-title">
                        <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                    </div>
                    <div class="news-description">
                        <p>${article.description}</p>
                    </div>
                </div>`
            
            carouselNews.appendChild(carouselDiv);

        }
        
        if (ii >= 6 && ii <= articles.length - 1) {
            const boxArticle = document.createElement('article');
            boxArticle.classList = 'grid-item';

            boxArticle.innerHTML =
                `<div class='card'>
                    <div class='card-image'>
                        <img src=${article.image} alt="">
                    </div>
                    <div class="card-content">
                        <div class="news-title">
                            <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                        </div>
                    <div>
                </div>`

            boxNews.appendChild(boxArticle);
        }
    }

    // const carouselNewsItems = document.querySelector('#headline-news > .flex-container').children;
    // console.log(carouselNewsItems);
    // const carouselItems = [...carouselNewsItems];
    // console.log(carouselItems);
    // let index = 0;
    
    
    // function carouselCycle() {
    //     const currentSlide = carouselItems[index];
        
    //     if (!currentSlide.classList.contains('hidden')) {
    //         currentSlide.classList.add('hidden')
    //     } else {
    //         currentSlide.classList.remove('hidden')
    //     }
        
    //     index++;
    //     index = index % carouselItems.length;
    
    //     const prevIndex = (index - 2 + carouselItems.length) % carouselItems.length;
    //     const prevSlide = carouselItems[prevIndex];
    //     if (prevSlide) {
    //         prevSlide.classList.add('hidden')
    //     } 
        
        
    // } 
    // carouselCycle();
    // setInterval(carouselCycle, 5000)












}
// fetchAPIData()

// fetch local news
async function fetchLocalNews() {
    // gnews variables
    const gnews_params = {
        apiKey_1: "59933f0e365a71e63e8b2c9e38d08455",
        apiKey_2: "bd6c2317d02803fb4cf4fa5deaff149c",
        apiKey_3: "9167dae881545d7d1ebf42ac1186d6ae",
        apiKey_4: "702589ec14e5977ff3ff15d3eb3a4b50",
        category : 'nation',
        country : 'ph',
        language : 'en',
        max : 10,
    }

    const { apiKey_1, apiKey_2, apiKey_3, apiKey_4, category, country, language, max } = gnews_params;

    const localNews = document.querySelector('#local-news .grid-container');

    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=${language}&country=${country}&max=${max}&apikey=${apiKey_2}`);
    const { articles } = await response.json();
    const articlesList = articles.slice(0,8)

    articlesList.forEach( article => {

        const articleElement = document.createElement('article')
        articleElement.classList = 'grid-item';

        articleElement.innerHTML = 
            `<div class='card'>
                <div class='card-image'>
                    <img src=${article.image} alt="">
                </div>
                <div class="card-content">
                    <div class="news-title">
                        <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                    </div>
                    <div class="news-description">
                        <p>${article.description}</p>
                    </div>
                <div>
            </div>`;
        
        localNews.appendChild(articleElement)
    })

}
// fetchLocalNews()

async function fetchFinanceNews() {
    // gnews variables
    const gnews_params = {
        apiKey_1: "59933f0e365a71e63e8b2c9e38d08455",
        apiKey_2: "bd6c2317d02803fb4cf4fa5deaff149c",
        apiKey_3: "9167dae881545d7d1ebf42ac1186d6ae",
        apiKey_4: "702589ec14e5977ff3ff15d3eb3a4b50",
        category : 'business',
        country : 'ph',
        language : 'en',
        max : 10,
    }

    const { apiKey_1, apiKey_2, apiKey_3, apiKey_4, category, country, language, max } = gnews_params;

    const financeNews = document.querySelector('#finance-news .grid-container');
    console.log(financeNews)
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=${language}&country=${country}&max=${max}&apikey=${apiKey_3}`)

    const { articles } = await response.json();
    console.log(articles)

    

    
    for (let ii = 0; ii < articles.length; ii++) {
        const article = articles[ii];

        // const imgElement = document.createElement('img');
        
        // imgElement.onerror = function() {
        //     console.error('Image failed to load!')
        //     imgElement.src = '../src/images/no-image-available.png'
        // }
        
        // imgElement.src = article.image
        

        if (ii < (articles.length - 1) / 2) {
            const articleElement = document.createElement('article')
            articleElement.classList = 'grid-item';

            if (ii !== 0 && ii !== 3) {
                articleElement.innerHTML = 
                `<div class='card'>
                    <div class='card-image'>
                        <img src=${article.image} alt="">
                    </div>
                    <div class="card-content">
                        <div class="news-title">
                            <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                        </div>
                    <div>
                </div>`;
            
                financeNews.appendChild(articleElement)
            } else {
                articleElement.innerHTML = 
                `<div class='card'>
                    <div class='card-image'>
                        <img src=${article.image} alt="">
                    </div>
                    <div class="card-content">
                        <div class="news-title">
                            <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                        </div>
                        <div class="news-description">
                            <p>${article.description}</p>
                        </div>
                    <div>
                </div>`;
            
                financeNews.appendChild(articleElement)
            }

            // imgElement.onerror = function () {
            //     console.error('Image failed to load!')
            //     imgElement.src = '../src/images/no-image-available.png'
            //     console.log(imgElement.src)
            // }
           
            
        }
    }
   

}
// fetchFinanceNews()

// fetch api data
async function fetchApiData(endpoint, country, category, language, max, API_KEY) {

    const apiUrl = `https://gnews.io/api/v4/${endpoint}?category=${category}&lang=${language}&country=${country}&max=${max}&apikey=${API_KEY}`

    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}, ${response.statusText}`);
        };

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Failed to fetch data from API', error)
        
    }
}

// headline news
async function headNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_1,
        country: 'ph',
        category: 'world',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY);

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
        
    }
}

headNews('top-headlines')

// trend news
async function trendNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_2,
        country: 'ph',
        category: 'general',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}
trendNews('top-headlines')

// local news
async function localNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_3,
        country: 'ph',
        category: 'nation',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}
localNews('top-headlines')

// finance news
async function financeNews(endpoint) {

    // sports GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_4,
        country: 'ph',
        category: 'business',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}
financeNews('top-headlines')

// sports news
async function sportsNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_5,
        country: 'ph',
        category: 'sports',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}
sportsNews('top-headlines')

// techonology news
async function techNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_6,
        country: 'ph',
        category: 'technology',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}
techNews('top-headlines')

// science news
async function scienceNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_7,
        country: 'ph',
        category: 'science',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}
scienceNews('top-headlines')

// entertainment news
async function entmentNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: globalApiKeys.apiKey_8,
        country: 'ph',
        category: 'entertainment',
        language: 'en',
        max : 10,
    }
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No artilces found.')
        };

        const { articles } = results;
        console.log(articles);

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}
entmentNews('top-headlines')