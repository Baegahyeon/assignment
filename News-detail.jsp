<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="/bgh/css/News-detail.css" rel="stylesheet">
<script src="/bgh/js/News-detail.js"></script>
<title>최신 뉴스 웹사이트</title>
</head>
<body>
	<header>
		<div class="container">
			<h1>최신 News</h1>
			<div class="categories">
				<button onclick="showCategory('business')">비즈니스</button>
				<button onclick="showCategory('entertainment')">연애</button>
				<button onclick="showCategory('sports')">스포츠</button>
			</div>
			<div class="headline-news" id="headline-section">
				<!-- JavaScript로 생성될 1, 2번째 기사가 가로로 나오게 될 공간 -->
			</div>
			<div id="news-list">
				<!-- JavaScript로 동적으로 생성될 나머지 기사들이 세로로 나열될 공간 -->
			</div>
		</div>
	</header>
</body>
</html>