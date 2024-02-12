// global variable/container for hostnames, urls, apikeys used
export const global = {
  currentPage: window.location.pathname,
  apiUrls: {
    balldontlieHost: "https://www.balldontlie.io/api/v1/",
    gnewsHost: "https://gnews.io/api/v4/",
    ipInfoHost: "https://ipinfo.io/",
    ipGeoHost: "https://api.ipgeolocation.io/", // doens't allow client side request when deployed
    newsapiHost: "https://newsapi.org/v2/", // doesn't allow client side request when deployed
    openWeatherHost: "https://api.openweathermap.org/data/2.5/", // doesn't allow client side request when deployed
    visualCrossingHost: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/",
  },
  apiKeys: {
    ipInfoKey: "6fb133d2b718e1",
    ipGeoKey: "fea457340ea143e192d5d3309e2d17c0", // doesn't allow client side request when deployed
    newsapiKey: "ecbfd1725be34758b06c79adaf8a85ef", // doesn't allow client side request when deployed
    openWeatherKey: "5c2780f0e27163175249dc2144f8ca64", // doesn't allow client side request when deployed
    visualCrossingKey: "3UX7T3ZEVQE5URAYQUM7WP8ZH",
    gnewsKeys: {
      gnewsKey_1: "59933f0e365a71e63e8b2c9e38d08455",
      gnewsKey_2: "bd6c2317d02803fb4cf4fa5deaff149c",
      gnewsKey_3: "9167dae881545d7d1ebf42ac1186d6ae",
      gnewsKey_4: "702589ec14e5977ff3ff15d3eb3a4b50",
      gnewsKey_5: "0654717037bb66a37e42b59e8ade6a64",
      gnewsKey_6: "2d27b969040914f83bf30e7959ad9349",
      gnewsKey_7: "e701311bc9b2249184c539cd496d8466",
      gnewsKey_8: "26fd80a7289d79b300b99af28392c8c7",
      gnewsKey_9: "d7dfd99147ac538715d80f39a0277163",
      gnewsKey_10: "1321923f82f3680d72f02d2147d154b6",
      gnewsKey_11: "36b7d60e3aa710516f138835973345e5",
      gnewsKey_12: "1382e204787b970f3b304a0a0e7a3cd1",
      gnewsKey_13: "00699591f08ddb241b7952693e0a09e4",
      gnewsKey_14: "eef7eda04c20226e8230017f41d9bd0b",
      gnewsKey_15: "0bc2dbb5459b76180ca5ce9eda5c06d6",
      gnewsKey_16: "60d69a4c8da5a75c4e5f61a40b689562",
      gnewsKey_17: "36637b64a142c041f31b44f7d6ed948a",
      gnewsKey_18: "938eb01487792b76892a22a07cb25b4b",
      gnewsKey_19: "1a6bba83f9ccf329e711dd1c0de6ff0a",
      gnewsKey_20: "053a3fcc1281cccf0c88f55d60373e34",
      gnewsKey_21: "bab393516f488acf9c3fedf5325c1ec2",
      gnewsKey_22: "835798eefbde7435fa1b95029eeb73ee",
      gnewsKey_23: "52167bc25aac72582194886b1a883d2e",
      gnewsKey_24: "c39693e34fe847095bde68c95414819a",
      gnewsKey_25: "24358282d6c10e278e9b3ff82b3a4578",
      gnewsKey_26: "f036bc45681619ff4f2c49a123eb5632",
    }
  }
}

// ip data from ipinfo.io / seems redundant with ipgeo 
// used to try tricking cors blocking from client side request - didn't work XD
export async function getIpInfo() {
  const ipInfoHost = global.apiUrls.ipInfoHost;
  const ipInfoKey = global.apiKeys.ipInfoKey;
  const ipInfoUrl =  `${ipInfoHost}json?token=${ipInfoKey}`
  
  try {
    const response = await fetch(ipInfoUrl);

    if (!response.ok) {
      throw new Error('Invalid response format. No articles found.', response.statusText);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Failed to fetch from API', error)
  }
  
}

// ip data from ipgeo / more precise city and probably lat and lon
export async function getIpGeoLocation() {
  // const { ip } = await getIpInfo();

  const ipGeoHost = global.apiUrls.ipGeoHost;
  const ipGeoKey = global.apiKeys.ipGeoKey;
  // const ipGeoUrl = `${ipGeoHost}ipgeo?apiKey=${ipGeoKey}&ip=${ip}`;
  const ipGeoUrl = `${ipGeoHost}ipgeo?apiKey=${ipGeoKey}`;

  try {
    const response = await fetch(ipGeoUrl);

    if (!response.ok) {
      throw new Error('Invalid response format. No articles found.', response.statusText);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Failed to fetch from API', error);
  }
}

// fetch weather data from visualcrossing - personally, i think better than openweathermap
export async function getWeatherData(endpoint, latitude, longitude) {
  const visualCrossingKey = global.apiKeys.visualCrossingKey;
  const visualCrossingHost = global.apiUrls.visualCrossingHost;
  const visualCrossingUrl = `${visualCrossingHost}${endpoint}/${latitude},${longitude}?&key=${visualCrossingKey}&iconSet=icons1`;

  try {
    showLoading()
    const response = await fetch(visualCrossingUrl);

    if (!response.ok) {
      throw new Error('Invalid response format. No articles found.', response.statusText)
    }
  
    const result = await response.json();
    hideLoading();

    return result;
  } catch (error) {
    console.error('Failed to fetch from API', error);
  }
  
}
// openweathermap 
export async function getOpenWeatherData(endpoint, latitude, longitude) {
  const openWeatherKey = global.apiKeys.openWeatherKey;
  const openWeatherHost = global.apiUrls.openWeatherHost;
  const openWeatherUrl = `${openWeatherHost}${endpoint}?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`;

  try {
    showLoading()
    const response = await fetch(openWeatherUrl);

    if (!response.ok) {
      throw new Error('Invalid response format. No articles found.', response.statusText)
    }
  
    const result = await response.json();
    hideLoading();

    return result;
  } catch (error) {
    console.error('Failed to fetch from API', error);
  }
  
}


// temperature handle for weather app
export function handleCelcius (temp) {
  return Math.floor((temp - 32) * (5 / 9));
}

export function handleFahrenheit (temp) {
  return Math.floor(temp);
}

export function handleKelvin (temp) {
  const kelvinBase = 274.15;
  return Math.floor(handleCelcius(temp) + kelvinBase);
}

// spinner / loader
function showLoading () {
  const load = document.querySelector('#loader-container');
  load.style.display = 'block';
}

function hideLoading () {
  const hide = document.querySelector('#loader-container');
  hide.style.display = 'none';
}