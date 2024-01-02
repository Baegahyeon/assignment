const itemsPerPage = 5; // 한 페이지에 표시할 항목 수
let currentPage = 1; // 현재 페이지 번호
let emailData = [
    { no: 1, type: '내부-결재요청', subject: '결재반려', isActive: '사용 ', modifiedDate: '2024-01-01' },
    { no: 2, type: '공통-로그분석재요청', subject: '로그분석 재요청', isActive: '사용', modifiedDate: '2024-01-02' },
    { no: 3, type: '내부-결재요청', subject: '결재요청', isActive: '사용 ', modifiedDate: '2024-01-01' },
    { no: 4, type: '내부-소영재요청', subject: '소명재요청', isActive: '미사용', modifiedDate: '2024-01-02' },
    { no: 5, type: '내부-종료', subject: '결재승인', isActive: '사용 ', modifiedDate: '2024-01-01' },
    { no: 6, type: '내부-결재요청', subject: '결재승인', isActive: '미사용 ', modifiedDate: '2024-01-02' },
    { no: 7, type: '내부-결재승인', subject: ' 결재승인', isActive: '사용 ', modifiedDate: '2024-01-01' },
    { no: 8, type: '공통-로그분석재요청', subject: '로그분석 재요청', isActive: '사용 ', modifiedDate: '2024-01-02' },
];

// 페이지에 따라 이메일 테이블 갱신
function populateEmailTable(data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const paginatedData = data.slice(startIndex, endIndex);
    const searchCriteria = document.getElementById('searchCriteria').value;
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    const tableBody = document.getElementById('emailTableBody');
    let tableContent = '';

    paginatedData.forEach(item => {
        tableContent += `
            <tr onclick="editEmail(${item.no})">
                <td><input type="checkbox" name="chk" class="check-item" value="${item.no}"></td>
                <td>${item.no}</td>
                <td>${item.type}</td>
                <td>
                    <a href="#" onclick="editEmail(${item.no})">${item.subject}</a>
                </td>
                <td>${item.isActive}</td>
                <td>${item.modifiedDate}</td>
            </tr>
        `;
    });

    tableBody.innerHTML = tableContent;

    // '메일 행' 클릭 시 해당 이메일 번호와 함께 updateEmail.jsp로 이동하는 함수
    function editEmail(no) {
        window.location.href = `updateEmail.jsp?no=${no}`;
    }

    const mailCountSpan = document.getElementById('mailCount');
    mailCountSpan.textContent = data.length; // 현재 등록된 전체 수를 표시


    // 검색 기준과 검색어를 이용하여 해당 기준에 맞는 이메일만 필터링
    if (searchInput !== '') {
        data = data.filter(email => {
            let searchData = email[searchCriteria].toString().toLowerCase();
            return searchData.includes(searchInput);
        });
    }
    // 페이징 처리 및 테이블 갱신은 검색된 데이터를 기반으로 수행됩니다.
    // ... (이미 구현된 코드)
}



// 현재 페이지 번호 업데이트
function updatePageNumber() {
    const totalItems = emailData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPageDisplay = document.getElementById('currentPage');

    if (currentPageDisplay) {
        currentPageDisplay.innerText = `현재 페이지: ${currentPage} / ${totalPages}`;
    }
}

// 페이지네이션 버튼 클릭 시 해당 페이지로 이동
document.addEventListener('DOMContentLoaded', function() {
    populateEmailTable(emailData);
    updatePageNumber();

    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (action === 'next' && currentPage < Math.ceil(emailData.length / itemsPerPage)) {
                currentPage++;
            } else {
                const pageNum = parseInt(this.innerText);
                if (!isNaN(pageNum)) {
                    currentPage = pageNum;
                }
            }

            populateEmailTable(emailData);
            updatePageNumber();
        });
    });


    // 삭제 버튼 클릭 시
    const deleteMailBtn = document.getElementById('deleteMailBtn');
    if (deleteMailBtn) {
        deleteMailBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.check-item:checked');
            const selectedItems = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

            // 선택된 이메일 삭제
            emailData = emailData.filter(item => !selectedItems.includes(item.no));
            currentPage = 1;

            // 번호 재배열
            emailData.forEach((item, index) => {
                item.no = index + 1;
            });

            populateEmailTable(emailData); // 테이블 갱신
            updatePageNumber(); // 페이지 번호 갱신
        });
    }

    // '등록' 버튼 클릭 시 email.jsp 페이지로 이동
    const addMailBtn = document.getElementById('addMailBtn');
    if (addMailBtn) {
        addMailBtn.addEventListener('click', function() {
            window.location.href = 'email_view.jsp';
        });
    }

    // '전체 선택' 기능
    const checkAllCheckbox = document.getElementById('selectAllCheckbox');
    if (checkAllCheckbox) {
        checkAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.check-item');
            checkboxes.forEach(checkbox => {
                checkbox.checked = checkAllCheckbox.checked;
            });
        });
    }
    // '엑셀' 버튼 클릭 시
    document.getElementById('exportToExcelBtn').addEventListener('click', function() {
        const csvContent = "data:text/csv;charset=utf-8," + emailData.map(row => Object.values(row).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "email_data.csv");
        document.body.appendChild(link); // 필요에 따라 DOM에 추가

        link.click();
    });
});
