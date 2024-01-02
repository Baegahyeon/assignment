<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Email Template</title>
<link href="/bgh/css/email_view.css" rel="stylesheet">
<script src="/bgh/js/email_view.js"></script>
</head>
<body>
	<%
	String rowData = request.getParameter("rowData");
	// rowData를 사용하여 작업 수행
	%>
	<h3>컨텐츠 목록</h3>
	<div style="text-align: center;">
		<table border="1">
			<thead>
				<tr>
					<th class="special-cell" colspan="2">메일 유형</th>
					<th><input type="text" id="mailTitle" placeholder="제목을 입력하세요"></th>

					<th class="special-cell">메일 사용 여부</th>
					<td class="mailStatus checked" onclick="toggleMailStatus(this)">사용</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="special-cell" colspan="1">메일 발송제목</td>
					<td colspan="4">
						<div class="title-box">
							<input type="text" id="mailTitle" placeholder="제목을 입력하세요">
						</div>
				</tr>
				<tr>
					<td class="special-cell" colspan="1">메일 내용</td>
					<td colspan="4"><textar>
						<div class="controls">
							<button onclick="setFontWeight('bold')">
								<img src="/bgh/images/B.png" alt="볼드">
							</button>
							<input type="color" id="fontColor" onchange="setFontColor()"
								value="#000000" class="fontColor">
							<button onclick="setAlignment('left')">
								<img src="/bgh/images/left.png" alt="왼쪽 정렬">
							</button>
							<button onclick="setAlignment('center')">
								<img src="/bgh/images/center.png" alt="가운데 정렬">
							</button>
							<button onclick="setAlignment('right')">
								<img src="/bgh/images/right.png" alt="오른쪽 정렬">
							</button>
							<button onclick="document.getElementById('fileInput').click()">
								<img src="/bgh/images/photo.png" alt="사진"> <input
									type="file" id="fileInput" style="display: none;"
									onchange="handleFileUpload(event)">
							</button>
						</div>
						</textar>
						<div class="container">
							<textarea id="emailContent" contenteditable="true"
								placeholder="이메일 내용을 입력하세요"></textarea>
						</div></td>
				</tr>
				<tr>
					<td class="special-cell" colspan="1">변경사유</td>
					<td colspan="4">
						<div class="title-box">
							<input type="text" id="mailTitle" placeholder="">
						</div>
				</tr>
				<tr>
					<td colspan="4"></td>
					<th>
						<div id="previewButtonContainer">
							<button id="previewButton" onclick="togglePreview()">
								<img src="/bgh/images/file.png" alt="미리보기">
							</button>
						</div>
						<div id="previewModal" class="modal">
							<div class="modal-content">
								<span class="close">&times;</span>
								<table>
									<caption>미리보기</caption>
									<tbody>
										<tr>
											<th>이메일 유형:</th>
											<td><span id="previewMailType"></span></td>
										</tr>
										<tr>
											<th>메일 사용 여부:</th>
											<td><span id="previewMailUsage"></span></td>
										</tr>
										<tr>
											<th>메일 발송 제목:</th>
											<td><span id="previewMailSubject"></span></td>
										</tr>
										<tr>
											<th>메일 내용:</th>
											<td><span id="previewEmailContentValue"></span></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</th>
			</tbody>
		</table>
		<div class="btn-container">
			<button onclick="goBackToEmailPage()" class="button-style">창
				닫기</button>
			<button onclick="saveData()" class="button-style">저장</button>
		</div>
	</div>
</body>
</html>