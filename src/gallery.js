// ギャラリー・履歴表示機能

import { storage, notifyUtils, debugUtils } from './utils.js'

// ギャラリーページ表示
export function showGalleryPage() {
  const mainContent = document.getElementById('main-content')
  const history = window.swingApp.history
  const currentYear = window.swingApp.currentYear
  
  mainContent.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">📚 歴代スイング履歴</h1>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-outline btn-sm">
            ⚙️ デバッグ機能
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64">
            <li><a onclick="generateDummyData()">🎲 過去5年のダミーデータ作成</a></li>
            <div class="divider my-1"></div>
            ${history.length > 0 ? `
              <li><a onclick="deleteCurrentYearData()">🗑️ 今年のデータ削除</a></li>
              <li><a onclick="clearAllHistory()">⚠️ 全履歴削除</a></li>
            ` : ''}
          </ul>
        </div>
      </div>
      
      ${history.length === 0 ? showEmptyState() : showHistoryList(history, currentYear)}
    </div>
  `
  
  // デバッグ機能を window に登録
  setupDebugFunctions()
}

// 履歴が空の場合の表示
function showEmptyState() {
  return `
    <div class="text-center py-16">
      <div class="text-6xl mb-4">🏌️‍♂️</div>
      <h2 class="text-2xl font-bold mb-4">まだスイング履歴がありません</h2>
      <p class="text-base-content/70 mb-8">社長の最初のスイングを記録してみましょう！</p>
      <button class="btn btn-primary btn-lg" onclick="navigateTo('upload')">
        📹 最初のスイングを記録する
      </button>
    </div>
  `
}

// 履歴一覧表示
function showHistoryList(history, currentYear) {
  // 年度順でソート（新しい順）
  const sortedHistory = [...history].sort((a, b) => b.year - a.year)
  
  return `
    <!-- 統計情報 -->
    <div class="stats shadow mb-8 w-full">
      <div class="stat">
        <div class="stat-title">記録年数</div>
        <div class="stat-value text-primary">${history.length}</div>
        <div class="stat-desc">年間</div>
      </div>
      
      <div class="stat">
        <div class="stat-title">平均スコア</div>
        <div class="stat-value">${calculateAverageScore(history)}</div>
        <div class="stat-desc">点</div>
      </div>
      
      <div class="stat">
        <div class="stat-title">最高スコア</div>
        <div class="stat-value text-success">${Math.max(...history.map(h => h.totalScore))}</div>
        <div class="stat-desc">${getMaxScoreYear(history)}年</div>
      </div>
      
      <div class="stat">
        <div class="stat-title">累計ボーナス</div>
        <div class="stat-value text-accent">${calculateTotalBonus(history)}%</div>
        <div class="stat-desc">増額</div>
      </div>
    </div>
    
    <!-- スコア推移グラフ（簡易版） -->
    ${showScoreTrend(sortedHistory)}
    
    <!-- 履歴カード一覧 -->
    <div class="grid lg:grid-cols-2 gap-6">
      ${sortedHistory.map(item => createHistoryCard(item, currentYear)).join('')}
    </div>
  `
}

// 履歴カード作成
function createHistoryCard(item, currentYear) {
  const isCurrentYear = item.year === currentYear
  const scoreGrade = getScoreGrade(item.totalScore)
  const analysisDate = new Date(item.analysisDate).toLocaleDateString('ja-JP')
  
  return `
    <div class="card bg-base-200 shadow-xl ${isCurrentYear ? 'ring-2 ring-primary' : ''}">
      <div class="card-body">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="card-title text-2xl">
              ${item.year}年度
              ${isCurrentYear ? '<div class="badge badge-primary badge-sm ml-2">今年</div>' : ''}
            </h3>
            <p class="text-sm text-base-content/70">分析日: ${analysisDate}</p>
          </div>
          
          <!-- スコア表示 -->
          <div class="text-right">
            <div class="text-3xl font-bold ${scoreGrade.color}">${item.totalScore}</div>
            <div class="badge ${scoreGrade.badgeClass}">${scoreGrade.text}</div>
          </div>
        </div>
        
        <!-- ボーナス情報 -->
        <div class="bg-success/10 rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-lg font-medium">💰 ボーナス増額</span>
            <span class="text-2xl font-bold text-success">${item.bonusRate}%</span>
          </div>
        </div>
        
        <!-- 項目別スコア -->
        <div class="mb-4">
          <h4 class="font-bold mb-2">📊 項目別スコア</h4>
          <div class="grid grid-cols-2 gap-2 text-sm">
            ${Object.entries(item.scores).map(([key, score]) => `
              <div class="flex justify-between">
                <span>${getScoreItemName(key)}</span>
                <span class="font-mono">${score}点</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- AI分析コメント -->
        <div class="bg-base-100 rounded-lg p-3 mb-4">
          <div class="text-sm">
            <span class="font-bold">🤖 AI分析:</span>
            <p class="mt-1 whitespace-pre-line">${item.comment}</p>
          </div>
        </div>
        
        <!-- 動画情報 -->
        ${item.videoInfo ? `
          <div class="text-xs text-base-content/60">
            📹 ${item.videoInfo.fileName} (${formatFileSize(item.videoInfo.fileSize)}, ${item.videoInfo.duration}秒)
          </div>
        ` : ''}
        
        <!-- アクションボタン -->
        <div class="card-actions justify-end mt-4">
          ${isCurrentYear ? `
            <button class="btn btn-outline btn-sm" onclick="navigateTo('result')">
              📊 詳細結果を見る
            </button>
          ` : ''}
          <button class="btn btn-primary btn-sm" onclick="shareHistoryItem(${item.year})">
            📱 シェア
          </button>
        </div>
      </div>
    </div>
  `
}

// スコア推移グラフ（簡易版）
function showScoreTrend(history) {
  if (history.length < 2) return ''
  
  const maxScore = Math.max(...history.map(h => h.totalScore))
  const minScore = Math.min(...history.map(h => h.totalScore))
  
  return `
    <div class="card bg-base-200 shadow-xl mb-8">
      <div class="card-body">
        <h3 class="card-title mb-4">📈 スコア推移</h3>
        <div class="flex items-end justify-between h-32 bg-base-100 rounded-lg p-4">
          ${history.reverse().map((item, index) => {
            // 高さ計算を修正：コンテナ高さ128px - パディング32px = 96px利用可能
            // 上部に余白8pxを確保、最小20px、最大68pxの範囲で調整
            let height
            if (maxScore === minScore) {
              // 全て同じスコアの場合は中央の高さ
              height = 44
            } else {
              height = Math.round(((item.totalScore - minScore) / (maxScore - minScore)) * 48 + 20)
            }
            const isLast = index === history.length - 1
            return `
              <div class="flex flex-col items-center">
                <div class="bg-primary rounded-t-lg ${isLast ? 'animate-pulse' : ''}" 
                     style="width: 20px; height: ${height}px; margin-bottom: 4px;">
                </div>
                <div class="text-xs font-bold">${item.totalScore}</div>
                <div class="text-xs text-base-content/60">${item.year}</div>
              </div>
            `
          }).join('')}
        </div>
      </div>
    </div>
  `
}

// デバッグ機能のセットアップ
function setupDebugFunctions() {
  // 過去5年のダミーデータ生成
  window.generateDummyData = () => {
    const currentYear = window.swingApp.currentYear
    const existingYears = window.swingApp.history.map(h => h.year)
    
    // 過去5年のデータを生成（既存データがない年のみ）
    const yearsToGenerate = []
    for (let i = 1; i <= 5; i++) {
      const year = currentYear - i
      if (!existingYears.includes(year)) {
        yearsToGenerate.push(year)
      }
    }
    
    if (yearsToGenerate.length === 0) {
      notifyUtils.info('過去5年のデータは既に存在します')
      return
    }
    
    const confirmed = confirm(`過去${yearsToGenerate.length}年分のダミーデータを作成しますか？\n対象年度: ${yearsToGenerate.join(', ')}`)
    
    if (confirmed) {
      const newData = generateDummyHistoryData(yearsToGenerate)
      
      // 既存データに追加
      window.swingApp.history = [...window.swingApp.history, ...newData]
      
      // localStorageを更新
      storage.save('swingHistory', window.swingApp.history)
      
      notifyUtils.success(`${yearsToGenerate.length}年分のダミーデータを作成しました`)
      debugUtils.log(`Generated dummy data for years: ${yearsToGenerate.join(', ')}`)
      
      // ページを再表示
      setTimeout(() => {
        showGalleryPage()
      }, 1000)
    }
  }
  
  // 今年のデータ削除
  window.deleteCurrentYearData = () => {
    const currentYear = window.swingApp.currentYear
    const hasCurrentYearData = window.swingApp.history.some(h => h.year === currentYear)
    
    if (!hasCurrentYearData) {
      notifyUtils.info('今年のデータは存在しません')
      return
    }
    
    // 確認ダイアログ
    const confirmed = confirm(`${currentYear}年度のスイング履歴を削除しますか？\n\nこの操作は取り消せません。`)
    
    if (confirmed) {
      // 今年のデータを削除
      window.swingApp.history = window.swingApp.history.filter(h => h.year !== currentYear)
      
      // 現在の動画・スコアデータもクリア
      window.swingApp.currentVideo = null
      window.swingApp.currentScore = null
      
      // localStorageを更新
      storage.save('swingHistory', window.swingApp.history)
      storage.remove('currentVideo')
      
      notifyUtils.success(`${currentYear}年度のデータを削除しました`)
      debugUtils.log(`Deleted current year data: ${currentYear}`)
      
      // ページを再表示
      setTimeout(() => {
        showGalleryPage()
      }, 1000)
    }
  }
  
  // 全履歴削除
  window.clearAllHistory = () => {
    if (window.swingApp.history.length === 0) {
      notifyUtils.info('削除する履歴がありません')
      return
    }
    
    const confirmed = confirm('すべてのスイング履歴を削除しますか？\n\nこの操作は取り消せません。')
    
    if (confirmed) {
      // 全データクリア
      window.swingApp.history = []
      window.swingApp.currentVideo = null
      window.swingApp.currentScore = null
      
      // localStorage完全クリア
      storage.remove('swingHistory')
      storage.remove('currentVideo')
      storage.remove('swingComments')
      
      notifyUtils.success('すべての履歴を削除しました')
      debugUtils.log('Cleared all history data')
      
      // ページを再表示
      setTimeout(() => {
        showGalleryPage()
      }, 1000)
    }
  }
  
  // 履歴項目シェア
  window.shareHistoryItem = (year) => {
    const item = window.swingApp.history.find(h => h.year === year)
    if (!item) return
    
    const shareText = `🏌️‍♂️ ${year}年度 社長スイング結果\n` +
                     `スコア: ${item.totalScore}点\n` +
                     `ボーナス: ${item.bonusRate}%増額\n` +
                     `${item.comment}`
    
    if (navigator.share) {
      navigator.share({
        title: `${year}年度 社長スイング結果`,
        text: shareText
      }).catch(() => {
        fallbackShare(shareText)
      })
    } else {
      fallbackShare(shareText)
    }
  }
}

// ユーティリティ関数
function calculateAverageScore(history) {
  if (history.length === 0) return 0
  const sum = history.reduce((acc, item) => acc + item.totalScore, 0)
  return Math.round(sum / history.length)
}

function getMaxScoreYear(history) {
  if (history.length === 0) return 0
  return history.reduce((maxItem, item) => 
    item.totalScore > maxItem.totalScore ? item : maxItem
  ).year
}

function calculateTotalBonus(history) {
  return history.reduce((acc, item) => acc + item.bonusRate, 0)
}

function getScoreGrade(score) {
  if (score >= 90) return { text: 'S完璧', color: 'text-success', badgeClass: 'badge-success' }
  if (score >= 80) return { text: 'A優秀', color: 'text-success', badgeClass: 'badge-success' }
  if (score >= 70) return { text: 'B良好', color: 'text-info', badgeClass: 'badge-info' }
  if (score >= 60) return { text: 'C普通', color: 'text-warning', badgeClass: 'badge-warning' }
  return { text: 'D要改善', color: 'text-error', badgeClass: 'badge-error' }
}

function getScoreItemName(key) {
  const names = {
    power: '💪力強さ',
    stability: '⚖️安定性',
    beauty: '✨美しさ',
    growth: '📈成長性',
    spirit: '😤やる気'
  }
  return names[key] || key
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function fallbackShare(text) {
  navigator.clipboard.writeText(text).then(() => {
    notifyUtils.success('結果をクリップボードにコピーしました！')
  }).catch(() => {
    alert(text)
  })
}

// ダミー履歴データ生成
function generateDummyHistoryData(years) {
  const dummyComments = [
    // 90-100点台のコメント
    '【技術分析】アドレス時の姿勢が非常に安定しており、腰の回転と肩のラインが理想的な角度を保っています。バックスイング時の左腕の伸びが美しく、トップでのクラブフェースの向きも完璧です。ダウンスイング時の体重移動が滑らかで、インパクト瞬間の手首の返しが力強さを物語っています。\n\n【Good】リーダーシップに相応しい堂々としたスタンス、経営者としての決断力がスイングに表れています。\n【Next】この完成度を維持し、来年は更なる飛距離向上を目指しましょう。',
    
    '【技術分析】テークバック時の軸の安定性が素晴らしく、特に右膝の角度キープが秀逸です。ハーフウェイダウンでのクラブの軌道が理想的なインサイドアウトを描いており、フォロースルーまでの一連の動作に無駄がありません。グリップの握り方も適切で、手首の角度が力強いインパクトを生み出しています。\n\n【Good】経営者らしい集中力と精神的な安定感がフォーム全体に現れています。\n【Next】既に高い完成度ですが、さらなる飛距離アップのため体幹強化をお勧めします。',
    
    // 80-89点台のコメント
    '【技術分析】アドレス時のボールとの距離感が良好で、グリップエンドの向きも適切です。バックスイング時の肩の回転角度は理想に近く、特に左肩の入り方が印象的です。インパクト時の頭の位置が安定しており、フィニッシュでのバランスも良好です。ただし、ダウンスイング初期でやや急激な動きが見られます。\n\n【Good】経営手腕と同様の安定感のあるスイングリズムが評価できます。\n【Next】切り返し時の間（タメ）をもう少し意識すると、より滑らかなスイングになるでしょう。',
    
    '【技術分析】スタンス幅が適切で、足の踏ん張りが効いています。バックスイング時のコックの使い方も良く、トップでの左腕の位置は合格レベルです。ダウンスイング時の腰の回転スピードが適度で、フォロースルーでの右肩の抜けも自然です。わずかにアウトサイドイン軌道の傾向が見られますが、全体的には安定したスイングです。\n\n【Good】冷静な判断力がスイングの安定性に繋がっています。\n【Next】クラブフェースの向きを意識して、よりストレート弾道を目指しましょう。',
    
    // 70-79点台のコメント
    '【技術分析】アドレス時の前傾角度は適切ですが、グリップがやや強めです。バックスイング時の腰の回転はスムーズですが、左腕にわずかな曲がりが見られます。ダウンスイング時の体重移動のタイミングは良好ですが、インパクト時に若干のブレが確認されます。フォロースルーは力強く、経営者らしい意志の強さを感じます。\n\n【Good】困難に立ち向かう姿勢がスイングからも伝わってきます。\n【Next】アドレス時のグリッププレッシャーを少し緩めると、より自然なスイングになります。',
    
    '【技術分析】テークバック時の肩と腰の連動は良好ですが、クラブヘッドの軌道がやや外側に上がる傾向があります。トップでのシャフトクロスは軽微で許容範囲内です。ダウンスイング時の左サイドの壁は作れていますが、右手の使い方にもう少し余裕があると良いでしょう。全体的にバランスの取れたスイングです。\n\n【Good】組織をまとめる力強さがスイングにも表れています。\n【Next】バックスイング時のクラブの上げ方を少し内側に意識してみてください。',
    
    // 60-69点台のコメント
    '【技術分析】スタンス幅はほぼ適切ですが、ボールポジションが若干左寄りです。バックスイング時の体重移動は見られますが、トップでの左腕の角度に改善の余地があります。ダウンスイング時のタイミングは悪くありませんが、インパクト時の体の開きがやや早めです。フィニッシュでのバランスは保たれており、基本的なポテンシャルを感じます。\n\n【Good】新しいことに挑戦する積極性がスイングからも伝わってきます。\n【Next】アドレス時のセットアップをもう少し丁寧に行うと、スイング全体が向上します。',
    
    '【技術分析】グリップの握り方は基本に沿っていますが、左手の親指の位置に調整の余地があります。バックスイング時の肩の回転角度は十分ですが、腰の回転がやや不足気味です。ダウンスイング時の軌道は概ね良好ですが、フォロースルーでの右腕の伸びがもう少し欲しいところです。努力と向上心が感じられるスイングです。\n\n【Good】継続的な改善への意欲がスイングに現れています。\n【Next】腰の回転をもう少し意識すると、より力強いスイングになるでしょう。'
  ]
  
  const dummyVideoNames = [
    'swing_practice_morning.mp4',
    'golf_swing_session.mp4',
    'president_swing_2024.mp4',
    'golf_training_video.mov',
    'swing_improvement.mp4',
    'morning_golf_practice.mp4',
    'swing_analysis_video.mov'
  ]
  
  return years.map(year => {
    // 年度によって傾向を変える（最近ほど高スコア傾向）
    const currentYear = window.swingApp.currentYear
    const yearDiff = currentYear - year
    const baseScore = Math.max(45, 75 - yearDiff * 3) // 古いほどスコア低め
    
    // 各項目スコア生成
    const scores = {}
    const scoreItems = ['power', 'stability', 'beauty', 'growth', 'spirit']
    
    scoreItems.forEach(item => {
      let itemScore = baseScore + Math.random() * 20 - 10 // ±10点のバラつき
      
      // 項目別特性
      if (item === 'growth') {
        // 成長性は年数が経つほど高め
        itemScore += Math.min(15, yearDiff * 2)
      } else if (item === 'spirit') {
        // やる気は年によってランダム
        itemScore += Math.random() * 15 - 7.5
      }
      
      scores[item] = Math.max(0, Math.min(100, Math.round(itemScore)))
    })
    
    // 総合スコア計算（重み付き平均）
    const weights = { power: 20, stability: 25, beauty: 15, growth: 20, spirit: 20 }
    let totalScore = 0
    let totalWeight = 0
    
    scoreItems.forEach(item => {
      totalScore += scores[item] * weights[item]
      totalWeight += weights[item]
    })
    
    totalScore = Math.round(totalScore / totalWeight)
    
    // ボーナス率計算
    let bonusRate = 0
    if (totalScore >= 86) bonusRate = 20
    else if (totalScore >= 71) bonusRate = 10
    else if (totalScore >= 51) bonusRate = 5
    
    // コメント選択（スコア別）
    let comment = ''
    if (totalScore >= 90) {
      // 90-100点: 0-1番のコメント
      comment = dummyComments[Math.floor(Math.random() * 2)]
    } else if (totalScore >= 80) {
      // 80-89点: 2-3番のコメント
      comment = dummyComments[Math.floor(Math.random() * 2) + 2]
    } else if (totalScore >= 70) {
      // 70-79点: 4-5番のコメント
      comment = dummyComments[Math.floor(Math.random() * 2) + 4]
    } else {
      // 60-69点: 6-7番のコメント
      comment = dummyComments[Math.floor(Math.random() * 2) + 6]
    }
    
    // 分析日時（その年の12月の適当な日）
    const analysisDate = new Date(year, 11, Math.floor(Math.random() * 25) + 1, 
                                  Math.floor(Math.random() * 8) + 10).toISOString()
    
    // 動画情報
    const videoFileName = dummyVideoNames[Math.floor(Math.random() * dummyVideoNames.length)]
    const videoSize = Math.floor(Math.random() * 80 + 20) * 1024 * 1024 // 20-100MB
    const videoDuration = Math.floor(Math.random() * 20) + 10 // 10-30秒
    
    return {
      year,
      totalScore,
      scores,
      bonusRate,
      comment,
      analysisDate,
      videoInfo: {
        fileName: videoFileName,
        fileSize: videoSize,
        fileType: 'video/mp4',
        duration: videoDuration
      }
    }
  })
}