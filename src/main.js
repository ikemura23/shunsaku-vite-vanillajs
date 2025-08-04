import './style.css'
import { showUploadPage } from './upload.js'

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
  result: () => showResultPage()
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

// 分析中ページ表示（仮実装）
function showAnalysisPage() {
  const mainContent = document.getElementById('main-content')
  mainContent.innerHTML = `
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">AI分析中...</h2>
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <p class="mt-4">社長のスイングを分析しています</p>
    </div>
  `
}

// 結果ページ表示（仮実装）
function showResultPage() {
  const mainContent = document.getElementById('main-content')
  mainContent.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">結果発表</h2>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <p class="text-center text-lg mb-4">🚧 実装中です...</p>
          <button class="btn btn-outline" onclick="navigateTo('home')">ホームに戻る</button>
        </div>
      </div>
    </div>
  `
}

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