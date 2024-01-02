<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Email Template</title>
<link href="/bgh/css/email.css" rel="stylesheet">
<script src="/bgh/js/email.js"></script>
</head>
<body>

	<header class="navy-bg">
		<div class="nav-container">
			<h3>컨텐츠 목록</h3>
			<div class="email-info">
				<!-- 등록된 메일 갯수를 표시하는 부분 -->
				<p>
					현재 등록: <span id="mailCount"></span>
				</p>
				| 등록된 전체 메일 유형입니다.
				<!-- 등록, 삭제 버튼 -->
				<button id="addMailBtn">등록</button>
				<button id="deleteMailBtn">삭제</button>
			</div>
		</div>
	</header>
	<!-- 테이블 구성 -->
	<table id="emailTable">
		<thead>
			<tr class="navy-bg">
				<th><input type="checkbox" id="selectAllCheckbox"></th>
				<th>No</th>
				<th>메일 유형</th>
				<th><a  id="emailSubjectHeader">메일 발송 제목</a></th>
				<th>메일 사용 여부</th>
				<th>수정일</th>
			</tr>
		</thead>
		<tbody id="emailTableBody">
			<!-- 여기에 동적으로 추가될 테이블 내용 -->
		</tbody>
	</table>
	<!-- 페이징 처리 -->
	<div class="pagination"></div>
	<footer>
		<button id="exportToExcelBtn">
			<img src="/bgh/images/excel.png" alt="엑셀">
		</button>
		<div class="pagination">
			<!-- 페이지 번호를 보여줄 부분 -->
			<button>&lt;</button>
			<span>1</span> <span>2</span> <span>3</span> <span>4</span>
			<!-- 페이지 이동 버튼 -->
			<button>&gt;</button>
		</div>
		<!-- 검색 기능 -->
		<div class="search-box">
			<select id="searchCriteria">
				<option value="mailType">메일 유형</option>
				<option value="mailTitle">메일 발송 제목</option>
				<option value="mailStatus">메일 사용 여부</option>
			</select> <input type="text" id="searchInput" placeholder="검색어를 입력하세요">
			<button onclick="searchMails()">검색</button>
		</div>
	</footer>
</body>
</html>