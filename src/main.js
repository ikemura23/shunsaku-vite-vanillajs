import './style.css'
import { showUploadPage } from './upload.js'
import { showResultPage } from './result.js'
import { showGalleryPage } from './gallery.js'
import { analyzeSwing } from './scoring.js'
import { storage, notifyUtils, debugUtils } from './utils.js'

// 履歴データの初期化
function initializeHistory() {
  const existingHistory = JSON.parse(localStorage.getItem('swingHistory') || '[]')
  
  // 既に履歴がある場合はそのまま返す
  if (existingHistory.length > 0) {
    return existingHistory
  }
  
  // 履歴が空の場合は初期データを生成
  const currentYear = new Date().getFullYear()
  const initialHistory = generateInitialHistoryData(currentYear)
  
  // localStorageに保存
  storage.save('swingHistory', initialHistory)
  
  return initialHistory
}

// 初期履歴データ生成（過去3年分）
function generateInitialHistoryData(currentYear) {
  const dummyComments = [
    '【技術分析】アドレス時の姿勢が安定しており、腰の回転と肩のラインが良好です。バックスイング時の左腕の伸びも美しく、ダウンスイング時の体重移動が滑らかです。インパクト瞬間の手首の使い方に力強さを感じます。\n\n【Good】経営者らしい堂々としたスタンスと決断力がスイングに表れています。\n【Next】この安定感を維持し、さらなる飛距離向上を目指しましょう。',
    
    '【技術分析】テークバック時の軸の安定性が良好で、ハーフウェイダウンでのクラブの軌道も適切です。グリップの握り方も基本に沿っており、フォロースルーまでの一連の動作にバランスを感じます。わずかにダウンスイング初期で急激な動きが見られます。\n\n【Good】冷静な判断力がスイングの安定性に繋がっています。\n【Next】切り返し時の間をもう少し意識すると、より滑らかなスイングになります。',
    
    '【技術分析】スタンス幅が適切で、バックスイング時の肩の回転も十分です。ダウンスイング時のタイミングは良好ですが、インパクト時に若干のブレが確認されます。全体的にバランスの取れたスイングで、向上心を感じます。\n\n【Good】継続的な改善への意欲がスイングに現れています。\n【Next】アドレス時のセットアップをより丁寧に行うと、スイング全体が向上します。'
  ]
  
  return [currentYear - 3, currentYear - 2, currentYear - 1].map((year, index) => {
    // 年度が新しいほど高スコア傾向
    const baseScore = 65 + index * 8
    
    const scores = {
      power: Math.max(50, Math.min(95, baseScore + Math.random() * 15 - 7)),
      stability: Math.max(50, Math.min(95, baseScore + Math.random() * 15 - 7)),
      beauty: Math.max(50, Math.min(95, baseScore + Math.random() * 15 - 7)),
      growth: Math.max(50, Math.min(95, baseScore + Math.random() * 15 - 7)),
      spirit: Math.max(50, Math.min(95, baseScore + Math.random() * 15 - 7))
    }
    
    // 総合スコア計算
    const weights = { power: 20, stability: 25, beauty: 15, growth: 20, spirit: 20 }
    let totalScore = 0
    let totalWeight = 0
    
    Object.entries(scores).forEach(([key, score]) => {
      scores[key] = Math.round(score)
      totalScore += scores[key] * weights[key]
      totalWeight += weights[key]
    })
    
    totalScore = Math.round(totalScore / totalWeight)
    
    // ボーナス率計算
    let bonusRate = 0
    if (totalScore >= 86) bonusRate = 20
    else if (totalScore >= 71) bonusRate = 10
    else if (totalScore >= 51) bonusRate = 5
    
    // 分析日時（その年の12月の適当な日）
    const analysisDate = new Date(year, 11, Math.floor(Math.random() * 25) + 1, 
                                  Math.floor(Math.random() * 8) + 10).toISOString()
    
    // 動画情報
    const videoFileNames = [
      'president_swing_analysis.mp4',
      'golf_swing_session.mp4',
      'morning_practice_swing.mp4'
    ]
    
    return {
      year,
      totalScore,
      scores,
      bonusRate,
      comment: dummyComments[index],
      analysisDate,
      videoInfo: {
        fileName: videoFileNames[index],
        fileSize: Math.floor(Math.random() * 60 + 30) * 1024 * 1024, // 30-90MB
        fileType: 'video/mp4',
        duration: Math.floor(Math.random() * 15) + 15 // 15-30秒
      }
    }
  })
}

// グローバル状態管理
window.swingApp = {
  currentYear: new Date().getFullYear(),
  currentVideo: null,
  currentScore: null,
  history: initializeHistory(),
  comments: JSON.parse(localStorage.getItem('swingComments') || '[]'),
  isAuthenticated: localStorage.getItem('isPresident') === 'true'
}

// ページ定義
const pages = {
  home: () => showHomePage(),
  upload: () => showUploadPage(), // upload.js からインポート
  gallery: () => showGalleryPage(), // gallery.js からインポート
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

// ギャラリーページは gallery.js から import

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