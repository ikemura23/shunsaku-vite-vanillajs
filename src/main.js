import './style.css'
import { showUploadPage } from './upload.js'
import { showResultPage } from './result.js'
import { analyzeSwing } from './scoring.js'
import { storage, notifyUtils, debugUtils } from './utils.js'

// グローバル状態管理
window.swingApp = {
  currentYear: new Date().getFullYear(),
  currentVideo: null,
  currentScore: null,
  history: JSON.parse(localStorage.getItem('swingHistory') || '[]'),
  comments: JSON.parse(localStorage.getItem('swingComments') || '[]'),
  isAuthenticated: localStorage.getItem('isPresident') === 'true'
}

// ページ定義
const pages = {
  home: () => showHomePage(),
  upload: () => showUploadPage(), // upload.js からインポート
  gallery: () => showGalleryPage(),
  analysis: () => showAnalysisPage(),
  result: () => showResultPage() // result.js からインポート
}

// ホームページ表示
function showHomePage() {
  const mainContent = document.getElementById('main-content')
  const currentYear = window.swingApp.currentYear
  const hasCurrentYearData = window.swingApp.history.some(h => h.year === currentYear)
  
  mainContent.innerHTML = `
    <div class="hero min-h-96 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg mb-8">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">🏌️‍♂️</h1>
          <h2 class="mb-5 text-3xl font-bold">社長スイング・ボーナスジャッジ</h2>
          <p class="mb-5 text-lg">〜運命の一振りが、社員の冬を暖かくする〜</p>
          <p class="mb-8">${currentYear}年度 年末イベント</p>
          ${hasCurrentYearData 
            ? `<div class="alert alert-success mb-4">
                 <span>✅ ${currentYear}年度のスイングは既に完了しています</span>
               </div>
               <button class="btn btn-outline btn-lg" onclick="navigateTo('result')">結果を見る</button>`
            : `<button class="btn btn-lg btn-accent" onclick="navigateTo('upload')">スイング動画をアップロード</button>`
          }
        </div>
      </div>
    </div>
    
    <div class="grid md:grid-cols-3 gap-6">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body text-center">
          <h3 class="card-title justify-center">🎯 AIスコアリング</h3>
          <p>社長のスイングを5項目で分析し、0〜100点でスコア化</p>
        </div>
      </div>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body text-center">
          <h3 class="card-title justify-center">💰 ボーナス連動</h3>
          <p>スコアに応じて社員ボーナスが最大20%増額</p>
        </div>
      </div>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body text-center">
          <h3 class="card-title justify-center">📊 履歴管理</h3>
          <p>歴代スイングとスコア推移を記録・表示</p>
        </div>
      </div>
    </div>
  `
}

// アップロードページは upload.js から import

// ギャラリーページ表示（仮実装）
function showGalleryPage() {
  const mainContent = document.getElementById('main-content')
  const history = window.swingApp.history
  
  mainContent.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">歴代スイング履歴</h2>
      ${history.length === 0 
        ? `<div class="text-center">
             <p class="text-lg mb-4">まだスイング履歴がありません</p>
             <button class="btn btn-primary" onclick="navigateTo('upload')">最初のスイングを記録する</button>
           </div>`
        : `<div class="grid md:grid-cols-2 gap-6">
             ${history.map(item => `
               <div class="card bg-base-200 shadow-xl">
                 <div class="card-body">
                   <h3 class="card-title">${item.year}年度</h3>
                   <div class="stat">
                     <div class="stat-title">スコア</div>
                     <div class="stat-value text-primary">${item.score}</div>
                     <div class="stat-desc">ボーナス${item.bonusRate}%増</div>
                   </div>
                 </div>
               </div>
             `).join('')}
           </div>`
      }
    </div>
  `
}

// 分析中ページ表示
async function showAnalysisPage() {
  const mainContent = document.getElementById('main-content')
  
  // 動画データがない場合
  if (!window.swingApp.currentVideo) {
    mainContent.innerHTML = `
      <div class="max-w-2xl mx-auto text-center">
        <div class="alert alert-warning mb-6">
          <span>⚠️ 分析する動画データがありません</span>
        </div>
        <button class="btn btn-primary" onclick="navigateTo('upload')">動画をアップロード</button>
      </div>
    `
    return
  }
  
  // 分析中UI表示
  showAnalysisUI()
  
  try {
    // AI分析実行
    const result = await analyzeSwing(window.swingApp.currentVideo)
    
    // 結果を履歴に保存
    window.swingApp.history.push(result)
    storage.save('swingHistory', window.swingApp.history)
    
    // 現在のスコアを更新
    window.swingApp.currentScore = result
    
    debugUtils.log('Analysis completed and saved', result)
    
    // 結果ページに遷移
    setTimeout(() => {
      navigateTo('result')
    }, 1000)
    
  } catch (error) {
    debugUtils.error('Analysis failed', error)
    notifyUtils.error('分析中にエラーが発生しました')
    
    // エラー時はアップロードページに戻る
    setTimeout(() => {
      navigateTo('upload')
    }, 2000)
  }
}

// 分析中UI表示
function showAnalysisUI() {
  const mainContent = document.getElementById('main-content')
  
  mainContent.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">🤖 AI分析中</h1>
        <p class="text-xl text-base-content/70">社長のスイングを多角的に分析しています...</p>
      </div>
      
      <!-- メインローディング表示 -->
      <div class="card bg-base-200 shadow-xl mb-8">
        <div class="card-body text-center py-12">
          <div class="relative mb-8">
            <div class="loading loading-ring loading-lg text-primary animate-ripple"></div>
          </div>
          
          <div id="current-step" class="text-2xl font-bold mb-4">分析を開始しています...</div>
          
          <!-- プログレスバー -->
          <div class="w-full bg-base-300 rounded-full h-3 mb-6">
            <div id="progress-bar" class="bg-primary h-3 rounded-full transition-all duration-1000 ease-out" 
                 style="width: 0%"></div>
          </div>
          
          <div id="step-description" class="text-base-content/70">
            動画データの前処理を行っています
          </div>
        </div>
      </div>
      
      <!-- 分析ステップ表示 -->
      <div class="grid md:grid-cols-4 gap-4">
        <div class="step-card card bg-base-100 shadow-sm" data-step="0">
          <div class="card-body text-center p-4">
            <div class="step-icon text-2xl mb-2">📹</div>
            <div class="step-title text-sm font-medium">動画解析</div>
            <div class="step-status text-xs text-base-content/50">待機中</div>
          </div>
        </div>
        
        <div class="step-card card bg-base-100 shadow-sm" data-step="1">
          <div class="card-body text-center p-4">
            <div class="step-icon text-2xl mb-2">🏌️‍♂️</div>
            <div class="step-title text-sm font-medium">スイング分析</div>
            <div class="step-status text-xs text-base-content/50">待機中</div>
          </div>
        </div>
        
        <div class="step-card card bg-base-100 shadow-sm" data-step="2">
          <div class="card-body text-center p-4">
            <div class="step-icon text-2xl mb-2">🎯</div>
            <div class="step-title text-sm font-medium">スコア算出</div>
            <div class="step-status text-xs text-base-content/50">待機中</div>
          </div>
        </div>
        
        <div class="step-card card bg-base-100 shadow-sm" data-step="3">
          <div class="card-body text-center p-4">
            <div class="step-icon text-2xl mb-2">📊</div>
            <div class="step-title text-sm font-medium">総合評価</div>
            <div class="step-status text-xs text-base-content/50">待機中</div>
          </div>
        </div>
      </div>
    </div>
  `
  
  // プログレス更新のイベントリスナー設定
  setupAnalysisProgressListener()
}

// 分析プログレス更新リスナー
function setupAnalysisProgressListener() {
  let currentStep = 0
  const totalSteps = 4
  
  window.addEventListener('analysisProgress', (event) => {
    const { message } = event.detail
    
    // 現在のステップメッセージ更新
    document.getElementById('current-step').textContent = message
    
    // プログレスバー更新
    const progress = (currentStep + 1) / totalSteps * 100
    document.getElementById('progress-bar').style.width = `${progress}%`
    
    // ステップカード更新
    updateStepCard(currentStep, 'completed')
    if (currentStep < totalSteps - 1) {
      updateStepCard(currentStep + 1, 'active')
    }
    
    currentStep++
  })
}

// ステップカード状態更新
function updateStepCard(stepIndex, status) {
  const stepCard = document.querySelector(`[data-step="${stepIndex}"]`)
  if (!stepCard) return
  
  const statusElement = stepCard.querySelector('.step-status')
  const cardElement = stepCard
  
  // 既存の状態クラスを削除
  cardElement.classList.remove('bg-primary', 'text-primary-content', 'bg-success', 'text-success-content')
  
  switch (status) {
    case 'active':
      cardElement.classList.add('bg-primary', 'text-primary-content')
      statusElement.textContent = '実行中...'
      break
    case 'completed':
      cardElement.classList.add('bg-success', 'text-success-content')
      statusElement.textContent = '完了'
      break
    default:
      statusElement.textContent = '待機中'
  }
}

// 結果ページは result.js から import

// ナビゲーション関数
window.navigateTo = (page) => {
  if (pages[page]) {
    pages[page]()
    // アドレスバーを更新（シンプルなハッシュルーティング）
    window.location.hash = page
  }
}

// ナビゲーションクリックイベント
function setupNavigation() {
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const page = e.target.getAttribute('data-page')
      navigateTo(page)
    })
  })
}

// 初期化
function init() {
  setupNavigation()
  
  // URLハッシュに基づいてページを表示
  const hash = window.location.hash.slice(1)
  if (hash && pages[hash]) {
    navigateTo(hash)
  } else {
    navigateTo('home')
  }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init)

console.log('社長スイング・ボーナスジャッジ アプリ初期化完了!')