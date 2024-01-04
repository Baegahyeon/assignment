<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="/bgh/css/News.css" rel="stylesheet">
<script src="/bgh/js/News.js"></script>
<title>최신뉴스 웹사이트</title>
</head>
<body>
	<header>
		<div class="container">
			<a href="News-detail.jsp"><h1>최신 News</h1></a>
			<div class="categories">
				<div class="buttons-left">
					<button class="btn-hover color-8" onclick="showPreviousNews()">이전
						News</button>
				</div>
				<div class="buttons-right">
					<button class="btn-hover color-9" onclick="showNextNews()">다음
						News</button>
				</div>
			</div>
			<div id="news-container"></div>
		</div>
	</header>
</body>
</html>