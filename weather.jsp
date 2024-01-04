<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="/bgh/css/weather.css" rel="stylesheet">
<script src="/bgh/js/weather.js"></script>
<title>반응형 날씨 웹사이트</title>
</head>
<body>
	<header>
		<h1>날씨 예보</h1>
		<div class="search_menu">
			<input type="text" id="keyword" placeholder="입력하세요."
				onkeydown="handleKeyDown(event)">
			<div class="search-icon" onclick="searchWeather()">
				<img src="/bgh/images/search.png" width="20px" vspace="8">
			</div>
		</div>
	</header>
	<!-- 비디오 컨테이너 -->
	<div id="video-container">
		<video autoplay loop muted id="background-video">
		</video>
	</div>
	<div class="container">
		<div class="content">
			<h1 id="location"></h1>
			<p id="temperature">
				<span id="temperature-value"></span>
			</p>
			<p id="humidity">
				<span id="humidity"></span>
			</p>
		</div>
	</div>
	<div class="footer">
		<p>© 날씨청 사이트</p>
	</div>
</body>
</html>