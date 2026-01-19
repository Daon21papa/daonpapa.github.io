export function render() {
    return `
        <div class="section-grid animate-fade-in">
            <!-- Left Column: Emotion & Counseling -->
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                
                <!-- Emotion Diary Widget -->
                <div class="card">
                    <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">😊 감정 일기 분석</h2>
                    
                    <!-- Student Selector -->
                    <div style="margin-bottom: 1rem;">
                        <label style="font-size: 0.9rem; font-weight: 600; color: var(--gray-600); margin-bottom: 0.5rem; display: block;">학생 선택</label>
                        <select id="emotion-student-select" style="width: 100%; padding: 0.6rem; border: 1px solid var(--gray-200); border-radius: 0.5rem;">
                            <option value="">학생을 선택해주세요</option>
                            <!-- Options injected -->
                        </select>
                    </div>

                    <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;">
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('happy')">😄</button>
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('neutral')">😐</button>
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('sad')">😢</button>
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('angry')">😡</button>
                    </div>
                    <div class="alert-box" id="emotion-alert" style="display: none; background: #fff1f2; color: #be123c; padding: 1rem; border-radius: var(--radius-md); font-size: 0.9rem;">
                        <div style="font-weight: 700; margin-bottom: 0.25rem;">⚠️ 관심 필요 학생 감지</div>
                        <span id="emotion-alert-msg"></span>
                    </div>
                </div>

                <!-- Counseling Log -->
                <div class="card">
                    <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">📝 상담 로그 및 AI 요약</h2>
                    <div style="margin-bottom: 1rem;">
                        <textarea id="counseling-input" rows="4" placeholder="상담 내용을 간단히 입력하세요... (예: 친구 관계 문제로 고민함)"></textarea>
                    </div>
                    <button class="btn btn-primary" style="width: 100%;" onclick="window.features.care.generateSummary()">
                        <i data-lucide="sparkles"></i> AI 생활기록부 초안 생성
                    </button>
                    <div id="ai-summary-result" style="margin-top: 1rem; padding: 1rem; background: var(--gray-50); border-radius: var(--radius-md); display: none;">
                        <p style="color: var(--gray-600); font-size: 0.9rem;"></p>
                    </div>
                </div>
            </div>

            <!-- Right Column: Positive Reinforcement -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700;">🪙 학급 화폐 (쑥쑥 포인트)</h2>
                    <div style="background: var(--warning); color: white; padding: 0.25rem 0.75rem; border-radius: 99px; font-weight: 700;">
                        우리 반 총 포인트: <span id="total-class-points">0</span> P
                    </div>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1rem; font-weight: 600; color: var(--gray-500); margin-bottom: 0.5rem;">학생별 포인트 관리</h3>
                    <div id="student-point-list" style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 400px; overflow-y: auto;">
                        <!-- Student Point Controls Injected -->
                    </div>
                </div>

                <div>
                    <h3 style="font-size: 1rem; font-weight: 600; color: var(--gray-500); margin-bottom: 0.5rem;">🏪 학급 상점</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                        <div class="shop-item" onclick="window.features.care.buyItem('급식 우선권', 50)">
                            <span>🍚 급식 우선권</span>
                            <strong>50 P</strong>
                        </div>
                        <div class="shop-item" onclick="window.features.care.buyItem('자리 바꾸기', 100)">
                            <span>🪑 자리 바꾸기</span>
                            <strong>100 P</strong>
                        </div>
                        <div class="shop-item" onclick="window.features.care.buyItem('숙제 1회 면제', 200)">
                            <span>🎟️ 숙제 면제</span>
                            <strong>200 P</strong>
                        </div>
                        <div class="shop-item" onclick="window.features.care.buyItem('선생님 돕기', -10)">
                            <span>🧘 선생님 돕기</span>
                            <strong>+10 P</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            .emotion-btn {
                width: 50px; height: 50px; font-size: 1.5rem;
                background: white; border: 2px solid var(--gray-200); border-radius: 50%;
                cursor: pointer; transition: transform 0.2s;
            }
            .emotion-btn:hover { transform: scale(1.1); border-color: var(--primary-500); }
            
            .shop-item {
                background: var(--gray-50); padding: 0.75rem; border-radius: var(--radius-md);
                border: 1px solid var(--gray-200); cursor: pointer; text-align: center;
                transition: all 0.2s;
            }
            .shop-item:hover { background: var(--primary-50); border-color: var(--primary-200); }
            .shop-item span { display: block; font-size: 0.85rem; margin-bottom: 0.25rem; }
            .shop-item strong { color: var(--primary-600); }
        </style>
    `;
}

export function init() {
    window.features = window.features || {};
    window.features.care = {
        addEmotion: (type) => {
            const select = document.getElementById('emotion-student-select');
            const studentId = parseInt(select.value);

            if (!studentId) {
                alert('학생을 먼저 선택해주세요.');
                return;
            }

            const student = students.find(s => s.id === studentId);

            // Save Log
            const log = { studentId: studentId, emotion: type, date: new Date().toISOString() };
            emotionLogs.push(log);
            localStorage.setItem('emotionLogs', JSON.stringify(emotionLogs));

            // Logic Check (Mock Logic)
            const alertBox = document.getElementById('emotion-alert');
            const alertMsg = document.getElementById('emotion-alert-msg');

            if (type === 'sad' || type === 'angry') {
                const count = emotionLogs.filter(l => l.studentId === studentId && (l.emotion === 'sad' || l.emotion === 'angry')).length;
                if (count >= 3) {
                    alertBox.style.display = 'block';
                    alertMsg.innerText = `'${student.name}' 학생이 부정적인 감정을 ${count}회 기록했습니다. 상담이 권장됩니다.`;
                    // Auto hide after 5s
                    setTimeout(() => alertBox.style.display = 'none', 8000);
                } else {
                    alert(`${student.name} 학생의 감정(${type})이 기록되었습니다.`);
                }
            } else {
                alert(`${student.name} 학생의 감정(${type})이 기록되었습니다!`);
            }
        },
        generateSummary: () => {
            const input = document.getElementById('counseling-input').value;
            if (!input) {
                alert('상담 내용을 입력해주세요.');
                return;
            }
            const resultBox = document.getElementById('ai-summary-result');
            const resultText = resultBox.querySelector('p');

            resultBox.style.display = 'block';
            resultText.innerText = 'AI 처리중...';

            setTimeout(() => {
                resultText.innerHTML = `<strong>[생성된 문구]</strong><br>"${input} 내용에 기반하여, 교우 관계 개선을 위해 노력하고 있으며..." (예시)`;
            }, 1000);
        },
        givePoints: (studentId, amount) => {
            const student = students.find(s => s.id === studentId);
            if (student) {
                student.points = (student.points || 0) + amount;
                saveStudents();
                renderPoints();
            }
        },
        buyItem: (itemName, price) => {
            if (price < 0) {
                alert('칭찬 포인트를 획득했습니다! (개별 학생에게 지급해주세요)');
                return;
            }
            alert(`'${itemName}' 구매는 학생이 직접 요청해야 합니다.\n(선생님이 해당 학생의 포인트를 차감해주세요: -${price} P)`);
        }
    };

    // --- Data Loading ---
    let students = [];
    let emotionLogs = [];

    const loadData = () => {
        // Students
        const storedStudents = localStorage.getItem('studentList');
        if (storedStudents) {
            students = JSON.parse(storedStudents);
        } else {
            // Fallback if accessed directly without init in efficiency
            // In a real app, we might want a shared store.
            // For now, we assume efficiency runs first or we handle empty nicely.
            students = [];
        }

        // Emotion Logs
        const storedLogs = localStorage.getItem('emotionLogs');
        if (storedLogs) {
            emotionLogs = JSON.parse(storedLogs);
        }
    };

    const saveStudents = () => {
        localStorage.setItem('studentList', JSON.stringify(students));
    };

    loadData();

    // --- Renderers ---
    const renderStudentSelect = () => {
        const select = document.getElementById('emotion-student-select');
        if (!select) return;
        // Keep default option
        const defaultOpt = select.firstElementChild;
        select.innerHTML = '';
        select.appendChild(defaultOpt);

        students.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.innerText = s.name;
            select.appendChild(opt);
        });
    };

    const renderPoints = () => {
        const list = document.getElementById('student-point-list');
        const totalDisplay = document.getElementById('total-class-points');
        if (!list) return;

        let totalPoints = 0;

        list.innerHTML = students.map(s => {
            totalPoints += (s.points || 0);
            return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md);">
                <span style="font-weight: 500;">${s.name} <span style="font-weight: normal; color: var(--gray-500);">(${s.points || 0} P)</span></span>
                <div style="display: flex; gap: 0.25rem;">
                    <button class="btn" style="padding: 0.2rem 0.5rem; background: var(--success); color: white;" onclick="window.features.care.givePoints(${s.id}, 1)">+1</button>
                    <button class="btn" style="padding: 0.2rem 0.5rem; background: var(--success); color: white;" onclick="window.features.care.givePoints(${s.id}, 5)">+5</button>
                    <button class="btn" style="padding: 0.2rem 0.5rem; background: var(--danger); color: white;" onclick="window.features.care.givePoints(${s.id}, -1)">-1</button>
                </div>
            </div>
        `}).join('');

        if (totalDisplay) totalDisplay.innerText = totalPoints;
    };

    renderStudentSelect();
    renderPoints();
}
