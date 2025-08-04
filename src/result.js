// 結果表示・演出機能

import { animationUtils, storage, notifyUtils, debugUtils } from './utils.js'
import { getScoreDetails, generateComparisonData, calculateBonusDetails } from './scoring.js'

// 結果ページ表示
export function showResultPage() {
  const mainContent = document.getElementById('main-content')
  const currentYear = window.swingApp.currentYear
  
  // 今年の結果データを取得
  const currentYearData = window.swingApp.history.find(h => h.year === currentYear)
  
  if (!currentYearData) {
    // 結果データがない場合
    mainContent.innerHTML = `
      <div class="max-w-2xl mx-auto text-center">
        <div class="alert alert-warning mb-6">
          <span>⚠️ ${currentYear}年度のスイング結果がありません</span>
        </div>
        <button class="btn btn-primary" onclick="navigateTo('upload')">スイング動画をアップロード</button>
      </div>
    `
    return
  }
  
  // 結果ページを表示
  displayResults(currentYearData)
}

// 結果表示メイン関数
function displayResults(resultData) {
  const mainContent = document.getElementById('main-content')
  const scoreDetails = getScoreDetails(resultData.scores)
  const comparisonData = generateComparisonData(resultData.totalScore, 
    window.swingApp.history.filter(h => h.year !== resultData.year))
  const bonusDetails = calculateBonusDetails(resultData.totalScore)
  
  mainContent.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <!-- メインスコア表示 -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-5xl font-bold mb-4">🎉 結果発表 🎉</h1>
        <h2 class="text-3xl mb-6">${resultData.year}年度 社長スイング・ボーナスジャッジ</h2>
        
        <!-- 総合スコア -->
        <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl mb-8">
          <div class="card-body text-center py-12">
            <h3 class="text-2xl mb-4">総合スコア</h3>
            <div class="text-8xl font-bold mb-4 animate-score-pulse" id="total-score">0</div>
            <div class="text-xl">/ 100点</div>
            <div class="badge badge-lg badge-outline mt-4" id="score-grade"></div>
          </div>
        </div>
      </div>
      
      <!-- ボーナス情報 -->
      <div class="grid lg:grid-cols-2 gap-8 mb-12">
        <div class="card bg-success text-success-content shadow-xl">
          <div class="card-body text-center">
            <h3 class="card-title justify-center text-2xl mb-4">💰 ボーナス増額</h3>
            <div class="text-6xl font-bold mb-2" id="bonus-rate">0</div>
            <div class="text-xl mb-4">% 増額！</div>
            <div class="text-lg">基本給 + <span id="bonus-amount" class="font-bold">0円</span></div>
          </div>
        </div>
        
        <div class="card bg-info text-info-content shadow-xl">
          <div class="card-body text-center">
            <h3 class="card-title justify-center text-2xl mb-4">📈 成長記録</h3>
            <div id="comparison-content"></div>
          </div>
        </div>
      </div>
      
      <!-- 項目別スコア -->
      <div class="card bg-base-200 shadow-xl mb-8">
        <div class="card-body">
          <h3 class="card-title text-2xl mb-6">📊 項目別スコア</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" id="score-items">
            <!-- 項目別スコアがここに動的に挿入される -->
          </div>
        </div>
      </div>
      
      <!-- AI分析コメント -->
      <div class="card bg-accent text-accent-content shadow-xl mb-8">
        <div class="card-body">
          <h3 class="card-title text-2xl mb-4">🤖 AI分析コメント</h3>
          <p class="text-lg leading-relaxed">${resultData.comment}</p>
        </div>
      </div>
      
      <!-- アクションボタン -->
      <div class="text-center space-x-4">
        <button id="share-btn" class="btn btn-primary btn-lg">📱 結果をシェア</button>
        <button onclick="navigateTo('gallery')" class="btn btn-outline btn-lg">📚 履歴を見る</button>
        <button onclick="navigateTo('home')" class="btn btn-outline btn-lg">🏠 ホームに戻る</button>
      </div>
      
      <!-- パーティクル演出用コンテナ -->
      <div id="particle-container" class="fixed inset-0 pointer-events-none z-10"></div>
    </div>
  `
  
  // アニメーション開始
  startResultAnimations(resultData, scoreDetails, comparisonData, bonusDetails)
  
  // イベントリスナー設定
  setupResultEventListeners(resultData)
}

// 結果アニメーション開始
function startResultAnimations(resultData, scoreDetails, comparisonData, bonusDetails) {
  // 段階的にアニメーション実行
  setTimeout(() => animateTotalScore(resultData.totalScore), 500)
  setTimeout(() => animateBonusInfo(bonusDetails), 1500)
  setTimeout(() => animateScoreItems(scoreDetails), 2000)
  setTimeout(() => animateComparison(comparisonData), 2500)
  setTimeout(() => startCelebration(resultData.totalScore), 3000)
}

// 総合スコアのカウントアップアニメーション
function animateTotalScore(targetScore) {
  const scoreElement = document.getElementById('total-score')
  const gradeElement = document.getElementById('score-grade')
  
  // カウントアップアニメーション
  animationUtils.countUp(scoreElement, 0, targetScore, 2000)
  
  // グレード表示
  setTimeout(() => {
    const grade = getScoreGradeInfo(targetScore)
    gradeElement.textContent = `${grade.grade}ランク: ${grade.text}`
    gradeElement.className = `badge badge-lg badge-outline ${grade.color}`
    gradeElement.classList.add('animate-bounce')
  }, 2000)
}

// ボーナス情報のアニメーション
function animateBonusInfo(bonusDetails) {
  const rateElement = document.getElementById('bonus-rate')
  const amountElement = document.getElementById('bonus-amount')
  
  animationUtils.countUp(rateElement, 0, bonusDetails.bonusRate, 1000)
  
  setTimeout(() => {
    amountElement.textContent = bonusDetails.bonusAmount.toLocaleString() + '円'
    amountElement.classList.add('animate-pulse')
  }, 1000)
}

// 項目別スコアのアニメーション
function animateScoreItems(scoreDetails) {
  const container = document.getElementById('score-items')
  
  scoreDetails.forEach((item, index) => {
    setTimeout(() => {
      const itemElement = createScoreItemElement(item)
      container.appendChild(itemElement)
      
      // スコアバーのアニメーション
      const progressBar = itemElement.querySelector('.progress-bar')
      setTimeout(() => {
        progressBar.style.width = `${item.score}%`
      }, 200)
      
    }, index * 200)
  })
}

// 項目別スコア要素作成
function createScoreItemElement(item) {
  const element = document.createElement('div')
  element.className = 'card bg-base-100 shadow-sm animate-fade-in'
  element.innerHTML = `
    <div class="card-body p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium">${item.icon} ${item.name}</span>
        <span class="text-lg font-bold">${item.score}</span>
      </div>
      <div class="w-full bg-base-300 rounded-full h-2">
        <div class="progress-bar bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
             style="width: 0%"></div>
      </div>
      <div class="text-xs text-base-content/70 mt-1">重み: ${item.weight}%</div>
    </div>
  `
  return element
}

// 比較データのアニメーション
function animateComparison(comparisonData) {
  const container = document.getElementById('comparison-content')
  
  if (comparisonData.isFirstTime) {
    container.innerHTML = `
      <div class="text-4xl mb-2">🌟</div>
      <div class="text-lg font-bold">初回記録</div>
      <div class="text-sm mt-2">${comparisonData.message}</div>
    `
  } else {
    const trendIcon = getTrendIcon(comparisonData.trend)
    const trendColor = getTrendColor(comparisonData.trend)
    
    container.innerHTML = `
      <div class="text-4xl mb-2">${trendIcon}</div>
      <div class="text-lg font-bold ${trendColor}">
        ${comparisonData.difference > 0 ? '+' : ''}${comparisonData.difference}点
      </div>
      <div class="text-sm mt-2">${comparisonData.message}</div>
    `
  }
  
  container.classList.add('animate-fade-in')
}

// お祝い演出開始
function startCelebration(score) {
  // スコアが高い場合のみお祝い演出
  if (score >= 80) {
    const container = document.getElementById('particle-container')
    animationUtils.celebrateParticles(container)
    
    // 効果音（オプション）
    playSuccessSound()
  }
}

// イベントリスナー設定
function setupResultEventListeners(resultData) {
  const shareBtn = document.getElementById('share-btn')
  
  shareBtn.addEventListener('click', () => {
    shareResults(resultData)
  })
}

// 結果シェア機能
function shareResults(resultData) {
  const shareText = `🏌️‍♂️ ${resultData.year}年度 社長スイング・ボーナスジャッジ結果\n` +
                   `総合スコア: ${resultData.totalScore}点\n` +
                   `ボーナス増額: ${resultData.bonusRate}%\n` +
                   `${resultData.comment}`
  
  if (navigator.share) {
    // Web Share API使用
    navigator.share({
      title: '社長スイング・ボーナスジャッジ結果',
      text: shareText
    }).catch(() => {
      fallbackShare(shareText)
    })
  } else {
    fallbackShare(shareText)
  }
}

// フォールバックシェア
function fallbackShare(text) {
  navigator.clipboard.writeText(text).then(() => {
    notifyUtils.success('結果をクリップボードにコピーしました！')
  }).catch(() => {
    // クリップボードが使えない場合はモーダル表示
    showShareModal(text)
  })
}

// シェアモーダル表示
function showShareModal(text) {
  const modal = document.createElement('div')
  modal.className = 'modal modal-open'
  modal.innerHTML = `
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">結果をシェア</h3>
      <textarea class="textarea textarea-bordered w-full h-32" readonly>${text}</textarea>
      <div class="modal-action">
        <button class="btn btn-primary" onclick="this.closest('.modal').remove()">閉じる</button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
}

// ユーティリティ関数
function getScoreGradeInfo(score) {
  if (score >= 90) return { grade: 'S', text: '完璧', color: 'badge-success' }
  if (score >= 80) return { grade: 'A', text: '優秀', color: 'badge-success' }
  if (score >= 70) return { grade: 'B', text: '良好', color: 'badge-info' }
  if (score >= 60) return { grade: 'C', text: '普通', color: 'badge-warning' }
  return { grade: 'D', text: '要改善', color: 'badge-error' }
}

function getTrendIcon(trend) {
  switch (trend) {
    case 'up': return '📈'
    case 'down': return '📉'
    default: return '➡️'
  }
}

function getTrendColor(trend) {
  switch (trend) {
    case 'up': return 'text-success'
    case 'down': return 'text-error'
    default: return 'text-info'
  }
}

function playSuccessSound() {
  // Web Audio APIを使った簡易効果音（オプション）
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    try {
      const audioContext = new (AudioContext || webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (error) {
      debugUtils.log('Audio playback not available')
    }
  }
}