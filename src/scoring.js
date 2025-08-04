// AIスコアリング機能（モック実装）

import { scoreUtils, debugUtils } from './utils.js'

// スコアリング項目の定義
const SCORING_ITEMS = {
  power: { name: 'スイングの力強さ', weight: 20, icon: '💪' },
  stability: { name: '姿勢の安定性', weight: 25, icon: '⚖️' },
  beauty: { name: 'フォームの美しさ', weight: 15, icon: '✨' },
  growth: { name: '成長性', weight: 20, icon: '📈' },
  spirit: { name: '表情・やる気', weight: 20, icon: '😤' }
}

// AI分析コメントパターン
const ANALYSIS_COMMENTS = [
  {
    scoreRange: [90, 100],
    comments: [
      'あなたのスイングからは、確かな実力と圧倒的な気迫が感じられました。社員の皆さんも大喜びです！',
      '完璧なフォームと力強いスイング。経営者としての威厳とリーダーシップが見事に表現されています。',
      'この素晴らしいスイングは、会社の未来への強い意志を物語っています。社員一同、感動しております。'
    ]
  },
  {
    scoreRange: [80, 89],
    comments: [
      'あなたのスイングからは、確かな努力と昨年比での成長が感じられました。素晴らしい進歩です！',
      'バランスの取れたフォームと安定した軌道。経営者としての落ち着きが表現されています。',
      '力強さと美しさを兼ね備えたスイング。社員への思いやりが伝わってきます。'
    ]
  },
  {
    scoreRange: [70, 79],
    comments: [
      '良好なスイングフォームが確認できました。来年はさらなる飛躍が期待できそうです。',
      '安定したスイングから、堅実な経営手腕が垣間見えます。社員も安心できるでしょう。',
      '基本に忠実なフォームが印象的。継続的な努力の成果が表れています。'
    ]
  },
  {
    scoreRange: [60, 69],
    comments: [
      'スイングに改善の余地はありますが、チャレンジ精神は十分に伝わってきました。',
      'フォームの安定性にやや課題がありますが、前向きな姿勢は評価できます。',
      '来年に向けて練習を重ねることで、さらなる向上が期待できます。'
    ]
  },
  {
    scoreRange: [0, 59],
    comments: [
      'スイングには課題がありますが、社員のために挑戦する姿勢は素晴らしいです。',
      'フォーム改善の余地はありますが、その努力する姿勢こそが真のリーダーシップです。',
      '来年は練習を積んで、さらなる成長を目指しましょう。社員も応援しています。'
    ]
  }
]

// メイン分析関数
export async function analyzeSwing(videoData) {
  debugUtils.log('Starting swing analysis', { fileName: videoData.fileName })
  
  try {
    // 分析の進行状況を段階的に更新
    await simulateAnalysisProgress()
    
    // スコア生成
    const scores = generateScores(videoData)
    const totalScore = calculateTotalScore(scores)
    const bonusRate = scoreUtils.calculateBonusRate(totalScore)
    const comment = generateAnalysisComment(totalScore)
    
    // 結果オブジェクト作成
    const result = {
      year: videoData.year,
      totalScore,
      scores,
      bonusRate,
      comment,
      analysisDate: new Date().toISOString(),
      videoInfo: {
        fileName: videoData.fileName,
        duration: videoData.duration,
        fileSize: videoData.fileSize
      }
    }
    
    debugUtils.log('Analysis completed', result)
    return result
    
  } catch (error) {
    debugUtils.error('Analysis failed', error)
    throw new Error('スイング分析中にエラーが発生しました')
  }
}

// スコア生成（モック実装）
function generateScores(videoData) {
  const scores = {}
  
  // ベーススコア（65-85点の範囲）
  const baseScore = 65 + Math.random() * 20
  
  // 各項目のスコア生成
  Object.keys(SCORING_ITEMS).forEach(key => {
    let itemScore = baseScore
    
    // ファイル特徴に基づく調整
    if (key === 'power') {
      // ファイルサイズが大きいほど力強さが高い（仮）
      const sizeBonus = Math.min(10, videoData.fileSize / (10 * 1024 * 1024))
      itemScore += sizeBonus - 5
    }
    
    if (key === 'stability') {
      // 動画時間が適切（10-30秒）なら安定性が高い
      const duration = videoData.duration || 15
      if (duration >= 10 && duration <= 30) {
        itemScore += 5
      } else {
        itemScore -= 3
      }
    }
    
    if (key === 'beauty') {
      // ランダム要素（美しさは主観的）
      itemScore += Math.random() * 10 - 5
    }
    
    if (key === 'growth') {
      // 過去のスコアと比較（履歴がある場合）
      const history = window.swingApp.history
      if (history.length > 0) {
        const lastScore = history[history.length - 1].totalScore
        const improvement = Math.random() * 10 - 2 // 基本的には成長傾向
        itemScore = Math.max(lastScore + improvement, itemScore)
      }
    }
    
    if (key === 'spirit') {
      // 時刻に基づく調整（朝なら気合十分、夜なら疲労気味）
      const hour = new Date().getHours()
      if (hour >= 9 && hour <= 11) {
        itemScore += 3 // 朝の気合
      } else if (hour >= 22 || hour <= 6) {
        itemScore -= 2 // 夜の疲労
      }
    }
    
    // ランダム要素を追加
    itemScore += Math.random() * 8 - 4
    
    // 0-100の範囲に収める
    scores[key] = Math.max(0, Math.min(100, Math.round(itemScore)))
  })
  
  return scores
}

// 総合スコア計算
function calculateTotalScore(scores) {
  let totalScore = 0
  let totalWeight = 0
  
  Object.keys(SCORING_ITEMS).forEach(key => {
    const weight = SCORING_ITEMS[key].weight
    totalScore += scores[key] * weight
    totalWeight += weight
  })
  
  return Math.round(totalScore / totalWeight)
}

// 分析コメント生成
function generateAnalysisComment(totalScore) {
  const commentGroup = ANALYSIS_COMMENTS.find(group => 
    totalScore >= group.scoreRange[0] && totalScore <= group.scoreRange[1]
  )
  
  if (commentGroup) {
    const randomIndex = Math.floor(Math.random() * commentGroup.comments.length)
    return commentGroup.comments[randomIndex]
  }
  
  return 'スイング分析が完了しました。継続的な改善を目指しましょう。'
}

// 分析進行状況をシミュレート
async function simulateAnalysisProgress() {
  const steps = [
    { message: '動画データを読み込み中...', duration: 800 },
    { message: 'スイングフォームを解析中...', duration: 1200 },
    { message: '各項目スコアを算出中...', duration: 1000 },
    { message: '総合評価を生成中...', duration: 600 }
  ]
  
  for (const step of steps) {
    // プログレス更新イベントを発火
    window.dispatchEvent(new CustomEvent('analysisProgress', {
      detail: { message: step.message }
    }))
    
    // 指定時間待機
    await new Promise(resolve => setTimeout(resolve, step.duration))
  }
}

// スコア詳細情報を取得
export function getScoreDetails(scores) {
  return Object.keys(SCORING_ITEMS).map(key => ({
    key,
    name: SCORING_ITEMS[key].name,
    icon: SCORING_ITEMS[key].icon,
    weight: SCORING_ITEMS[key].weight,
    score: scores[key],
    grade: scoreUtils.getScoreGrade(scores[key])
  }))
}

// 過去との比較データ生成
export function generateComparisonData(currentScore, history) {
  if (history.length === 0) {
    return {
      isFirstTime: true,
      message: '初回のスイング記録です！'
    }
  }
  
  const lastScore = history[history.length - 1].totalScore
  const difference = currentScore - lastScore
  
  let message = ''
  let trend = 'stable'
  
  if (difference > 5) {
    message = `昨年より${difference}点向上しました！素晴らしい成長です！`
    trend = 'up'
  } else if (difference < -5) {
    message = `昨年より${Math.abs(difference)}点下がりましたが、来年の巻き返しに期待！`
    trend = 'down'
  } else {
    message = '昨年と同水準の安定したスイングです。'
    trend = 'stable'
  }
  
  return {
    isFirstTime: false,
    lastScore,
    currentScore,
    difference,
    message,
    trend
  }
}

// ボーナス計算詳細
export function calculateBonusDetails(totalScore, baseAmount = 100000) {
  const bonusRate = scoreUtils.calculateBonusRate(totalScore)
  const bonusAmount = Math.round(baseAmount * bonusRate / 100)
  const totalAmount = baseAmount + bonusAmount
  
  return {
    baseAmount,
    bonusRate,
    bonusAmount,
    totalAmount,
    formattedTotal: new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(totalAmount)
  }
}