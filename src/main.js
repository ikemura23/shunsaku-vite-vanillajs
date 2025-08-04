import '../style.css'

// 旅行先データ
const TRAVEL_DESTINATIONS = {
  luxury: {
    category: '海外高級リゾート',
    destinations: [
      {
        name: 'モルディブ リゾート',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400',
        description: '美しい海に囲まれた水上ヴィラでの至福のひととき'
      },
      {
        name: 'ハワイ マウイ島',
        image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=400',
        description: 'ワールドクラスのゴルフコースと極上のリゾート体験'
      },
      {
        name: 'バリ島 ウブド',
        image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
        description: '緑豊かな自然に囲まれたラグジュアリーホテル'
      },
      {
        name: 'タヒチ ボラボラ島',
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400',
        description: '南太平洋の楽園での夢のような滞在'
      },
      {
        name: 'カリブ海 セントルシア',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        description: 'カリブ海の宝石と呼ばれる美しい島でのバカンス'
      }
    ]
  },
  international: {
    category: '海外人気都市',
    destinations: [
      {
        name: 'パリ フランス',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
        description: '芸術と文化の都、エッフェル塔やルーブル美術館を満喫'
      },
      {
        name: 'ニューヨーク アメリカ',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
        description: '眠らない街でブロードウェイやタイムズスクエアを体験'
      },
      {
        name: 'ロンドン イギリス',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
        description: '歴史ある街並みと現代文化が融合する魅力的な都市'
      },
      {
        name: 'ローマ イタリア',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
        description: '古代遺跡と美味しいイタリア料理を楽しむ旅'
      },
      {
        name: 'シンガポール',
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400',
        description: 'モダンな街並みと多様な文化が混在するアジアの玄関口'
      },
      {
        name: 'バルセロナ スペイン',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400',
        description: 'ガウディの建築とスペイン文化を堪能'
      }
    ]
  },
  domestic: {
    category: '国内温泉・観光地',
    destinations: [
      {
        name: '箱根温泉',
        image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400',
        description: '富士山を望む温泉リゾートでゆったり過ごす'
      },
      {
        name: '京都 嵐山',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
        description: '竹林の小径と古都の風情を感じる旅'
      },
      {
        name: '沖縄 石垣島',
        image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400',
        description: '青い海と白い砂浜、南国リゾートを満喫'
      },
      {
        name: '草津温泉',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        description: '日本三大名湯の一つ、伝統ある温泉街'
      },
      {
        name: '北海道 札幌',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        description: '新鮮な海鮮とビール、雄大な自然を楽しむ'
      },
      {
        name: '奈良公園',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
        description: '鹿と触れ合い、歴史ある寺社仏閣を巡る'
      }
    ]
  },
  daytrip: {
    category: '国内日帰り旅行',
    destinations: [
      {
        name: '鎌倉散策',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
        description: '大仏様と古都の風情を楽しむ日帰り旅行'
      },
      {
        name: '富士五湖めぐり',
        image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400',
        description: '富士山の絶景を様々な角度から楽しむドライブ'
      },
      {
        name: '江ノ島観光',
        image: 'https://images.unsplash.com/photo-1542640244-4f0d4b3a7651?w=400',
        description: '海岸沿いの風光明媚な観光地でリフレッシュ'
      },
      {
        name: '日光東照宮',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        description: '歴史ある神社と華厳の滝を巡る文化的な旅'
      },
      {
        name: '伊豆半島ドライブ',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        description: '温泉と海の景色を楽しむ爽快ドライブ'
      }
    ]
  }
}

// スコアからカテゴリを決定する関数
function getDestinationCategory(score) {
  if (score <= -1) return 'luxury'
  if (score === 0) return 'international'
  if (score >= 1 && score <= 10) return 'domestic'
  return 'daytrip'
}

// ランダムな旅行先を選択する関数
function selectRandomDestination(category) {
  const destinations = TRAVEL_DESTINATIONS[category].destinations
  const randomIndex = Math.floor(Math.random() * destinations.length)
  return {
    ...destinations[randomIndex],
    category: TRAVEL_DESTINATIONS[category].category
  }
}

// 画面切り替えする関数
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active')
  })
  document.getElementById(sectionId).classList.add('active')
}

// アプリケーションの初期化
function initApp() {
  const scoreForm = document.getElementById('score-form')
  const playAgainBtn = document.getElementById('play-again')
  const viewHistoryBtn = document.getElementById('view-history')
  const backToMainBtn = document.getElementById('back-to-main')

  // スコア入力フォームの処理
  scoreForm.addEventListener('submit', handleScoreSubmit)
  
  // ボタンイベント
  playAgainBtn.addEventListener('click', () => {
    document.getElementById('score-form').reset()
    showSection('input-section')
  })
  
  viewHistoryBtn.addEventListener('click', () => showHistory())
  backToMainBtn.addEventListener('click', () => showSection('input-section'))
}

// スコア入力処理
function handleScoreSubmit(e) {
  e.preventDefault()
  
  const playerName = document.getElementById('player-name').value
  const golfScore = parseInt(document.getElementById('golf-score').value)
  
  startRoulette(playerName, golfScore)
}

// ルーレット開始
function startRoulette(playerName, score) {
  showSection('roulette-section')
  
  // ルーレット演出（3秒後に結果表示）
  setTimeout(() => {
    const category = getDestinationCategory(score)
    const destination = selectRandomDestination(category)
    
    // 履歴に保存
    saveToHistory(playerName, score, destination)
    
    // 結果表示
    showResult(playerName, score, destination)
  }, 3000)
}

// 結果表示
function showResult(playerName, score, destination) {
  document.getElementById('destination-image').src = destination.image
  document.getElementById('destination-name').textContent = destination.name
  document.getElementById('destination-description').textContent = destination.description
  document.getElementById('player-result').textContent = `${playerName}さん`
  document.getElementById('score-result').textContent = `スコア: ${score > 0 ? '+' : ''}${score} (${destination.category})`
  
  showSection('result-section')
}

// 履歴保存
function saveToHistory(playerName, score, destination) {
  const history = JSON.parse(localStorage.getItem('golfTravelHistory') || '[]')
  history.unshift({
    date: new Date().toLocaleDateString('ja-JP'),
    playerName,
    score,
    destination
  })
  
  // 最新20件まで保存
  if (history.length > 20) {
    history.pop()
  }
  
  localStorage.setItem('golfTravelHistory', JSON.stringify(history))
}

// 履歴表示
function showHistory() {
  const history = JSON.parse(localStorage.getItem('golfTravelHistory') || '[]')
  const historyList = document.getElementById('history-list')
  
  if (history.length === 0) {
    historyList.innerHTML = '<p>まだ履歴がありません</p>'
  } else {
    historyList.innerHTML = history.map(item => `
      <div class="history-item">
        <div class="history-date">${item.date}</div>
        <div class="history-player">${item.playerName}さん</div>
        <div class="history-score">スコア: ${item.score > 0 ? '+' : ''}${item.score}</div>
        <div class="history-destination">${item.destination.name}</div>
      </div>
    `).join('')
  }
  
  showSection('history-section')
}

// アプリケーション開始
document.addEventListener('DOMContentLoaded', initApp)