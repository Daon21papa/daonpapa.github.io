export function render() {
    return `
        <div class="section-grid animate-fade-in">
            <!-- Smart Checklist Card -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700;">✅ 스마트 체크리스트</h2>
                    <button class="btn btn-primary" style="font-size: 0.8rem;" onclick="window.features.efficiency.notifyMissing()">
                        <i data-lucide="bell"></i> 미제출 알림
                    </button>
                </div>
                <div class="checklist-container" id="checklist-items">
                    <!-- Items injected here -->
                </div>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <input type="text" id="new-item-input" placeholder="새로운 할 일 추가 (예: 우유 신청서)">
                    <button class="btn btn-primary" id="add-item-btn"><i data-lucide="plus"></i></button>
                </div>
            </div>

            <!-- Dashboard Widgets Column -->
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <!-- Attendance Widget -->
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h2 style="font-size: 1.25rem; font-weight: 700;">📅 AI 출결 관리</h2>
                        <button class="btn" style="background: var(--gray-100);" onclick="window.features.efficiency.copyNeis()">
                            <i data-lucide="copy"></i> 나이스 복사
                        </button>
                    </div>
                    <div class="attendance-summary" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                        <div style="flex: 1; background: var(--primary-50); padding: 0.75rem; border-radius: var(--radius-md); text-align: center;">
                            <div style="font-size: 0.8rem; color: var(--primary-700);">출석</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-600);" id="count-present">0</div>
                        </div>
                        <div style="flex: 1; background: var(--accent-50); padding: 0.75rem; border-radius: var(--radius-md); text-align: center;">
                            <div style="font-size: 0.8rem; color: var(--accent-500);">결석/지각</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-500);" id="count-absent">0</div>
                        </div>
                    </div>
                    <ul id="student-attendance-list" style="list-style: none; max-height: 200px; overflow-y: auto;">
                        <!-- Student list injected -->
                    </ul>
                </div>

                <!-- Today's Menu Widget -->
                <div class="card" style="background: linear-gradient(135deg, #fff7ed 0%, #fff 100%);">
                    <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">🍱 오늘의 급식 (라온초)</h2>
                    <p id="school-lunch-menu" style="color: var(--gray-500); font-size: 0.9rem;">
                        <span class="loading-spinner">급식 정보 불러오는 중...</span>
                    </p>
                </div>
            </div>
        </div>
    `;
}

export function init() {
    // Expose logic to global scope for inline onclicks (simple prototype hack)
    window.features = window.features || {};
    window.features.efficiency = {
        notifyMissing: () => alert('미제출 학생 3명에게 알림을 발송했습니다!'),
        copyNeis: () => {
            navigator.clipboard.writeText('3월 4일 출결: 전원 출석');
            alert('나이스(NEIS) 형식으로 클립보드에 복사되었습니다.');
        },
        toggleAttendance: (id) => {
            const student = students.find(s => s.id === id);
            if (student) {
                student.status = student.status === 'present' ? 'absent' : 'present';
                renderAttendance();
                // Save to localStorage in real app
            }
        },
        toggleCheck: (id) => {
            const item = checklistItems.find(i => i.id === id);
            if (item) {
                item.done = !item.done;
                renderChecklist();
            }
        }
    };

    // --- State Mock ---
    let checklistItems = [
        { id: 1, text: '가정통신문 제출', done: true },
        { id: 2, text: '우유 급식 신청서', done: false },
        { id: 3, text: '실내화 가져오기', done: false },
    ];

    let students = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `학생 ${i + 1}`,
        status: 'present' // present, absent
    }));

    // --- Render Functions ---
    const renderChecklist = () => {
        const container = document.getElementById('checklist-items');
        container.innerHTML = checklistItems.map(item => `
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--gray-100);">
                <div 
                    onclick="window.features.efficiency.toggleCheck(${item.id})"
                    style="
                        width: 20px; height: 20px; border-radius: 4px; border: 2px solid ${item.done ? 'var(--primary-500)' : 'var(--gray-300)'};
                        background: ${item.done ? 'var(--primary-500)' : 'white'}; display: flex; align-items: center; justify-content: center;
                        cursor: pointer; transition: all 0.2s;
                    "
                >
                    ${item.done ? '<i data-lucide="check" style="color: white; width: 14px;"></i>' : ''}
                </div>
                <span style="flex: 1; text-decoration: ${item.done ? 'line-through' : 'none'}; color: ${item.done ? 'var(--gray-400)' : 'var(--gray-800)'};">
                    ${item.text}
                </span>
                <span style="font-size: 0.8rem; color: var(--danger); font-weight: 500; display: ${item.done ? 'none' : 'block'};">
                    미제출
                </span>
            </div>
        `).join('');
        if (window.lucide) lucide.createIcons();
    };

    const renderAttendance = () => {
        const list = document.getElementById('student-attendance-list');
        list.innerHTML = students.map(s => `
            <li style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px dashed var(--gray-100);">
                <span>${s.name}</span>
                <button 
                    onclick="window.features.efficiency.toggleAttendance(${s.id})"
                    style="
                        padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; border: none; cursor: pointer;
                        background: ${s.status === 'present' ? 'var(--primary-100)' : 'var(--accent-100)'};
                        color: ${s.status === 'present' ? 'var(--primary-700)' : 'var(--accent-600)'};
                    "
                >
                    ${s.status === 'present' ? '출석' : '결석'}
                </button>
            </li>
        `).join('');

        // Update stats
        document.getElementById('count-present').innerText = students.filter(s => s.status === 'present').length;
        document.getElementById('count-absent').innerText = students.filter(s => s.status !== 'present').length;
    };

    // Initial Render
    renderChecklist();
    renderAttendance();
    fetchLunchMenu();

    // Menu Fetcher Logic
    function fetchLunchMenu() {
        const menuDisplay = document.getElementById('school-lunch-menu');
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}${mm}${dd}`;

        // NEIS Open API
        const ATPT_OFCDC_SC_CODE = 'Q10'; // Jeonnam
        const SD_SCHUL_CODE = '8531075'; // Raon Elementary
        const API_URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${dateStr}`;

        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                try {
                    if (data.mealServiceDietInfo) {
                        const rawMenu = data.mealServiceDietInfo[1].row[0].DDISH_NM;
                        // Clean up the string: remove <br/> and (1.2.3...) detail info
                        const cleanMenu = rawMenu.replace(/<br\/>/g, ', ').replace(/\([0-9\.]+\)/g, '');
                        menuDisplay.innerText = cleanMenu;
                    } else {
                        menuDisplay.innerText = "오늘은 급식 정보가 없습니다. (휴일/방학)";
                    }
                } catch (e) {
                    console.error("Menu Parse Error", e);
                    menuDisplay.innerText = "메뉴 정보를 불러올 수 없습니다.";
                }
            })
            .catch(err => {
                console.error("Menu Fetch Error", err);
                menuDisplay.innerText = "네트워크 오류로 정보를 가져오지 못했습니다.";
            });
    }

    // Event Listeners
    document.getElementById('add-item-btn').addEventListener('click', () => {
        const input = document.getElementById('new-item-input');
        if (input.value.trim()) {
            checklistItems.push({ id: Date.now(), text: input.value, done: false });
            input.value = '';
            renderChecklist();
        }
    });
}
