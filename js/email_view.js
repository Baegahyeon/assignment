let isBold = false;

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

function setFontWeight(fontWeight) {
    const emailContent = document.getElementById('emailContent');

    if (fontWeight === 'bold') {
        emailContent.style.fontWeight = isBold ? 'normal' : 'bold';
        isBold = !isBold;
    } else {
        emailContent.style.fontWeight = fontWeight;
    }
}

function setAlignment(alignment) {
    document.getElementById('emailContent').style.textAlign = alignment;
}

function setFontColor() {
    const fontColor = document.getElementById('fontColor').value;
    document.getElementById('emailContent').style.color = fontColor;
}

function handleFileInput() {
    document.getElementById('fileInput').click();
}

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

function insertImageIntoContent(imageData) {
    const imgElement = document.createElement('img');
    imgElement.src = imageData;
    // 여기서 이미지를 원하는 위치에 삽입하는 코드를 추가
    document.getElementById('emailContent').appendChild(imgElement);
}


function saveData() {
    const mailType = document.getElementById('mailType').innerText;
    const mailTitle = document.getElementById('mailTitle').value;
    const mailUsage = document.getElementById('mailUsage').checked;

    localStorage.setItem('mailType', mailType);
    localStorage.setItem('mailTitle', mailTitle);
    localStorage.setItem('mailUsage', mailUsage);

    window.location.href = 'email.jsp';
}

function generatePreviewContent() {
    const mailType = document.getElementById('searchCriteria').value;
    const mailTitle = document.getElementById('mailTitle').value;
    const mailContent = document.getElementById('emailContent').value;

    document.getElementById('previewMailType').innerText = mailType;
    document.getElementById('previewMailTitle').innerText = mailTitle;
    document.getElementById('previewEmailContentValue').innerText = mailContent;
}

// 이미지 아이콘이 클릭되었을 때 미리보기 창을 보여주는 함수
function togglePreview() {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'block';
}
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
// 이메일 내용을 로컬 스토리지에 저장하고 페이지 이동하는 함수
function saveDataAndRedirect() {
    const mailType = document.getElementById('mailType').innerText;
    const mailTitle = document.getElementById('mailTitle').value;
    const mailUsage = document.getElementById('mailUsage').checked;

    localStorage.setItem('mailType', mailType);
    localStorage.setItem('mailTitle', mailTitle);

    const emailContent = encodeURIComponent(document.getElementById('emailContent').value);
    window.location.href = `email.jsp?mailType=${mailType}&mailTitle=${mailTitle}&mailUsage=${mailUsage}&emailContent=${emailContent}`;

    alert('저장되었습니다.');

    window.location.href = `email.jsp?mailType=${mailType}&mailTitle=${mailTitle}&mailUsage=${mailUsage}&emailContent=${emailContent}`;
}
// 브라우저 로드 시 저장된 이메일 내용 불러오기
window.onload = function() {
    const savedEmailContent = localStorage.getItem('savedEmailContent');
    if (savedEmailContent) {
        document.getElementById('emailContent').value = savedEmailContent;
    }
};

// 'email.jsp'로 돌아가기
function goBackToEmailPage() {
    if (confirm('변경된 내용을 저장하지 않고 나가시겠습니까?')) {
        window.location.href = 'email.jsp';
    }
}