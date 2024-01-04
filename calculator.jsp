<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="/bgh/css/calculator.css" rel="stylesheet">
<title>계산기 만들기</title>
</head>
<body>
	<div id="calculator-container" class="calculator">
		<input type="text" class="display" id="result" readonly>
		<div class="buttons">
			<button class="clear">C</button>
			<button class="operator toggle-history" id="show-history-btn">History</button>
			<button class="operator">/</button>
			<button class="operator">%</button>
			<button class="number num-purple">7</button>
			<button class="number num-purple">8</button>
			<button class="number num-purple">9</button>
			<button class="operator operator-orange">x</button>
			<button class="number num-purple">4</button>
			<button class="number num-purple">5</button>
			<button class="number num-purple">6</button>
			<button class="operator operator-orange">-</button>
			<button class="number num-purple">1</button>
			<button class="number num-purple">2</button>
			<button class="number num-purple">3</button>
			<button class="operator operator-orange">+</button>
			<button class="number num-purple">0</button>
			<button class="number num-purple">.</button>
			<button class="unit-toggle">m</button>
			<button class="evaluate" onclick="handleEvaluateClick()">=</button>
		</div>
	</div>
	<div id="calculation-history-container" class="calculator">
		<div class="calculator-inner">
			<div id="calculation-history">
				<ul id="calculation-history-list"></ul>
				<button class="back-to-calculator"
					onclick="handleBackToCalculatorClick()">계산기로 돌아가기</button>
			</div>
		</div>
	</div>
	<script type="text/javascript"
		src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<script src="/bgh/js/bootstrap.js"></script>
	<script src="/bgh/js/calculator.js"></script>
</body>
</html>