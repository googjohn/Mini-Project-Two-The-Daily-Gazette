// const sections = document.getElementsByTagName('section');
// const moreTrendNews = document.querySelector('.more-trend-news');
// const mTn = moreTrendNews.children
// const mtn = [...mTn];

// const moreEntertainmentNews = document.querySelector('.more-entertainment-news')
// const mEn = moreEntertainmentNews.children
// const men = [...mEn];

// const moreScitechNews = document.querySelector('.more-scitech-news')
// const mSn = moreScitechNews.children
// const msn = [...mSn];

// const moreSportsNews = document.querySelectorAll('.more-sports-news')
// const mSportn = moreSportsNews.forEach( ol => {
//     ol.style.paddingBottom = '20px';
//     listItemStyle(ol.children)
// });

// for (let ii = 0; ii < sections.length; ii++) ii % 2 === 0 ? sections[ii].style.backgroundColor = '#ffffff' : sections[ii].style.backgroundColor = '#eaeaea';

// function listItemStyle(arr) {
//     for (let ii = 0; ii < arr.length; ii++) {
//         const listItem = arr[ii];
//         if (ii % 2 === 0) {
//             listItem.style.backgroundColor = '#eaeaea';
//         } else {
//             listItem.style.backgroundColor = '#a6a6a6'
//         }
//     }
// }

// listItemStyle(mtn)
// listItemStyle(men)
// listItemStyle(msn)

// apikeys global variable
const gnewsApiKeys = {
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
    apiKey_11: "36b7d60e3aa710516f138835973345e5",
    apiKey_12: "1382e204787b970f3b304a0a0e7a3cd1",
    apiKey_13: "00699591f08ddb241b7952693e0a09e4",
    apiKey_14: "eef7eda04c20226e8230017f41d9bd0b",
    apiKey_15: "0bc2dbb5459b76180ca5ce9eda5c06d6",
    apiKey_16: "60d69a4c8da5a75c4e5f61a40b689562",
    apiKey_17: "36637b64a142c041f31b44f7d6ed948a",
    apiKey_18: "938eb01487792b76892a22a07cb25b4b",
    apiKey_19: "1a6bba83f9ccf329e711dd1c0de6ff0a",
    apiKey_20: "053a3fcc1281cccf0c88f55d60373e34",
    apiKey_21: "bab393516f488acf9c3fedf5325c1ec2",
    apiKey_22: "835798eefbde7435fa1b95029eeb73ee",
    apiKey_23: "52167bc25aac72582194886b1a883d2e",
    apiKey_24: "c39693e34fe847095bde68c95414819a",
    apiKey_25: "24358282d6c10e278e9b3ff82b3a4578",
    apiKey_26: "f036bc45681619ff4f2c49a123eb5632",
}

async function carouselNewsCycle() {
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


// fetch api data
async function fetchApiData(endpoint, country, category, language, max, API_KEY) {

    const apiUrl = `https://gnews.io/api/v4/${endpoint}?category=${category}&lang=${language}&country=${country}&max=${max}&apikey=${API_KEY}`

    try {

        showSpinner();

        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`Failed to fetch data. Status: ${response.status}, ${response.statusText}`);
            hideSpinner();
            return;
        };

        const result = await response.json();

        hideSpinner();

        return result;
    } catch (error) {
        console.error('Failed to fetch data from API', error)
        throw error;
    }
}

// headline news
async function headNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_14,
        country: 'ph',
        category: 'world',
        language: 'en',
        max : 10,
    };
    
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
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const carouselNews = document.querySelector('#carousel-news.grid-item');
        const boxNews = document.querySelector('#box-news.grid-item .grid-container');
        
        for (let ii = 0; ii < articles.length; ii++) {
            const article = articles[ii];

            if (ii < 1) {
                const carouselDiv = document.createElement('div');
                carouselDiv.classList = 'card';
                carouselDiv.innerHTML = 
                    `<div class='card-image'>
                        <img src=${article.image} alt="">
                    </div>
                    <div class="card-content">
                        <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
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
                            <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                            <div class="news-title">
                                <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                            </div>
                        </div>
                    </div>`

                boxNews.appendChild(boxArticle);
            }
        }

    } catch (error) {
        console.error('Failed to fetch data from API', error)
        
    }
}

// trend news
async function trendNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_15,
        country: 'ph',
        category: 'general',
        language: 'en',
        max : 10,
    };
    
    const { 
        API_KEY,
        country,
        category,
        language,
        max
    } = gnews_params;

    let itemCount = 0;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const trendNews = document.querySelector('#trend-news .grid-container');
        const moreTrendNews = document.querySelector('#more-trend-news .aside-content ul');
       
        for (let ii = 0; ii < articles.length; ii++) {
            const article = articles[ii];
            
            const articleElement = document.createElement('article');
            articleElement.classList = 'grid-item';
            
            if (ii < 3) {
                
                articleElement.innerHTML = 
                    `<div class='card'>
                        <div class='card-image'>
                            <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                        </div>
                        <div class="card-content">
                            <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                            <div class="news-title">
                                <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                            </div>
                        </div>
                    </div>`;
            
                trendNews.appendChild(articleElement)
            } else if (ii >= 3 && ii < articles.length) {
                
                const liElement = document.createElement('li');

                if (liElement) {
                    itemCount++;
                }

                liElement.innerHTML = 
                    `<span class="item-number">${itemCount}</span><a href=${article.url} target="_blank">${article.title}</a>`;

                moreTrendNews.appendChild(liElement)
            }
        }

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}

// local news
async function localNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_16,
        country: 'ph',
        category: 'nation',
        language: 'en',
        max : 8,
    };
    
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
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const localNews = document.querySelector('#local-news .grid-container');

        articles.forEach( article => {

            const articleElement = document.createElement('article')
            articleElement.classList = 'grid-item';
            
            articleElement.innerHTML = 
                `<div class='card'>
                    <div class='card-image'>
                        <img src="${article.image}" onerror="this.src='./images/no-image-available.png'" alt=""/>
                    </div>
                    <div class="card-content">
                        <span class="news-source"><a href="${article.source.url}" target="_blank">${article.source.name}</a></span>
                        <div class="news-title">
                            <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                        </div>
                    </div>
                </div>`;
            
            localNews.appendChild(articleElement);    
        })

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}

// finance news
async function financeNews(endpoint) {

    // sports GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_17,
        country: 'ph',
        category: 'business',
        language: 'en',
        max : 10,
    };
    
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
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const financeNews = document.querySelector('#finance-news .grid-container');

        for (let ii = 0; ii < articles.length; ii++) {
            const article = articles[ii];
    
            const articleElement = document.createElement('article')
            articleElement.classList = 'grid-item';

            if (ii < (articles.length - 1) / 2) {
    
                if (ii !== 0 && ii !== 3) {
                    articleElement.innerHTML = 
                        `<div class='card'>
                            <div class='card-image'>
                                <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                            </div>
                            <div class="card-content">
                                <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                                <div class="news-title">
                                    <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                                </div>
                            </div>
                        </div>`;
                
                    financeNews.appendChild(articleElement)
                } else {
                    articleElement.innerHTML = 
                        `<div class='card'>
                            <div class='card-image'>
                                <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                            </div>
                            <div class="card-content">
                                <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                                <div class="news-title">
                                    <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                                </div>
                                <div class="news-description">
                                    <p>${article.description}</p>
                                </div>
                            </div>
                        </div>`;
                
                    financeNews.appendChild(articleElement)
                }            
            }
        }

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}

// more finance news
async function moreFinanceNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_18,
        country: 'us',
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
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const moreFinanceNews = document.querySelector('#more-finance-news .grid-container');

        for (let ii = 0; ii < articles.length; ii++) {
            const article = articles[ii];
    
            const articleElement = document.createElement('article')
            articleElement.classList = 'grid-item';

            if (ii !== 0) {
                articleElement.innerHTML = 
                    `<div class='card'>
                        <div class='card-image'>
                            <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                        </div>
                        <div class="card-content">
                            <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                            <div class="news-title">
                                <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                            </div>
                        </div>
                    </div>`;
            
                moreFinanceNews.appendChild(articleElement)
            } else {
                articleElement.innerHTML = 
                    `<div class='card'>
                        <div class='card-image'>
                            <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                        </div>
                        <div class="card-content">
                            <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                            <div class="news-title">
                                <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                            </div>
                            <div class="news-description">
                                <p>${article.description}</p>
                            </div>
                        </div>
                    </div>`;
            
                moreFinanceNews.appendChild(articleElement)
            }            
        }

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}

// sports news
async function sportsNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_19,
        country: 'ph',
        category: 'sports',
        language: 'en',
        max : 9,
    };
    
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
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const sportsNews = document.querySelector('#sports-news .grid-container');
        const nbaNews = document.querySelector('#more-sports-news .aside-content #nba-news')
        const mlbNews = document.querySelector('#more-sports-news .aside-content #mlb-news')

        for (let ii = 0; ii < articles.length; ii++) {
            const article = articles[ii];

            const articleElement = document.createElement('article');
            articleElement.classList = 'grid-item';

            

            if (ii === 0) {
                articleElement.innerHTML = 
                `<div class='card'>
                    <div class='card-image'>
                        <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                    </div>
                    <div class="card-content">
                        <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                        <div class="news-title">
                            <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                        </div>
                        <div class="news-description">
                            <p>${article.description}</p>
                        </div>
                    </div>
                </div>`;

                sportsNews.appendChild(articleElement);

            } else {
                articleElement.innerHTML = 
                `<div class='card'>
                    <div class='card-image'>
                        <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                    </div>
                    <div class="card-content">
                        <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                        <div class="news-title">
                            <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                        </div>
                    </div>
                </div>`;

                sportsNews.appendChild(articleElement);
            }
        }

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}

// more sports news
async function moreSportsNews(endpoint) {
    const apiKey = 'ecbfd1725be34758b06c79adaf8a85ef'
    const apiUrl = `https://newsapi.org/v2/${endpoint}?country=us&category=sports&pageSize=9&apiKey=${apiKey}`;
    const apiUrlNba = `https://newsapi.org/v2/${endpoint}?q=nba&pageSize=9&apiKey=${apiKey}`;
    const apiUrlMlb = `https://newsapi.org/v2/${endpoint}?q=mlb&pageSize=9&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrlNba);
        const res = await fetch(apiUrlMlb);

        if (!response.ok) {
            console.error('Invalid response format. No articles found.', response.statusText)
        }

        const result = await response.json();

        const { articles } = result;

        const nbaSportsNews = document.querySelector('#more-sports-news .aside-content ul#nba-news')

        articles.forEach( article => {
                
            const liElement = document.createElement('li');

            liElement.innerHTML = 
                `<span class="item-number">
                    <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                </span><a href=${article.url} target="_blank">${article.title}</a>`;
            nbaSportsNews.appendChild(liElement);
        })   

    } catch (error) {
        console.error('Failed to fetch data from API', error)
    }
}

// mlb news
async function mlbSportsNews(endpoint) {
    const apiKey = gnewsApiKeys.apiKey_20;
    const apiUrlMlb = `https://gnews.io/api/v4/${endpoint}?q=mlb&lang=en&country=us&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrlMlb);

        if (!response.ok) {
            console.error('Invalid response format. No articles found.', response.statusText)
        }

        const result = await response.json();

        const { articles } = result;

        const mlbSportsNews = document.querySelector('#more-sports-news .aside-content ul#mlb-news')

        articles.forEach( article => {
                
            const liElement = document.createElement('li');

            liElement.innerHTML = 
                `<span class="item-number">
                    <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                </span><a href=${article.url} target="_blank">${article.title}</a>`;
                
            mlbSportsNews.appendChild(liElement);
        })   
        
    } catch (error) {
        console.error('Failed to fetch data from API', error)
    }
}

// nba news
async function nbaSportsNews(endpoint) {
    const apiKey = gnewsApiKeys.apiKey_21;
    const apiUrlNba = `https://gnews.io/api/v4/${endpoint}?q=nba&lang=en&country=us&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrlNba);

        if (!response.ok) {
            console.error('Invalid response format. No articles found.', response.statusText)
        }

        const result = await response.json();

        const { articles } = result;

        const nbaSportsNews = document.querySelector('#more-sports-news .aside-content ul#nba-news')

        articles.forEach( article => {
                
            const liElement = document.createElement('li');

            liElement.innerHTML = 
                `<span class="item-number">
                    <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                </span><a href=${article.url} target="_blank">${article.title}</a>`;
            nbaSportsNews.appendChild(liElement);
        })   
        
    } catch (error) {
        console.error('Failed to fetch data from API', error)
    }
}

// techonology news
async function techNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_22,
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

    let itemCount = 0;

    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const techNews = document.querySelector('#scitech-news .grid-container');
        const moreScitechNews = document.querySelector('#more-scitech-news .aside-content ul')

        for (let ii = 0; ii < articles.length; ii++) {
            const article = articles[ii];

            const articleElement = document.createElement('article');
            articleElement.classList = 'grid-item';

            if (ii < 7) {

                if (ii === 0) {

                    articleElement.innerHTML = 
                    `<div class='card'>
                        <div class='card-image'>
                            <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                        </div>
                        <div class="card-content">
                            <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                            <div class="news-title">
                                <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                            </div>
                            <div class="news-description">
                                <p>${article.description}</p>
                            </div>
                        </div>
                    </div>`;

                    techNews.appendChild(articleElement);

                } else {

                    articleElement.innerHTML = 
                    `<div class='card'>
                        <div class='card-image'>
                            <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                        </div>
                        <div class="card-content">
                            <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                            <div class="news-title">
                                <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                            </div>
                        </div>
                    </div>`;

                    techNews.appendChild(articleElement);

                }
            } else if (ii >= 7 && ii < articles.length) {
                
                const liElement = document.createElement('li');

                if (liElement) {
                    itemCount++;
                }

                liElement.innerHTML = 
                    `<span class="item-number">${itemCount}</span><a href=${article.url} target="_blank">${article.title}</a>`;

                moreScitechNews.appendChild(liElement);
            }      
        }

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}

// science news
async function scienceNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_7,
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
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}

// entertainment news
async function entmentNews(endpoint) {
    // API GNEWS variables/params
    const gnews_params = {
        API_KEY: gnewsApiKeys.apiKey_23,
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

    let itemCount = 0;
    
    try {
        const results = await fetchApiData(endpoint, country, category, language, max, API_KEY)

        if (!results.articles) {
            console.error('Invalid response format. No articles found.')
        };

        const { articles } = results;

        const entmentNews = document.querySelector('#entertainment-news .grid-container');
        const moreEntmentNews = document.querySelector('#more-entertainment-news .aside-content ul');

        for (let ii = 0; ii < articles.length; ii++) {
            const article = articles[ii];
            
            const articleElement = document.createElement('article');
            articleElement.classList = 'grid-item';

            if (ii < 7) {

                if (ii === 0) {
                    articleElement.innerHTML = 
                    `<div class='card'>
                        <div class='card-image'>
                            <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                        </div>
                        <div class="card-content">
                            <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                            <div class="news-title">
                                <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                            </div>
                            <div class="news-description">
                                <p>${article.description}</p>
                            </div>
                        </div>
                    </div>`;
            
                    entmentNews.appendChild(articleElement);
                } else {                    

                    articleElement.innerHTML = 
                        `<div class='card'>
                            <div class='card-image'>
                                <img src=${article.image} onerror="this.src='./images/no-image-available.png'" alt="">
                            </div>
                            <div class="card-content">
                                <span class="news-source"><a href=${article.source.url} target="_blank">${article.source.name}</a></span>
                                <div class="news-title">
                                    <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                                </div>
                            </div>
                        </div>`;
                    
                    entmentNews.appendChild(articleElement)
                }
                
            } else if (ii >= 7 && ii < articles.length) {
                
                const liElement = document.createElement('li');

                if (liElement) {
                    itemCount++;
                }

                liElement.innerHTML = 
                    `<span class="item-number">${itemCount}</span><a href=${article.url} target="_blank">${article.title}</a>`;

                moreEntmentNews.appendChild(liElement)
            }
        }

    } catch (error) {
        console.error('Failed to fetch data from API', error)
       
    }
}


window.addEventListener('DOMContentLoaded', () => {
    // headNews('top-headlines');
    // trendNews('top-headlines');
    // localNews('top-headlines');
    // financeNews('top-headlines');
    // moreFinanceNews('top-headlines');
    // sportsNews('top-headlines');
    // moreSportsNews('top-headlines');
    // nbaSportsNews('search');
    // mlbSportsNews('search');
    // techNews('top-headlines');
    // entmentNews('top-headlines');
    // scienceNews('top-headlines');
})

function showSpinner() {
    const spin = document.querySelector('#loader-container');
    spin.style.display = 'block'
}

function hideSpinner() {
    const hide = document.querySelector('#loader-container')
    hide.style.display = 'none'
}
