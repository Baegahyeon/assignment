document.addEventListener('DOMContentLoaded', function() {
    const newsList = document.getElementById('news-list');
    const headlineSection = document.getElementById('headline-section'); // 가로로 표시할 기사들이 들어갈 요소

    // 클릭된 기사 정보를 localStorage에 저장하는 함수
    function saveClickedNews(newsData) {
        localStorage.setItem('clickedNews', JSON.stringify(newsData));
    }

    // 실제로 API를 통해 데이터를 가져오는 함수
    function fetchNewsList() {
        const apiKey = '7109144fea6d41dab03c4c3760ce3049';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                showNewsList(data.articles); // 받아온 뉴스 데이터를 가지고 뉴스 목록을 생성합니다.
            })
            .catch(error => console.log('Error fetching news:', error));
    }

    // 뉴스 목록을 생성하는 함수
    function showNewsList(newsData) {
        newsData.forEach((news, index) => {
            if (news.urlToImage) { // 이미지가 있는 경우에만 처리
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                const image = document.createElement('img');
                image.src = news.urlToImage; // 이미지 URL 설정
                image.alt = news.title; // 이미지 대체 텍스트 설정
                image.classList.add('article-image'); // CSS 클래스 추가
                const headline = document.createElement('h2');
                headline.textContent = news.title; // 기사 제목 설정
                const description = document.createElement('p');
                description.classList.add('hidden');
                description.textContent = news.description; // 기사 요약 설정

                newsItem.appendChild(image);
                newsItem.appendChild(headline);
                newsItem.appendChild(description);

                newsItem.addEventListener('click', function() {
                    saveClickedNews(news); // 클릭된 뉴스 정보를 localStorage에 저장합니다.
                    showNewsDetailsInNewsJSP(news.id, index); // 클릭된 뉴스의 ID와 인덱스를 전달합니다.
                });

                if (index < 2) { // 1, 2번째 기사는 수평으로 표시
                    headlineSection.appendChild(newsItem);
                } else { // 그 이후의 기사는 수직으로 표시
                    newsList.appendChild(newsItem);
                }
            }
        });
    }

    // 클릭된 뉴스의 ID와 인덱스를 News.jsp로 전달하는 함수
    function showNewsDetailsInNewsJSP(newsId, index) {
        window.location.href = `News.jsp?newsId=${newsId}&index=${index}`;
    }

    // 페이지 로드 시 뉴스 데이터를 가져와서 뉴스 목록을 표시합니다.
    fetchNewsList();
});

// 카테고리 '일반'을 선택하여 보여주는 함수
function showGeneralNews() {
    // 일반 카테고리에 해당하는 뉴스 데이터 가져오기 등 추가 작업 수행
    // ...
}

// 카테고리 '연애'를 선택하여 보여주는 함수
function showEntertainmentNews() {
    // 연애 카테고리에 해당하는 뉴스 데이터 가져오기 등 추가 작업 수행
    // ...
}

// 카테고리 '스포츠'를 선택하여 보여주는 함수
function showSportsNews() {
    // 스포츠 카테고리에 해당하는 뉴스 데이터 가져오기 등 추가 작업 수행
    // ...
}