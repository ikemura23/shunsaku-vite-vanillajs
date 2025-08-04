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
      '【技術分析】アドレス時の姿勢が非常に安定しており、腰の回転と肩のラインが理想的な角度を保っています。バックスイング時の左腕の伸びが美しく、トップでのクラブフェースの向きも完璧です。ダウンスイング時の体重移動が滑らかで、インパクト瞬間の手首の返しが力強さを物語っています。\n\n【Good】リーダーシップに相応しい堂々としたスタンス、経営者としての決断力がスイングに表れています。\n【Next】この完成度を維持し、来年は更なる飛距離向上を目指しましょう。',
      '【技術分析】テークバック時の軸の安定性が素晴らしく、特に右膝の角度キープが秀逸です。ハーフウェイダウンでのクラブの軌道が理想的なインサイドアウトを描いており、フォロースルーまでの一連の動作に無駄がありません。グリップの握り方も適切で、手首の角度が力強いインパクトを生み出しています。\n\n【Good】経営者らしい集中力と精神的な安定感がフォーム全体に現れています。\n【Next】既に高い完成度ですが、さらなる飛距離アップのため体幹強化をお勧めします。',
      '【技術分析】完璧なセットアップから始まり、バックスイング時の肩甲骨の動きが秀逸です。トップでの左手首の角度が理想的で、切り返し時の下半身リードも教科書通りです。インパクト時のクラブフェースの向きとボールへのアタック角度が素晴らしく、フィニッシュまでの流れが一貫しています。\n\n【Good】経営者としての威厳と自信がスイング全体に漂っています。\n【Next】この技術レベルなら、戦略的なコースマネジメントも学ばれると良いでしょう。'
    ]
  },
  {
    scoreRange: [80, 89],
    comments: [
      '【技術分析】アドレス時のボールとの距離感が良好で、グリップエンドの向きも適切です。バックスイング時の肩の回転角度は理想に近く、特に左肩の入り方が印象的です。インパクト時の頭の位置が安定しており、フィニッシュでのバランスも良好です。ただし、ダウンスイング初期でやや急激な動きが見られます。\n\n【Good】経営手腕と同様の安定感のあるスイングリズムが評価できます。\n【Next】切り返し時の間（タメ）をもう少し意識すると、より滑らかなスイングになるでしょう。',
      '【技術分析】スタンス幅が適切で、足の踏ん張りが効いています。バックスイング時のコックの使い方も良く、トップでの左腕の位置は合格レベルです。ダウンスイング時の腰の回転スピードが適度で、フォロースルーでの右肩の抜けも自然です。わずかにアウトサイドイン軌道の傾向が見られますが、全体的には安定したスイングです。\n\n【Good】冷静な判断力がスイングの安定性に繋がっています。\n【Next】クラブフェースの向きを意識して、よりストレート弾道を目指しましょう。',
      '【技術分析】前傾姿勢の維持が良好で、バックスイング時の重心移動もスムーズです。トップでのクラブの位置は適切で、ダウンスイング時の左サイドの粘りが効いています。インパクト時の両腕の伸びも良く、フォロースルーでの体の回転も自然です。右足の蹴りがもう少し強いとより良いでしょう。\n\n【Good】組織運営と同じく、バランス感覚に優れたスイングです。\n【Next】インパクト後の右足の使い方を意識すると、さらに力強くなります。'
    ]
  },
  {
    scoreRange: [70, 79],
    comments: [
      '【技術分析】アドレス時の前傾角度は適切ですが、グリップがやや強めです。バックスイング時の腰の回転はスムーズですが、左腕にわずかな曲がりが見られます。ダウンスイング時の体重移動のタイミングは良好ですが、インパクト時に若干のブレが確認されます。フォロースルーは力強く、経営者らしい意志の強さを感じます。\n\n【Good】困難に立ち向かう姿勢がスイングからも伝わってきます。\n【Next】アドレス時のグリッププレッシャーを少し緩めると、より自然なスイングになります。',
      '【技術分析】テークバック時の肩と腰の連動は良好ですが、クラブヘッドの軌道がやや外側に上がる傾向があります。トップでのシャフトクロスは軽微で許容範囲内です。ダウンスイング時の左サイドの壁は作れていますが、右手の使い方にもう少し余裕があると良いでしょう。全体的にバランスの取れたスイングです。\n\n【Good】組織をまとめる力強さがスイングにも表れています。\n【Next】バックスイング時のクラブの上げ方を少し内側に意識してみてください。',
      '【技術分析】セットアップ時の膝の角度が良好で、アドレス時の重心配分も適切です。バックスイング時の上体の捻転は十分ですが、左手首の角度にやや改善の余地があります。ダウンスイング時の腰の切れは良いですが、インパクト時の右肘の位置がもう少し体に近いと理想的です。\n\n【Good】継続的な努力と向上心がスイングに現れています。\n【Next】左手首の角度を意識して練習すると、より安定したインパクトが得られます。'
    ]
  },
  {
    scoreRange: [60, 69],
    comments: [
      '【技術分析】スタンス幅はほぼ適切ですが、ボールポジションが若干左寄りです。バックスイング時の体重移動は見られますが、トップでの左腕の角度に改善の余地があります。ダウンスイング時のタイミングは悪くありませんが、インパクト時の体の開きがやや早めです。フィニッシュでのバランスは保たれており、基本的なポテンシャルを感じます。\n\n【Good】新しいことに挑戦する積極性がスイングからも伝わってきます。\n【Next】アドレス時のセットアップをもう少し丁寧に行うと、スイング全体が向上します。',
      '【技術分析】グリップの握り方は基本に沿っていますが、左手の親指の位置に調整の余地があります。バックスイング時の肩の回転角度は十分ですが、腰の回転がやや不足気味です。ダウンスイング時の軌道は概ね良好ですが、フォロースルーでの右腕の伸びがもう少し欲しいところです。努力と向上心が感じられるスイングです。\n\n【Good】継続的な改善への意欲がスイングに現れています。\n【Next】腰の回転をもう少し意識すると、より力強いスイングになるでしょう。',
      '【技術分析】アドレス時の姿勢は概ね良好ですが、体重配分が若干後ろ寄りです。バックスイング時のクラブヘッドの軌道は安定していますが、トップでの手首の角度に注意が必要です。ダウンスイング時の体の使い方には改善の余地がありますが、基本的な動きは身についています。\n\n【Good】基礎を大切にする姿勢が評価できます。\n【Next】アドレス時の体重配分を見直すと、より安定したスイングになります。'
    ]
  },
  {
    scoreRange: [0, 59],
    comments: [
      '【技術分析】アドレス時の姿勢に基本的な課題が見られますが、スイングに対する意欲は十分に感じられます。バックスイング時の軌道は改善の余地がありますが、インパクトに向かう気持ちの強さは評価できます。フォロースルーでの体の使い方を覚えると、大幅な向上が期待できるでしょう。\n\n【Good】挑戦を続ける姿勢は経営者の鑑です。\n【Next】基本的なアドレスから見直すことで、飛躍的な改善が見込めます。',
      '【技術分析】グリップや構え方に改善点はありますが、スイングへの取り組み姿勢は素晴らしいです。バックスイング時の体の動きを整理し、基本的な動作を身につけることで、より良いスイングに発展させることができるでしょう。継続的な練習の成果が少しずつ現れています。\n\n【Good】困難に屈しない強い意志がスイングからも伝わってきます。\n【Next】基本動作の反復練習により、確実にレベルアップできるでしょう。',
      '【技術分析】現在のスイングには課題がありますが、改善への意欲と可能性を強く感じます。正しいフォームを身につけることで、劇的な変化が期待できます。まずは基本的なグリップとアドレスから始めて、一歩ずつ積み上げていくことが重要です。\n\n【Good】向上心と努力を続ける姿勢は真のリーダーシップです。\n【Next】プロの指導を受けながら、基礎から丁寧に構築していきましょう。'
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