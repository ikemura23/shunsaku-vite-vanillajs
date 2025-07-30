import '../style.css'

// 参加者データ
const participants = [
  { id: 1, name: '田中さん', color: 'color-1' },
  { id: 2, name: '佐藤さん', color: 'color-2' },
  { id: 3, name: '山田さん', color: 'color-3' },
  { id: 4, name: '鈴木さん', color: 'color-4' }
];

// グローバル変数
let currentScores = {};
let meetingStartTime = Date.now();
let updateInterval;
let isRunning = false;

// 面白いメッセージ集
const meterMessages = [
  '😴 みんなちょっと眠そう...?',
  '🤔 うーん、微妙な空気かも',
  '😊 まずまずの雰囲気ですね！',
  '🎉 いい感じで盛り上がってる！',
  '🔥 最高の会議じゃん！！',
  '💤 誰か起きて〜',
  '⚡ エネルギッシュな議論！',
  '🌈 みんなノリノリ！'
];

const gradeMessages = {
  'S': ['🚀 神レベルの会議！', '✨ 完璧すぎる！みんな最高！', '🏆 会議界のMVP！'],
  'A': ['🎉 この会議、なかなか良いじゃん！', '👏 みんな頑張った！', '🌟 素晴らしい会議でした！'],
  'B': ['😊 まずまずの会議でしたね', '👍 悪くない感じ！', '💡 改善の余地あり？'],
  'C': ['🤔 ちょっと盛り上がりに欠けたかも', '😅 次回はもっと活発に！', '💭 静かな会議でしたね'],
  'D': ['😴 みんなお疲れ様...', '🙄 沈黙は金？', '💤 会議というより瞑想会']
};

// ランダムスコア生成
function generateRandomScore() {
  return Math.floor(Math.random() * 100) + 1;
}

// 経過時間フォーマット
function formatElapsedTime() {
  const elapsed = Math.floor((Date.now() - meetingStartTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 参加者カード作成
function createParticipantCard(participant) {
  const scores = currentScores[participant.id];
  const totalScore = scores.voice + scores.face;
  
  return `
    <div class="participant-card ${participant.color}">
      <div class="participant-name">${participant.name}</div>
      <div class="score-item">
        <span class="score-label">🎤 声の感情</span>
        <span class="score-value">${scores.voice}</span>
      </div>
      <div class="score-item">
        <span class="score-label">😊 表情</span>
        <span class="score-value">${scores.face}</span>
      </div>
      <div class="total-score">
        合計: ${totalScore}点
      </div>
    </div>
  `;
}

// 全体スコア計算
function calculateOverallScore() {
  const totalSum = participants.reduce((sum, participant) => {
    const scores = currentScores[participant.id];
    return sum + scores.voice + scores.face;
  }, 0);
  return Math.floor(totalSum / participants.length);
}

// メーターメッセージ取得
function getMeterMessage(score) {
  if (score >= 170) return meterMessages[4]; // 最高
  if (score >= 140) return meterMessages[3]; // 良い
  if (score >= 100) return meterMessages[2]; // まずまず
  if (score >= 70) return meterMessages[1];  // 微妙
  if (score >= 40) return meterMessages[0];  // 眠い
  return meterMessages[5]; // 最悪
}

// グレード計算
function calculateGrade(score) {
  if (score >= 170) return 'S';
  if (score >= 140) return 'A';
  if (score >= 100) return 'B';
  if (score >= 70) return 'C';
  return 'D';
}

// グレードメッセージ取得
function getGradeMessage(grade) {
  const messages = gradeMessages[grade];
  return messages[Math.floor(Math.random() * messages.length)];
}

// スコア更新
function updateScores() {
  // 各参加者のスコアをランダム更新
  participants.forEach(participant => {
    currentScores[participant.id] = {
      voice: generateRandomScore(),
      face: generateRandomScore()
    };
  });
  
  // 計測中画面更新
  updateMeasuringScreen();
}

// 計測中画面更新
function updateMeasuringScreen() {
  // 経過時間更新
  document.getElementById('elapsed-time').textContent = formatElapsedTime();
  
  // 参加者カード更新
  const participantsGrid = document.getElementById('participants-grid');
  participantsGrid.innerHTML = participants.map(createParticipantCard).join('');
  
  // 全体メーター更新
  const overallScore = calculateOverallScore();
  const meterFill = document.getElementById('overall-meter-fill');
  const meterScoreElement = document.getElementById('overall-score');
  const meterMessage = document.getElementById('meter-message');
  
  meterFill.style.width = `${Math.min(overallScore / 2, 100)}%`;
  meterScoreElement.textContent = overallScore;
  meterMessage.textContent = getMeterMessage(overallScore);
}

// 結果画面更新
function updateResultsScreen() {
  const overallScore = calculateOverallScore();
  const grade = calculateGrade(overallScore);
  
  // グレード表示
  document.getElementById('grade-display').textContent = grade;
  document.getElementById('grade-message').textContent = getGradeMessage(grade);
  
  // サマリー統計
  const scores = participants.map(p => {
    const pScores = currentScores[p.id];
    return pScores.voice + pScores.face;
  });
  
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const avgScore = Math.floor(scores.reduce((a, b) => a + b, 0) / scores.length);
  
  const summaryStats = document.getElementById('summary-stats');
  summaryStats.innerHTML = `
    <div class="stat-item">
      <div class="stat-value">${maxScore}</div>
      <div class="stat-label">最高スコア</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${avgScore}</div>
      <div class="stat-label">平均スコア</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${minScore}</div>
      <div class="stat-label">最低スコア</div>
    </div>
  `;
  
  // 最終参加者結果
  const finalParticipantsGrid = document.getElementById('final-participants-grid');
  finalParticipantsGrid.innerHTML = participants.map(participant => {
    const scores = currentScores[participant.id];
    const totalScore = scores.voice + scores.face;
    return `
      <div class="final-participant-card ${participant.color}">
        <div style="font-size: 1.2rem; margin-bottom: 10px;">${participant.name}</div>
        <div style="font-size: 2rem; font-weight: bold;">${totalScore}点</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">
          声:${scores.voice} 表情:${scores.face}
        </div>
      </div>
    `;
  }).join('');
}

// 測定開始
function startMeasuring() {
  isRunning = true;
  meetingStartTime = Date.now();
  
  // 初期スコア設定
  participants.forEach(participant => {
    currentScores[participant.id] = {
      voice: generateRandomScore(),
      face: generateRandomScore()
    };
  });
  
  // 初回更新
  updateMeasuringScreen();
  
  // 1秒ごとに更新
  updateInterval = setInterval(updateScores, 1000);
}

// 測定停止
function stopMeasuring() {
  isRunning = false;
  if (updateInterval) {
    clearInterval(updateInterval);
  }
}

// 画面切り替え
function showScreen(screenId) {
  // 全画面を隠す
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  
  // 指定画面を表示
  document.getElementById(screenId).classList.remove('hidden');
}

// 結果表示
function showResults() {
  stopMeasuring();
  updateResultsScreen();
  showScreen('results-screen');
}

// 再開
function restart() {
  showScreen('measuring-screen');
  startMeasuring();
}

// 初期化
function init() {
  // イベントリスナー設定
  document.getElementById('show-results-btn').addEventListener('click', showResults);
  document.getElementById('restart-btn').addEventListener('click', restart);
  
  // 測定開始
  startMeasuring();
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', init);