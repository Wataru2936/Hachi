document.addEventListener('DOMContentLoaded', () => {
    const gachaButton = document.getElementById('gachaButton');
    const gachaResult = document.getElementById('gachaResult');
    const gachaDisplay = document.querySelector('.gacha-display');
    const bunpachiImage = document.querySelector('.bunpachi-image');
    const homeButton = document.getElementById('homeButton');
    const gifContainer = document.querySelector('.gif-container');
    const logo = document.querySelector('.logo');
    const winProbability = 0.3; // 30%の確率で当たり

    // 効果音の設定
    const winSound = new Audio('win.mp3');
    const loseSound = new Audio('lose.mp3');
    const clickSound = new Audio('click.mp3');

    let isSpinning = false;
    let autoReturnTimer = null;

    // ホームに戻る関数
    function returnToHome() {
        // 結果を非表示
        gachaResult.style.opacity = '0';
        // ガチャボタンを有効化して表示
        gachaButton.disabled = false;
        gachaButton.classList.remove('hidden');
        // スピン状態をリセット
        isSpinning = false;
        // ホームボタンを非表示
        homeButton.classList.remove('visible');
        // GIFを非表示
        gifContainer.classList.remove('visible');
        // タイマーをクリア
        if (autoReturnTimer) {
            clearTimeout(autoReturnTimer);
            autoReturnTimer = null;
        }

        // ホームメッセージを表示
        setTimeout(() => {
            gachaResult.innerHTML = `
                <div class="welcome-message">
                    <p>はち歯科の診療のご褒美に</p>
                    <p>ガチャを1回どうぞ！</p>
                    <p>お楽しみに下さい🎉</p>
                </div>
                <p class="hint">当たり確率：30%</p>
            `;
            gachaResult.style.opacity = '1';
        }, 300);
    }

    // ホームボタンのイベントリスナー
    homeButton.addEventListener('click', returnToHome);
    
    // ロゴクリックでホームに戻るイベントリスナー
    logo.addEventListener('click', returnToHome);

    // ロゴにホバー効果を追加
    logo.style.cursor = 'pointer';

    // キラキラエフェクトを追加
    function addSparkles() {
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const duration = 0.5 + Math.random() * 1;
            const delay = Math.random() * 0.5;
            
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animation = `sparkleAnimation ${duration}s ease-out ${delay}s`;
            
            gachaDisplay.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), (duration + delay) * 1000);
        }
    }

    // 画面全体のフラッシュ効果
    function addScreenFlash() {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
    }

    // 拡大する円エフェクト
    function addExpandingCircles() {
        const container = document.createElement('div');
        container.className = 'win-effect-container';
        
        for (let i = 0; i < 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'win-circle';
            circle.style.animationDelay = `${i * 0.2}s`;
            container.appendChild(circle);
        }
        
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 2000);
    }

    // シャイニングエフェクト
    function addShiningEffect() {
        const shining = document.createElement('div');
        shining.className = 'shining-effect';
        gachaDisplay.appendChild(shining);
        setTimeout(() => shining.remove(), 2000);
    }

    // パーティクルエフェクトを強化
    function addEnhancedParticles() {
        const colors = ['#FFD700', '#FFA500', '#FFFF00', '#ffffff'];
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'enhanced-particle';
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            const size = 5 + Math.random() * 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
            
            gachaDisplay.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }

    async function executeGacha() {
        if (isSpinning) return;
        
        isSpinning = true;
        gachaButton.disabled = true;
        clickSound.play().catch(() => {});

        // ぶんぱちの回転アニメーション
        bunpachiImage.classList.add('spinning');

        // 画面フラッシュ
        addScreenFlash();

        // GIFアニメーションを表示
        gifContainer.classList.add('visible');

        // 結果を決定
        const isWin = Math.random() < winProbability;

        // 回転アニメーション開始
        gachaDisplay.classList.add('gacha-spinning');
        addSparkles();

        // GIFアニメーションの表示時間（3秒）
        await new Promise(resolve => setTimeout(resolve, 3000));

        // GIFアニメーションを非表示
        gifContainer.classList.remove('visible');

        // 回転停止
        gachaDisplay.classList.remove('gacha-spinning');
        bunpachiImage.classList.remove('spinning');

        // 結果表示のアニメーション
        gachaResult.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 300));

        if (isWin) {
            // 当たりの場合の派手な演出
            addExpandingCircles();
            addShiningEffect();
            addEnhancedParticles();
            
            winSound.play().catch(() => {});
            
            gachaResult.innerHTML = `
                <div class="result-reveal">
                    <p class="result-heading">🎉 おめでとうございます！ 🎉</p>
                    <p>素敵なプレゼントをお受け取りください！</p>
                    <p class="win-message">受付でお申し付けください🎁</p>
                    <p>次回ご来院お待ちしております🦷</p>
                </div>
            `;
        } else {
            // ハズレの場合
            loseSound.play().catch(() => {});
            
            gachaResult.innerHTML = `
                <div class="result-reveal">
                    <p class="result-heading">残念ながらハズレでした...</p>
                    <p>お疲れ様でした🍵</p>
                    <p>次回ご来院お待ちしております🦷</p>
                </div>
            `;
        }

        // 結果を表示
        gachaResult.style.opacity = '1';

        // ガチャボタンを非表示
        gachaButton.classList.add('hidden');

        // ホームボタンを表示
        homeButton.classList.add('visible');

        // 10秒後に自動でホームに戻る
        autoReturnTimer = setTimeout(returnToHome, 10000);
    }

    // イベントリスナーの設定
    gachaButton.addEventListener('click', executeGacha);
}); 