import './style.css'
import { analyzeSentiment, shouldNotifyManager, generateNotification } from './sentiment.js'

let currentTab = 'chat'
let chatMessages = []
let notifications = []

function setupTabSwitching() {
  const tabs = document.querySelectorAll('.tab')
  const tabContents = document.querySelectorAll('.tab-content')
  
  console.log('タブ数:', tabs.length, 'コンテンツ数:', tabContents.length)
  
  tabs.forEach((tab, index) => {
    console.log(`タブ ${index}:`, tab.getAttribute('data-tab'), tab)
    
    tab.addEventListener('click', (e) => {
      e.preventDefault()
      console.log('タブクリック:', tab.getAttribute('data-tab'))
      
      // アクティブタブの見た目を更新
      tabs.forEach(t => {
        t.style.background = '#f9fafb'
        t.style.fontWeight = 'normal'
      })
      tab.style.background = '#e5e7eb'
      tab.style.fontWeight = 'bold'
      
      // すべてのタブコンテンツを非表示
      tabContents.forEach(content => {
        content.classList.add('hidden')
        console.log('非表示にした:', content.id)
      })
      
      // 選択されたタブコンテンツを表示
      const targetTab = tab.getAttribute('data-tab')
      const targetContent = document.getElementById(`${targetTab}-view`)
      
      console.log('選択されたタブ:', targetTab, 'コンテンツ要素:', targetContent)
      
      if (targetContent) {
        targetContent.classList.remove('hidden')
        console.log('表示した:', targetContent.id)
        currentTab = targetTab
      } else {
        console.error('タブコンテンツが見つかりません:', `${targetTab}-view`)
      }
    })
  })
  
  // 初期表示でチャットタブを確実に表示
  const chatView = document.getElementById('chat-view')
  if (chatView) {
    chatView.classList.remove('hidden')
    console.log('初期表示: チャットタブを表示')
  }
}

function addChatMessage(content, isUser = false) {
  const messagesContainer = document.getElementById('chat-messages')
  const messageDiv = document.createElement('div')
  messageDiv.className = `chat ${isUser ? 'chat-end' : 'chat-start'}`
  
  messageDiv.innerHTML = `
    <div class="chat-image avatar">
      <div class="w-10 rounded-full bg-${isUser ? 'primary' : 'secondary'} flex items-center justify-center">
        <span class="text-${isUser ? 'primary' : 'secondary'}-content text-sm">${isUser ? '😊' : '🤖'}</span>
      </div>
    </div>
    <div class="chat-bubble ${isUser ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
      ${content}
    </div>
  `
  
  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
  
  chatMessages.push({ content, isUser, timestamp: new Date() })
}

function getAIResponse(userMessage) {
  const responses = [
    "お疲れさまです。そのお気持ち、よく分かります。",
    "大変でしたね。一人で抱え込まず、お話しいただいてありがとうございます。",
    "そういう時もありますよね。無理をしないでくださいね。",
    "お忙しい中、本当にお疲れさまです。少しでも気持ちが楽になればと思います。",
    "そのようなことがあったのですね。お辛いお気持ちをお察しします。",
    "お話を聞かせていただき、ありがとうございます。一緒に考えてみましょう。",
    "ストレスを感じる状況ですね。ご自身のペースで大丈夫ですよ。"
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function setupChat() {
  const chatInput = document.getElementById('chat-input')
  const sendButton = document.getElementById('send-button')
  
  function sendMessage() {
    const message = chatInput.value.trim()
    if (!message) return
    
    addChatMessage(message, true)
    chatInput.value = ''
    
    const sentiment = analyzeSentiment(message)
    console.log('感情分析結果:', sentiment)
    
    if (shouldNotifyManager(chatMessages)) {
      const notification = generateNotification(chatMessages)
      notifications.push(notification)
      console.log('通知生成:', notification)
      updateNotificationBadge()
    }
    
    setTimeout(() => {
      const aiResponse = getAIResponse(message)
      addChatMessage(aiResponse)
    }, 1000)
  }
  
  sendButton.addEventListener('click', sendMessage)
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  })
  
  addChatMessage('こんにちは！何かお悩みがあれば、お気軽にお話しください。完全匿名でお聞きします。')
}

function updateNotificationBadge() {
  const adminTab = document.querySelector('[data-tab="admin"]')
  const pendingCount = notifications.filter(n => n.status === 'pending').length
  
  if (pendingCount > 0) {
    adminTab.innerHTML = `📋 管理画面 <span class="badge badge-error badge-sm">${pendingCount}</span>`
  } else {
    adminTab.innerHTML = '📋 管理画面'
  }
}

function setupAdmin() {
  const notificationsList = document.getElementById('notifications-list')
  
  function renderNotifications() {
    console.log('管理画面をレンダリング中, 通知数:', notifications.length)
    
    if (notifications.length === 0) {
      notificationsList.innerHTML = `
        <div class="text-center py-8 text-base-content/70">
          <p>現在、通知はありません</p>
          <p class="text-sm mt-2">チャットで「疲れた」「つらい」などのキーワードを使うと通知が生成されます</p>
        </div>
      `
      return
    }
    
    notificationsList.innerHTML = notifications.map(notification => `
      <div class="card bg-base-100 shadow-md mb-4">
        <div class="card-body">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="card-title text-lg">
                ${notification.department} 
                <span class="badge badge-${getSeverityColor(notification.severity)}">${getSeverityText(notification.severity)}</span>
              </h3>
              <p class="text-base-content/80 mt-2">${notification.message}</p>
              <p class="text-sm text-base-content/60 mt-2">
                感情スコア: ${notification.averageScore}/100 | 
                ${notification.timestamp.toLocaleString('ja-JP')}
              </p>
            </div>
            <div class="flex gap-2 ml-4">
              ${notification.status === 'pending' ? `
                <button class="btn btn-success btn-sm" onclick="markAsResponded(${notification.id})">
                  ✅ 声かけ完了
                </button>
              ` : `
                <span class="badge badge-success">対応済み</span>
              `}
            </div>
          </div>
        </div>
      </div>
    `).join('')
  }
  
  // 初期表示
  renderNotifications()
  
  window.markAsResponded = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.status = 'responded'
      renderNotifications()
      updateNotificationBadge()
      
      const giftResult = Math.random() < 0.3 ? 'Amazonギフト券 1,000円が当選しました！🎉' : 'おつかれさまでした。次回の抽選にご期待ください。'
      alert(`声かけ報告ありがとうございます！\n\n抽選結果: ${giftResult}`)
    }
  }
}

function getSeverityColor(severity) {
  switch(severity) {
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'info'
    default: return 'ghost'
  }
}

function getSeverityText(severity) {
  switch(severity) {
    case 'high': return '緊急'
    case 'medium': return '注意'
    case 'low': return '軽微'
    default: return '通常'
  }
}

function setupDashboard() {
  const dashboardContent = document.getElementById('dashboard-content')
  
  function renderDashboard() {
    console.log('ダッシュボードをレンダリング中')
    
    const departments = ['営業部', '開発部', '人事部', '総務部', '経理部']
    const mockData = departments.map(dept => ({
      name: dept,
      memberCount: Math.floor(Math.random() * 20) + 10,
      stressLevel: Math.floor(Math.random() * 100),
      recentNotifications: Math.floor(Math.random() * 5),
      responseRate: Math.floor(Math.random() * 30) + 70
    }))
    
    const totalNotifications = notifications.length
    const respondedNotifications = notifications.filter(n => n.status === 'responded').length
    const overallResponseRate = totalNotifications > 0 ? Math.round((respondedNotifications / totalNotifications) * 100) : 0
    
    dashboardContent.innerHTML = `
      <!-- 全社統計 -->
      <div class="stats shadow mb-6 w-full">
        <div class="stat">
          <div class="stat-title">総通知数</div>
          <div class="stat-value text-primary">${totalNotifications}</div>
          <div class="stat-desc">今月の累計</div>
        </div>
        <div class="stat">
          <div class="stat-title">対応率</div>
          <div class="stat-value text-secondary">${overallResponseRate}%</div>
          <div class="stat-desc">声かけ実施率</div>
        </div>
        <div class="stat">
          <div class="stat-title">平均対応時間</div>
          <div class="stat-value text-accent">2.3h</div>
          <div class="stat-desc">通知から声かけまで</div>
        </div>
      </div>

      <!-- 部門別状況 -->
      <h3 class="text-xl font-bold mb-4">部門別エモーショナル状況</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${mockData.map(dept => `
          <div class="card bg-base-100 shadow-md">
            <div class="card-body">
              <h4 class="card-title text-lg">${dept.name}</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>メンバー数</span>
                  <span class="font-semibold">${dept.memberCount}名</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>ストレス指数</span>
                  <div class="flex items-center gap-2">
                    <progress class="progress progress-${getStressColor(dept.stressLevel)} w-16" value="${dept.stressLevel}" max="100"></progress>
                    <span class="text-sm">${dept.stressLevel}</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span>今週の通知</span>
                  <span class="badge badge-info">${dept.recentNotifications}件</span>
                </div>
                <div class="flex justify-between">
                  <span>声かけ率</span>
                  <span class="text-success font-semibold">${dept.responseRate}%</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- エンパシーランキング -->
      <div class="mt-8">
        <h3 class="text-xl font-bold mb-4">今月のエンパシーランキング 🏆</h3>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>順位</th>
                <th>部門</th>
                <th>声かけ回数</th>
                <th>対応率</th>
                <th>エンパシースコア</th>
              </tr>
            </thead>
            <tbody>
              ${mockData
                .sort((a, b) => b.responseRate - a.responseRate)
                .map((dept, index) => `
                  <tr>
                    <td>
                      <div class="flex items-center gap-2">
                        ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}位`}
                      </div>
                    </td>
                    <td>${dept.name}</td>
                    <td>${dept.recentNotifications * 2}</td>
                    <td>${dept.responseRate}%</td>
                    <td>
                      <div class="badge badge-${index < 3 ? 'success' : 'ghost'}">${dept.responseRate + Math.floor(Math.random() * 20)}</div>
                    </td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
  }
  
  // 初期表示
  renderDashboard()
}

function getStressColor(level) {
  if (level > 70) return 'error'
  if (level > 40) return 'warning'
  return 'success'
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM読み込み完了')
  
  try {
    setupTabSwitching()
    console.log('タブ切り替え設定完了')
    
    setupChat()
    console.log('チャット設定完了')
    
    setupAdmin()
    console.log('管理画面設定完了')
    
    setupDashboard()
    console.log('ダッシュボード設定完了')
    
    console.log('悩み共有ラジオが開始されました')
  } catch (error) {
    console.error('初期化エラー:', error)
  }
})