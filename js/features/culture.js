export function render() {
    return `
        <div class="section-grid animate-fade-in">
            <!-- Random Picker -->
            <div class="card">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">🎲 랜덤 지명 & 모둠 구성</h2>
                
                <div class="picker-stage" style="background: var(--gray-900); height: 200px; border-radius: var(--radius-lg); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; margin-bottom: 1rem;">
                    <!-- Particle Effects would go here -->
                    <div id="picker-result" style="font-size: 3rem; font-weight: 700; color: white; text-shadow: 0 0 20px rgba(99, 102, 241, 0.8);">
                        ???
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <button class="btn btn-primary" onclick="window.features.culture.spinWheel()">
                        <i data-lucide="crosshair"></i> 발표자 뽑기
                    </button>
                    <button class="btn" style="background: var(--accent-500); color: white;" onclick="window.features.culture.makeGroups()">
                        <i data-lucide="users"></i> 모둠 자동 구성
                    </button>
                </div>
                
                <div id="group-result" style="margin-top: 1rem; padding: 1rem; border: 1px dashed var(--gray-300); border-radius: var(--radius-md); display: none;">
                    <!-- Groups injected -->
                </div>
            </div>

            <!-- Class Character Generator (AI Mock) -->
            <div class="card">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">🐯 우리 반 캐릭터 만들기 (AI)</h2>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">우리 반의 상징 동물은?</label>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <button class="animal-btn selected" onclick="window.features.culture.selectAnimal(this, 'tiger')">🐯 호랑이</button>
                        <button class="animal-btn" onclick="window.features.culture.selectAnimal(this, 'eagle')">🦅 독수리</button>
                        <button class="animal-btn" onclick="window.features.culture.selectAnimal(this, 'dolphin')">🐬 돌고래</button>
                    </div>

                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">원하는 스타일</label>
                    <select id="style-select" style="margin-bottom: 1rem;">
                        <option>3D 픽사 스타일</option>
                        <option>귀여운 웹툰 스타일</option>
                        <option>픽셀 아트</option>
                    </select>

                    <button class="btn btn-primary" style="width: 100%;" onclick="window.features.culture.generateCharacter()">
                        <i data-lucide="wand-2"></i> 캐릭터 생성하기
                    </button>
                </div>

                <div id="character-output" style="height: 250px; background: var(--gray-100); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--gray-500);">
                    <i data-lucide="image" style="width: 48px; height: 48px; opacity: 0.3;"></i>
                </div>
            </div>
        </div>

        <style>
            .animal-btn {
                flex: 1; padding: 0.75rem; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
                background: white; cursor: pointer; transition: all 0.2s;
            }
            .animal-btn.selected { border-color: var(--primary-500); background: var(--primary-50); color: var(--primary-700); font-weight: 700; }
        </style>
    `;
}

export function init() {
    window.features = window.features || {};
    window.features.culture = {
        spinWheel: () => {
            const display = document.getElementById('picker-result');
            let counter = 0;
            const students = ['김민수', '이영희', '박준호', '최지우', '정우성', '강동원'];

            const interval = setInterval(() => {
                display.innerText = students[Math.floor(Math.random() * students.length)];
                counter++;
                if (counter > 20) {
                    clearInterval(interval);
                    display.style.color = 'var(--accent-500)';
                    display.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        display.style.color = 'white';
                        display.style.transform = 'scale(1)';
                    }, 500);
                }
            }, 50);
        },
        makeGroups: () => {
            const resultBox = document.getElementById('group-result');
            resultBox.style.display = 'block';
            resultBox.innerHTML = `
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">🎉 모둠 구성 결과</h4>
                <div style="font-size: 0.9rem;">
                    <strong>1모둠:</strong> 김민수, 정우성<br>
                    <strong>2모둠:</strong> 이영희, 강동원<br>
                    <strong>3모둠:</strong> 박준호, 최지우
                </div>
            `;
        },
        selectAnimal: (btn, type) => {
            document.querySelectorAll('.animal-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        },
        generateCharacter: () => {
            const output = document.getElementById('character-output');
            const style = document.getElementById('style-select').value;
            const selectedAnimalBtn = document.querySelector('.animal-btn.selected');

            // Map animal keywords to emojis or logic
            let animalType = 'tiger';
            let animalEmoji = '🐯';

            if (selectedAnimalBtn) {
                const text = selectedAnimalBtn.innerText;
                if (text.includes('호랑이')) { animalType = 'tiger'; animalEmoji = '🐯'; }
                else if (text.includes('독수리')) { animalType = 'eagle'; animalEmoji = '🦅'; }
                else if (text.includes('돌고래')) { animalType = 'dolphin'; animalEmoji = '🐬'; }
            }

            output.innerHTML = '<span class="loading-spinner">AI 생성중...</span>';

            // Simulate AI generation with random variation
            setTimeout(() => {
                // Random adjective just for fun variety
                const adjectives = ['용감한', '귀여운', '지혜로운', '날쌘', '창의적인'];
                const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];

                output.innerHTML = `
                    <div style="text-align: center; animation: fadeIn 0.5s;">
                        <div style="font-size: 5rem; margin-bottom: 0.5rem;">${animalEmoji}</div>
                        <p style="font-weight: 600; font-size: 1.1rem; color: var(--gray-800);">
                            ${style}의<br>
                            <span style="color: var(--primary-600);">${randomAdj} ${animalType === 'tiger' ? '호랑이' : (animalType === 'eagle' ? '독수리' : '돌고래')}</span>
                        </p>
                    </div>
                `;
            }, 1500);
        }
    };
}
