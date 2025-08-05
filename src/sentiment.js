const NEGATIVE_KEYWORDS = [
  'つらい', 'しんどい', '疲れた', '疲れて', '疲れ',
  '孤独', '寂しい', '辛い', 'きつい', '苦しい',
  'ストレス', 'いやだ', '嫌だ', '憂鬱', 'うつ',
  '不安', '心配', '困って', '悩んで', '悩み',
  '限界', 'もう', 'やめたい', '辞めたい',
  '助けて', 'だめ', 'ダメ', '無理', 'むり'
]

const STRESS_KEYWORDS = [
  '残業', '忙しい', '間に合わない', '締切', '期限',
  '上司', '同僚', '人間関係', 'パワハラ', 'セクハラ',
  'プレッシャー', '責任', '失敗', 'ミス', '怒られ',
  '眠れない', '食欲', '頭痛', '体調', '病気'
]

export function analyzeSentiment(message) {
  const lowerMessage = message.toLowerCase()
  
  let negativeScore = 0
  let stressScore = 0
  
  NEGATIVE_KEYWORDS.forEach(keyword => {
    const count = (message.match(new RegExp(keyword, 'g')) || []).length
    negativeScore += count * 2
  })
  
  STRESS_KEYWORDS.forEach(keyword => {
    const count = (message.match(new RegExp(keyword, 'g')) || []).length
    stressScore += count * 1.5
  })
  
  const totalScore = negativeScore + stressScore
  const normalizedScore = Math.min(totalScore / message.length * 100, 100)
  
  return {
    negativeScore,
    stressScore,
    totalScore,
    normalizedScore,
    level: getSentimentLevel(normalizedScore),
    needsAttention: normalizedScore > 30
  }
}

function getSentimentLevel(score) {
  if (score > 50) return 'high'
  if (score > 30) return 'medium'
  if (score > 10) return 'low'
  return 'neutral'
}

export function shouldNotifyManager(conversationHistory) {
  if (conversationHistory.length < 3) return false
  
  const recentMessages = conversationHistory
    .filter(msg => msg.isUser)
    .slice(-5)
  
  let totalScore = 0
  let highScoreCount = 0
  
  recentMessages.forEach(msg => {
    const analysis = analyzeSentiment(msg.content)
    totalScore += analysis.normalizedScore
    if (analysis.normalizedScore > 40) {
      highScoreCount++
    }
  })
  
  const averageScore = totalScore / recentMessages.length
  
  return averageScore > 35 || highScoreCount >= 2
}

export function generateNotification(conversationHistory) {
  const userMessages = conversationHistory.filter(msg => msg.isUser)
  const recentAnalysis = userMessages.slice(-3).map(msg => analyzeSentiment(msg.content))
  
  const department = ['営業部', '開発部', '人事部', '総務部', '経理部'][Math.floor(Math.random() * 5)]
  const avgScore = recentAnalysis.reduce((sum, a) => sum + a.normalizedScore, 0) / recentAnalysis.length
  
  let severity = 'low'
  let message = ''
  
  if (avgScore > 50) {
    severity = 'high'
    message = `${department}のメンバーが強いストレスを感じている可能性があります。早急な声かけをお勧めします。`
  } else if (avgScore > 30) {
    severity = 'medium'  
    message = `${department}のメンバーが疲労やストレスを感じている様子です。適度な声かけをご検討ください。`
  } else {
    severity = 'low'
    message = `${department}のメンバーが軽度の不安を感じている可能性があります。タイミングを見て声かけをしてみてください。`
  }
  
  return {
    id: Date.now(),
    department,
    severity,
    message,
    timestamp: new Date(),
    status: 'pending',
    averageScore: Math.round(avgScore)
  }
}