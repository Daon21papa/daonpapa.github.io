export function render() {
    return `
        <div class="section-grid animate-fade-in">
            <!-- Left Column: Emotion & Counseling -->
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                
                <!-- Emotion Diary Widget -->
                <div class="card">
                    <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">😊 감정 일기 분석</h2>
                    <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;">
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('happy')">😄</button>
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('neutral')">😐</button>
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('sad')">😢</button>
                        <button class="emotion-btn" onclick="window.features.care.addEmotion('angry')">😡</button>
                    </div>
                    <div class="alert-box" id="emotion-alert" style="display: none; background: #fff1f2; color: #be123c; padding: 1rem; border-radius: var(--radius-md); font-size: 0.9rem;">
                        <div style="font-weight: 700; margin-bottom: 0.25rem;">⚠️ 관심 필요 학생 감지</div>
                        <span>'김민수' 학생이 3일 연속 '우울' 감정을 기록했습니다. 상담이 권장됩니다.</span>
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
                        내 지갑: 150 P
                    </div>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1rem; font-weight: 600; color: var(--gray-500); margin-bottom: 0.5rem;">학생에게 포인트 지급</h3>
                    <div id="student-point-list" style="display: flex; flex-direction: column; gap: 0.5rem;">
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
            // Simulated Logic
            const alertBox = document.getElementById('emotion-alert');
            if (type === 'sad' || type === 'angry') {
                alertBox.style.display = 'block';
                setTimeout(() => alertBox.style.display = 'none', 5000);
            } else {
                alert('오늘의 감정이 기록되었습니다!');
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

            // Simulation
            setTimeout(() => {
                resultText.innerHTML = `<strong>[생성된 문구]</strong><br>"교우 관계에서의 갈등을 대화로 해결하려는 의지를 보이며, 자신의 감정을 솔직하게 표현하고 타인의 입장을 배려하는 태도가 성장하고 있음."`;
            }, 1000);
        },
        givePoints: (studentId, amount) => {
            const student = students.find(s => s.id === studentId);
            if (student) {
                student.points += amount;
                renderPoints();
            }
        },
        buyItem: (itemName, price) => {
            if (price < 0) {
                alert('칭찬 포인트를 획득했습니다!');
                return;
            }
            alert(`'${itemName}'을(를) 구매하시겠습니까? (차감: -${price} P)`);
        }
    };

    let students = [
        { id: 1, name: '김민수', points: 120 },
        { id: 2, name: '이영희', points: 80 },
        { id: 3, name: '박준호', points: 200 },
    ];

    const renderPoints = () => {
        const list = document.getElementById('student-point-list');
        list.innerHTML = students.map(s => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md);">
                <span style="font-weight: 500;">${s.name} <span style="font-weight: normal; color: var(--gray-500);">(${s.points} P)</span></span>
                <div style="display: flex; gap: 0.25rem;">
                    <button class="btn" style="padding: 0.2rem 0.5rem; background: var(--success); color: white;" onclick="window.features.care.givePoints(${s.id}, 10)">+10</button>
                    <button class="btn" style="padding: 0.2rem 0.5rem; background: var(--danger); color: white;" onclick="window.features.care.givePoints(${s.id}, -5)">-5</button>
                </div>
            </div>
        `).join('');
    };

    renderPoints();
}
