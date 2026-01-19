export function render() {
    return `
        <div class="section-grid animate-fade-in">
            <!-- Notices -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="font-size: 1.25rem; font-weight: 700;">📢 스마트 가정통신문</h2>
                    <button class="btn btn-primary" onclick="window.features.connection.sendReminder()">
                        <i data-lucide="send"></i> 미확인 학부모 재알림
                    </button>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <div class="notice-item" style="padding: 1rem; background: var(--gray-50); border-radius: var(--radius-md); margin-bottom: 0.75rem; border-left: 4px solid var(--primary-500);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="font-weight: 700; color: var(--gray-900);">봄 현장체험학습 동의서</span>
                            <span style="font-size: 0.8rem; color: var(--gray-500);">2024.03.15</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.9rem; color: var(--gray-600);">제출: 18/24명</span>
                            <span style="font-size: 0.8rem; color: var(--warning); font-weight: 500;">미제출 6명</span>
                        </div>
                    </div>
                     <div class="notice-item" style="padding: 1rem; background: var(--gray-50); border-radius: var(--radius-md); border-left: 4px solid var(--gray-300);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="font-weight: 700; color: var(--gray-900);">학부모 총회 안내</span>
                            <span style="font-size: 0.8rem; color: var(--gray-500);">2024.03.10</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                             <span style="font-size: 0.9rem; color: var(--gray-600);">확인 완료</span>
                             <span style="font-size: 0.8rem; color: var(--success); font-weight: 500;">전원 확인</span>
                        </div>
                    </div>
                </div>

                <!-- Translation Service -->
                <div style="padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                    <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">🌐 다문화 가정 자동 번역 전송</h3>
                    <div style="display: flex; gap: 0.5rem;">
                        <select id="lang-select" style="flex: 1;">
                            <option value="vi">베트남어 (Tiếng Việt)</option>
                            <option value="zh">중국어 (中文)</option>
                            <option value="ph">필리핀어 (Tagalog)</option>
                            <option value="en">영어 (English)</option>
                        </select>
                        <button class="btn btn-primary" onclick="window.features.connection.translateSend()">전송</button>
                    </div>
                </div>
            </div>

            <!-- Anonymous Suggestion Box -->
            <div class="card">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">📬 익명 건의함 (마음의 편지)</h2>
                <div class="suggestion-box-container" style="background-image: linear-gradient(to bottom, #dbeafe 50%, #f0f9ff 50%); background-size: 100% 30px; border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 1.5rem; height: 300px; overflow-y: auto;">
                    <p style="text-align: center; color: var(--gray-500); font-style: italic; margin-bottom: 1rem;">
                        학생들의 솔직한 목소리가 도착하는 곳입니다.
                    </p>
                    <div style="background: white; padding: 1rem; border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) 0; box-shadow: var(--shadow-sm); margin-bottom: 1rem; max-width: 80%;">
                        <p style="font-size: 0.95rem; line-height: 1.6;">선생님, 짝꿍 정할 때 제비뽑기로 하면 안 될까요? 좋아하는 친구랑만 앉는 애들이 있어서요...</p>
                        <span style="display: block; font-size: 0.8rem; color: var(--gray-400); margin-top: 0.5rem; text-align: right;">익명 · 3월 18일</span>
                    </div>
                     <div style="background: white; padding: 1rem; border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) 0; box-shadow: var(--shadow-sm); max-width: 80%;">
                        <p style="font-size: 0.95rem; line-height: 1.6;">체육 시간에 피구 말고 다른 것도 하고 싶어요!</p>
                        <span style="display: block; font-size: 0.8rem; color: var(--gray-400); margin-top: 0.5rem; text-align: right;">익명 · 3월 17일</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function init() {
    window.features = window.features || {};
    window.features.connection = {
        sendReminder: () => {
            alert("미제출 학부모 6명에게 SMS 알림이 발송되었습니다.");
        },
        translateSend: () => {
            const lang = document.getElementById('lang-select');
            const langName = lang.options[lang.selectedIndex].text;
            alert(`알림장 내용이 '${langName}'로 번역되어 해당 가정에 전송되었습니다.`);
        }
    };
}
