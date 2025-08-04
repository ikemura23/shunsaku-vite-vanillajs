// 共通ユーティリティ関数

// localStorage操作
export const storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Storage save error:', error)
      return false
    }
  },
  
  load: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Storage load error:', error)
      return defaultValue
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Storage remove error:', error)
      return false
    }
  }
}

// 日付ユーティリティ
export const dateUtils = {
  getCurrentYear: () => new Date().getFullYear(),
  
  formatDate: (date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  },
  
  isCurrentYear: (year) => year === new Date().getFullYear()
}

// ファイルユーティリティ
export const fileUtils = {
  // 動画ファイルかチェック
  isVideoFile: (file) => {
    const videoTypes = ['video/mp4', 'video/quicktime', 'video/avi', 'video/webm']
    return videoTypes.includes(file.type)
  },
  
  // ファイルサイズを読みやすい形式に変換
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },
  
  // ファイルサイズ制限チェック（MB単位）
  checkFileSize: (file, maxSizeMB = 100) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    return file.size <= maxSizeBytes
  }
}

// スコア関連ユーティリティ
export const scoreUtils = {
  // スコアからボーナス率を計算
  calculateBonusRate: (score) => {
    if (score >= 86) return 20
    if (score >= 71) return 10
    if (score >= 51) return 5
    return 0
  },
  
  // スコア評価テキストを取得
  getScoreGrade: (score) => {
    if (score >= 90) return { grade: 'S', text: '完璧', color: 'text-success' }
    if (score >= 80) return { grade: 'A', text: '優秀', color: 'text-success' }
    if (score >= 70) return { grade: 'B', text: '良好', color: 'text-info' }
    if (score >= 60) return { grade: 'C', text: '普通', color: 'text-warning' }
    return { grade: 'D', text: '要改善', color: 'text-error' }
  }
}

// アニメーションユーティリティ
export const animationUtils = {
  // 数値のカウントアップアニメーション
  countUp: (element, start, end, duration = 2000) => {
    const startTime = performance.now()
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // イージング関数（easeOutCubic）
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (end - start) * easeProgress)
      
      element.textContent = current
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  },
  
  // 要素のフェードイン
  fadeIn: (element, duration = 500) => {
    element.style.opacity = '0'
    element.style.transition = `opacity ${duration}ms ease-in-out`
    
    requestAnimationFrame(() => {
      element.style.opacity = '1'
    })
  },
  
  // 簡易パーティクル演出
  celebrateParticles: (container) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
    const particleCount = 50
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        animation: particle-fall ${2 + Math.random() * 3}s ease-out forwards;
        left: ${Math.random() * 100}%;
        top: -10px;
        z-index: 1000;
      `
      
      container.appendChild(particle)
      
      // アニメーション終了後に要素を削除
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 5000)
    }
  }
}

// バリデーションユーティリティ
export const validateUtils = {
  // パスワード検証（簡易版）
  checkPresidentPassword: (password) => {
    const correctPassword = 'president2024' // プロトタイプ用の固定パスワード
    return password === correctPassword
  },
  
  // 年度重複チェック
  checkYearDuplicate: (year, history) => {
    return history.some(item => item.year === year)
  }
}

// 通知ユーティリティ
export const notifyUtils = {
  // 成功通知
  success: (message, duration = 3000) => {
    showToast(message, 'alert-success', duration)
  },
  
  // エラー通知
  error: (message, duration = 3000) => {
    showToast(message, 'alert-error', duration)
  },
  
  // 情報通知
  info: (message, duration = 3000) => {
    showToast(message, 'alert-info', duration)
  }
}

// トースト通知の実装
function showToast(message, alertClass, duration) {
  const toast = document.createElement('div')
  toast.className = `alert ${alertClass} fixed top-4 right-4 max-w-md z-50 shadow-lg`
  toast.innerHTML = `
    <span>${message}</span>
    <button class="btn btn-sm btn-circle btn-ghost" onclick="this.parentElement.remove()">✕</button>
  `
  
  document.body.appendChild(toast)
  
  // 自動削除
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove()
    }
  }, duration)
}

// デバッグユーティリティ
export const debugUtils = {
  log: (message, data = null) => {
    if (import.meta.env.DEV) {
      console.log(`[SwingApp] ${message}`, data || '')
    }
  },
  
  error: (message, error = null) => {
    console.error(`[SwingApp Error] ${message}`, error || '')
  }
}