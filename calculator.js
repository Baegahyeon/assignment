/*
 작성일: 2023년 5월 31일
 작성자: 배가현
 */
$(document).ready(function() {
    var result = '0'; // 초기 값
    var units = ['m', 'mm', 'cm', 'km', 'in', 'ft'];
    var unitIndex = 0;
    var lastInputIsOperator = false; // 입력이 연산자인지 여부를 저장하는 변수
    var calculationHistory = []; // 계산 내역을 저장할 배열
    var maxHistoryCount = 10; // 보여줄 최대 계산 내역 
    var showHistory = false; // 계산 내역 표시 여부를 저장하는 변수


    function handleUnitToggleClick() {
        var unitButton = $(this);
        unitIndex = (unitIndex + 1) % units.length;
        var currentUnit = units[unitIndex];
        var convertedValue;

        if (currentUnit === 'm') {
            convertedValue = parseFloat(result);
        } else if (currentUnit === 'mm') {
            convertedValue = parseFloat(result) * 1000;
        } else if (currentUnit === 'cm') {
            convertedValue = parseFloat(result) * 100;
        } else if (currentUnit === 'km') {
            convertedValue = parseFloat(result) / 1000;
        } else if (currentUnit === 'in') {
            convertedValue = parseFloat(result) * 39.37;
        } else if (currentUnit === 'ft') {
            convertedValue = parseFloat(result) * 3.281;
        }

        unitButton.data('unit', currentUnit);
        unitButton.text(currentUnit);
        $('#result').val(convertedValue + currentUnit);
        lastInputIsOperator = false; // 연산자 입력 여부 초기화
    }

    $('.unit-toggle').click(handleUnitToggleClick);

    function handleNumberInput() {
        var inputNumber = parseFloat($(this).val());
        if (!isNaN(inputNumber)) {
            result = inputNumber.toString();
            var unitButton = $('.unit-toggle');
            var currentUnit = unitButton.data('unit');
            var convertedValue;

            if (currentUnit === 'm') {
                convertedValue = parseFloat(result);
            } else if (currentUnit === 'mm') {
                convertedValue = parseFloat(result) / 1000;
            } else if (currentUnit === 'cm') {
                convertedValue = parseFloat(result) / 100;
            } else if (currentUnit === 'km') {
                convertedValue = parseFloat(result) * 1000;
            } else if (currentUnit === 'in') {
                convertedValue = parseFloat(result) / 39.37;
            } else if (currentUnit === 'ft') {
                convertedValue = parseFloat(result) / 3.281;
            }

            $('#result').val(convertedValue + currentUnit);
        }
    }

    $('#result').on('input', handleNumberInput);

    var toggleSign = true;
    $('.toggle-sign').click(function() {
        toggleSign = !toggleSign;
        var currentResult = parseFloat(result);
        result = toggleSign ? Math.abs(currentResult).toString() : (-Math.abs(currentResult)).toString();
        var unitButton = $('.unit-toggle');
        var currentUnit = unitButton.data('unit');
        var convertedValue;

        if (currentUnit === 'm') {
            convertedValue = parseFloat(result);
        } else if (currentUnit === 'mm') {
            convertedValue = parseFloat(result) / 1000;
        } else if (currentUnit === 'cm') {
            convertedValue = parseFloat(result) / 100;
        } else if (currentUnit === 'km') {
            convertedValue = parseFloat(result) * 1000;
        } else if (currentUnit === 'in') {
            convertedValue = parseFloat(result) / 39.37;
        } else if (currentUnit === 'ft') {
            convertedValue = parseFloat(result) / 3.281;
        }
        $('#result').val(convertedValue + currentUnit);
        lastInputIsOperator = false; // 연산자 입력 여부 초기화
    });

    function handleOperatorClick() {
        if (lastInputIsOperator) {
            return; // 연산자를 연속해서 입력하지 않도록 중복 방지
        }

        var operator = $(this).text();
        var lastChar = result.slice(-1); // 결과값의 마지막 문자 가져오기

        if (lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '/') {
            // 마지막 문자가 이미 연산자인 경우, 새로운 연산자로 바꿈
            result = result.slice(0, -1);
        } else if (lastChar === '/100') {
            // 마지막 문자가 '/100'인 경우, 해당 부분을 제거
            result = result.slice(0, -4);
        }

        if (operator === 'x') {
            operator = '*'; // 'x' 연산자를 '*'로 
        } else if (operator === '%') {
            if (result.endsWith('/100')) {
                return; // 이미 '/100'이 적용된 경우 x
            }
            operator = '/100'; // '/' 연산자를 '/100'으로 
        } else if (operator === '/') {
            operator = '/'; // '/' 연산자를 '/'로 
        }

        result += operator;
        $('#result').val(result);
        lastInputIsOperator = true; // 연산자 입력 여부 설정
    }

    function handleEvaluateClick() {
        var evaluation = eval(result);
        $('#result').val(evaluation);
        calculationHistory.push(result + " = " + evaluation); // 계산 내역 저장

        if (calculationHistory.length > maxHistoryCount) {
            calculationHistory.shift(); // 최대 내역 개수를 초과하면 가장 오래된 내역 제거
        }

        showCalculationHistory(); // 계산 내역 표시
        result = evaluation.toString(); // 결과를 새로운 입력으로 설정
        lastInputIsOperator = false; // 연산자 입력 여부 초기화
    }
    function handleClearClick() {
        result = '0';
        unitIndex = 0; // 단위 인덱스를 0으로 초기화
        var currentUnit = units[unitIndex];
        var convertedValue = parseFloat(result);
        $('.unit-toggle').data('unit', currentUnit).text(currentUnit);
        $('#result').val(convertedValue.toString());

        showCalculationHistory(); // 계산 내역 표시
    }

    function handleNumberClick() {
        var number = $(this).text();
        if (result === '0' && number === '0') {
            return; // 연속해서 0을 입력할 경우 무시
        }
        if (result === '0') {
            result = ''; // 초기 값인 0을 제거
        }
        result += number;
        $('#result').val(result);
        lastInputIsOperator = false; // 연산자 입력 여부 초기화
    }


    function handleToggleHistoryClick() {
        showHistory = !showHistory;
        if (showHistory) {
            $('#calculation-history-container').show(); // 계산 내역을 표시
            $('#calculator-container').hide(); // 계산기 숨김
        } else {
            $('#calculation-history-container').hide(); // 계산 내역 숨김
            $('#calculator-container').show(); // 계산기 표시
        }
    }
    function showCalculationHistory() {
        $('#calculation-history-list').empty();
        var start = Math.max(0, calculationHistory.length - maxHistoryCount); // 시작 인덱스 계산
        for (var i = start; i < calculationHistory.length; i++) {
            var listItem = $('<li>').text(calculationHistory[i]);
            $('#calculation-history-list').append(listItem);
        }
    }
    $(document).ready(function() {
        // 계산기로 돌아가는 버튼 클릭 이벤트 처리
        $(document).on('click', '.back-to-calculator', function() {
            $('#calculation-history-container').hide();
            $('#calculator-container').show();
        });
    });

    $('.number').off('click').click(handleNumberClick);
    $('.operator').off('click').click(handleOperatorClick);
    $('.evaluate').off('click').click(handleEvaluateClick);
    $('.clear').off('click').click(handleClearClick);
    $('.toggle-history').off('click').click(handleToggleHistoryClick);
    $('.toggle-history').off('click').click(handleToggleHistoryClick);
});