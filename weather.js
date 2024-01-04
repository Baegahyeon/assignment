// 배경 비디오 설정 함수
function setWeatherBackground(weather) {
    const content = document.querySelector(".content");
    const video = document.getElementById("background-video");


    if (isDay()) {
        if (weather === "Clear") {
            video.src = "/bgh/videos/sunny-background.mp4";
        } else if (weather === "Clouds") {
            video.src = "/bgh/videos/cloudy-background.mp4";
        } else if (weather === "Rain") {
            video.src = "/bgh/videos/rainy-background.mp4";
        } else if (weather === "Snow") {
            video.src = "/bgh/videos/snow-background.mp4";
        }
    } else {
        video.src = "/bgh/videos/night-background.mp4";
    }

    video.load(); // 비디오를 다시 로드
    video.play(); // 비디오를 재생
}
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

// 검색어 입력 이벤트를 처리하는 함수
function searchLocation() {
    // 검색어를 가져옵니다.
    const searchTerm = searchInput.value.trim().toLowerCase();

    // 검색어에 따라 결과를 생성
    results.innerHTML = ""; // 이전 결과를 지움

    if (searchTerm === "") {
        // 검색어가 비어있으면 아무 결과도 표시하지 않음
        return;
    }

    // 검색어와 일치하는 결과를 찾음
    const matchingCities = cities.filter(city => city.toLowerCase().includes(searchTerm));

    // 결과를 화면에 표시합니다.
    matchingCities.forEach(city => {
        const resultItem = document.createElement("div");
        resultItem.textContent = city;
        results.appendChild(resultItem);
    });
}

// 검색어 입력 이벤트를 감지하고 searchLocation 함수를 호출
searchInput.addEventListener("input", searchLocation);
// 검색 버튼 클릭 또는 엔터 키 누를 때 날씨 정보 가져오기
function searchWeather() {
    const keywordInput = document.querySelector("#keyword");
    const keyword = keywordInput.value;

    if (keyword === "지역명을 입력하세요.") {
        keywordInput.value = "";
    }

    getWeatherInfo(keyword); // 검색한 지역의 날씨 정보 가져오기
    keywordInput.focus(); // 입력 필드에 포커스를 설정
}

// 엔터 키를 누를 때 검색 실행
function handleKeyDown(event) {
    if (event.key === "Enter") {
        searchWeather();
    }
}

// API
function getWeatherInfo(keyword) {
    const apiKey = "47771183c6f1c8757851db16d0b233db";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${apiKey}&units=metric`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].main;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            // 현재 시간이 밤인지 확인
            const night = isNight();

            // 배경 비디오 설정 및 비가 오는 도시인 경우에만 낮 동영상으로 변경
            if (weather === "Rain" && !night) {
                setWeatherBackground(weather, false); // 비가 오는데 낮인 경우 낮 동영상 설정
            } else {
                setWeatherBackground(weather, night);
            }

            setWeatherData(keyword, temperature, humidity, weather);
        })
        .catch(error => {
            console.error("날씨 데이터 가져오기 오류:", error);
            // 에러 처리 로직을 추가
        });
}
// 현재 시간이 낮인지 확인하는 함수
function isDay() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 7 && hour < 19;
}
// 현재 시간이 밤인지 확인하는 함수
function isNight() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 19 || hour < 7;
}
// 날씨 정보를 표시하는 함수 
function setWeatherData(location, temperature, humidity, weather) {
    document.getElementById("location").textContent = location;
    document.getElementById("temperature-value").textContent = `${Math.floor(temperature)} °`;
    document.getElementById("humidity").textContent = `습도: ${humidity}%`;

    // 배경 비디오 설정
    setWeatherBackground(weather);
}
