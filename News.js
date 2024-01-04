let currentNewsIndex = 0;
let articlesData = []; // 뉴스 데이터 저장 배열

// 페이지 로드 시 뉴스 가져오기
window.onload = function() {
    fetchNews();
};

// 뉴스를 가져오는 함수
function fetchNews() {
    fetch('https://newsapi.org/v2/top-headlines?country=kr&apiKey=7109144fea6d41dab03c4c3760ce3049')
        .then(response => response.json())
        .then(data => {
            articlesData = data.articles;
            showNews(currentNewsIndex); // 초기 뉴스 표시
        })
        .catch(error => console.log('Error fetching news:', error));
}

// 이전 뉴스를 표시하는 함수
function showPreviousNews() {
    currentNewsIndex--;
    if (currentNewsIndex < 0) {
        currentNewsIndex = articlesData.length - 1; // 첫 번째 뉴스에서 이전 버튼 클릭 시, 마지막 뉴스로 이동
    }
    showNews(currentNewsIndex);
}

// 다음 뉴스를 표시하는 함수
function showNextNews() {
    currentNewsIndex++;
    if (currentNewsIndex >= articlesData.length) {
        currentNewsIndex = 0; // 뉴스 배열의 끝에 도달하면 처음으로 돌아감
    }
    showNews(currentNewsIndex);
}

// 뉴스를 화면에 표시하는 함수
function showNews(index) {
    const newsContainer = document.getElementById('news-container');
    const currentNews = articlesData[index];

    // 기사의 제목을 가운데 정렬하여 표시
    let newsContent = `
        <h2 style="text-align: center;">${currentNews.title}</h2>
    `;
    // 이미지가 있는 경우 이미지를 일정한 크기로 표시
    if (currentNews.urlToImage) {
        newsContent += `
            <div style="text-align: center;">
                <img src="${currentNews.urlToImage}" alt="News Image" style="width: 70%; height: auto;">
            </div>
        `;
    }

    // 내용이 있는 경우에만 내용을 표시
    if (currentNews.description) {
        newsContent += `
            <p style="text-align: justify;">${currentNews.description}</p>
        `;
    }

    // 동영상이 있는 경우 동영상을 자동 재생하도록 표시
    if (currentNews.urlToVideo) {
        newsContent += `
            <video controls autoplay style="width: 100%;">
                <source src="${currentNews.urlToVideo}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }

    // 화면에 표시
    newsContainer.innerHTML = newsContent;
}