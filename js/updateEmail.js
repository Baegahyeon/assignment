
let isBold = false;

// 메일 사용 여부 변경 함수
function toggleMailStatus(cell) {
    if (cell.classList.contains('checked')) {
        cell.classList.remove('checked');
        cell.classList.add('unchecked');
        cell.textContent = '미사용';
    } else if (cell.classList.contains('unchecked')) {
        cell.classList.remove('unchecked');
        cell.classList.add('checked');
        cell.textContent = '사용';
    } else {
        cell.classList.add('checked');
    }
}

// 페이지 로드 시 실행되는 초기 설정
document.addEventListener('DOMContentLoaded', function() {
    const rowData = localStorage.getItem('rowData');
    const emailData = JSON.parse(rowData);

    // 여기서 emailData를 사용하여 화면에 데이터를 삽입합니다.
    const mailTypeElement = document.getElementById('mailType');
    const mailTitleElement = document.getElementById('mailTitle');
    const mailUsageCheckbox = document.getElementById('mailUsage');
    const emailContentElement = document.getElementById('emailContent');

    // 메일 내용이 변경될 때마다 미리보기 업데이트
    emailContentElement.addEventListener('input', updatePreview);

    // email.jsp에서 가져온 데이터를 화면에 삽입
    mailTypeElement.innerText = emailData.mailType;
    mailTitleElement.value = emailData.mailTitle;
    mailUsageCheckbox.checked = emailData.mailUsage;

    // 미리보기 업데이트를 위한 이벤트 리스너 추가
    [mailTypeElement, mailTitleElement, mailUsageCheckbox, emailContentElement].forEach(element => {
        element.addEventListener('input', updatePreview); // 입력값이 변경될 때마다 미리보기 업데이트
        if (element.tagName === 'INPUT') {
            element.addEventListener('change', updatePreview); // 변경(체크박스 등)이 발생했을 때 미리보기 업데이트
        }
    });
});

// 미리보기 업데이트 함수
function updatePreview() {
    const mailType = document.getElementById('mailType').innerText;
    const mailUsage = document.getElementById('mailUsage').checked ? '사용' : '미사용';
    const mailSubject = document.getElementById('mailTitle').value;
    const emailContent = document.getElementById('emailContent').value;

    document.getElementById('previewMailType').textContent = mailType;
    document.getElementById('previewMailUsage').textContent = mailUsage;
    document.getElementById('previewMailSubject').textContent = mailSubject;
    document.getElementById('previewEmailContentValue').textContent = emailContent;
}


// 미리보기 업데이트 함수
function updatePreview() {
    const mailType = document.getElementById('mailType').innerText;
    const mailUsage = document.getElementById('mailUsage').checked ? '사용' : '미사용';
    const mailSubject = document.getElementById('mailTitle').value;
    const emailContent = document.getElementById('emailContent').value;

    document.getElementById('previewMailType').textContent = mailType;
    document.getElementById('previewMailUsage').textContent = mailUsage;
    document.getElementById('previewMailSubject').textContent = mailSubject;
    document.getElementById('previewEmailContentValue').textContent = emailContent;
}
// 글꼴 굵기 설정 함수
function setFontWeight(fontWeight) {
    const emailContent = document.getElementById('emailContent');

    if (fontWeight === 'bold') {
        emailContent.style.fontWeight = isBold ? 'normal' : 'bold';
        isBold = !isBold;
    } else {
        emailContent.style.fontWeight = fontWeight;
    }
}

// 텍스트 정렬 설정 함수
function setAlignment(alignment) {
    document.getElementById('emailContent').style.textAlign = alignment;
}

// 글꼴 색상 설정 함수
function setFontColor() {
    const fontColor = document.getElementById('fontColor').value;
    document.getElementById('emailContent').style.color = fontColor;
}

// 파일 입력 처리 함수
function handleFileInput() {
    document.getElementById('fileInput').click();
}

// 파일 업로드 처리 함수
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result; // 이미지 데이터 URI
            // 이미지를 내용에 삽입하거나 미리보기 등의 작업 수행
            insertImageIntoContent(imageData);
        };
        reader.readAsDataURL(file);
    }
}

// 이미지 클릭 시 내용에 추가되는 함수
function insertImageIntoContent(imageData) {
    const imgElement = document.createElement('img');
    imgElement.src = imageData;

    // 이미지를 내용에 삽입하는 코드
    const emailContent = document.getElementById('emailContent');
    const cursorPos = emailContent.selectionStart;
    const contentBeforeCursor = emailContent.value.substring(0, cursorPos);
    const contentAfterCursor = emailContent.value.substring(cursorPos);

    emailContent.value = contentBeforeCursor + '\n'; // 이미지 삽입 전 줄 바꿈
    emailContent.selectionStart = emailContent.selectionEnd = cursorPos + 1;
    emailContent.focus();
    emailContent.value += '\n' + contentAfterCursor; // 이미지 삽입 후 줄 바꿈
}

// 파일 업로드 및 데이터 저장 처리 함수
function handleFileUploadAndSaveData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result; // 이미지 데이터 URI
            // 이미지를 내용에 삽입하거나 미리보기 등의 작업 수행
            insertImageIntoContent(imageData);

            // 수정된 내용을 email.jsp로 전달하여 이동
            const mailType = document.getElementById('mailType').innerText;
            const mailTitle = document.getElementById('mailTitle').value;
            const mailUsage = document.getElementById('mailUsage').checked;

            const emailContent = encodeURIComponent(document.getElementById('emailContent').value);
            alert('저장되었습니다.'); // 변경된 내용이 저장되었음을 사용자에게 알립니다.
            window.location.href = `email.jsp?mailType=${mailType}&mailTitle=${mailTitle}&mailUsage=${mailUsage}&emailContent=${emailContent}`;
        };
        reader.readAsDataURL(file);
    }
}

// 미리보기 내용 생성 함수
function generatePreviewContent() {
    const mailType = document.getElementById('searchCriteria').value;
    const mailTitle = document.getElementById('mailTitle').value;
    const mailContent = document.getElementById('emailContent').value;

    document.getElementById('previewMailType').innerText = mailType;
    document.getElementById('previewMailTitle').innerText = mailTitle;
    document.getElementById('previewEmailContentValue').innerText = mailContent;
}

// 이미지 미리보기 토글 함수
function togglePreview() {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'block';
}

// 미리보기 모달 관련 설정
document.addEventListener('DOMContentLoaded', function() {
    const previewButton = document.getElementById('previewButton');
    const modal = document.getElementById('previewModal');
    const closeBtn = document.querySelector('.close');

    previewButton.addEventListener('click', function() {
        modal.style.display = 'block';

        // 여기에 값을 가져와서 미리보기 모달에 표시하는 코드 작성
        const mailType = document.getElementById('mailType').value;
        const mailUsage = document.getElementById('mailUsage').checked ? '사용' : '미사용';
        const mailSubject = document.getElementById('mailTitle').value;
        const emailContent = document.getElementById('emailContent').value;

        document.getElementById('previewMailType').textContent = mailType;
        document.getElementById('previewMailUsage').textContent = mailUsage;
        document.getElementById('previewMailSubject').textContent = mailSubject;
        document.getElementById('previewEmailContentValue').textContent = emailContent;
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// 'email.jsp'로 이동 함수
function goBackToEmailPage() {
    if (confirm('변경된 내용을 저장하지 않고 나가시겠습니까?')) {
        window.location.href = 'email.jsp';
    }
}