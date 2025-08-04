// 動画アップロード機能

import { fileUtils, storage, validateUtils, notifyUtils, debugUtils } from './utils.js'

let selectedFile = null
let videoPreview = null

// アップロードページの表示
export function showUploadPage() {
  const mainContent = document.getElementById('main-content')
  const currentYear = window.swingApp.currentYear
  const hasCurrentYearData = window.swingApp.history.some(h => h.year === currentYear)
  
  // 既に今年のデータがある場合は警告
  if (hasCurrentYearData) {
    mainContent.innerHTML = `
      <div class="max-w-2xl mx-auto">
        <div class="alert alert-warning mb-6">
          <span>⚠️ ${currentYear}年度のスイングは既に記録されています</span>
        </div>
        <div class="text-center">
          <button class="btn btn-primary" onclick="navigateTo('result')">結果を見る</button>
          <button class="btn btn-outline ml-4" onclick="navigateTo('home')">ホームに戻る</button>
        </div>
      </div>
    `
    return
  }
  
  // 認証チェック
  if (!window.swingApp.isAuthenticated) {
    showAuthPage()
    return
  }
  
  // アップロードページを表示
  showUploadForm()
}

// 社長認証ページ
function showAuthPage() {
  const mainContent = document.getElementById('main-content')
  
  mainContent.innerHTML = `
    <div class="max-w-md mx-auto">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl">🔐 社長認証</h2>
          <p class="text-center mb-4">動画アップロードには社長認証が必要です</p>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">パスワード</span>
            </label>
            <input 
              id="password-input" 
              type="password" 
              placeholder="パスワードを入力" 
              class="input input-bordered"
            />
          </div>
          
          <div class="card-actions justify-center mt-6">
            <button id="auth-btn" class="btn btn-primary">認証する</button>
            <button class="btn btn-outline" onclick="navigateTo('home')">戻る</button>
            <button id="debug-auth-btn" class="btn btn-warning btn-sm">🐛 デバッグ認証</button>
          </div>
        </div>
      </div>
    </div>
  `
  
  // イベントリスナー設定
  setupAuthEventListeners()
}

// アップロードフォーム表示
function showUploadForm() {
  const mainContent = document.getElementById('main-content')
  
  mainContent.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">🏌️‍♂️ スイング動画アップロード</h2>
      
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- アップロード部分 -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">動画を選択</h3>
            
            <!-- ファイル選択エリア -->
            <div id="file-drop-area" class="border-2 border-dashed border-base-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <div class="mb-4 text-4xl">📹</div>
              <p class="text-lg mb-2">動画ファイルをドラッグ&ドロップ</p>
              <p class="text-sm text-base-content/70 mb-4">または</p>
              <button id="file-select-btn" class="btn btn-primary">ファイルを選択</button>
              <input id="file-input" type="file" accept="video/*" class="hidden" />
            </div>
            
            <!-- ファイル情報 -->
            <div id="file-info" class="hidden mt-4">
              <div class="bg-base-100 p-4 rounded-lg">
                <h4 class="font-bold mb-2">選択されたファイル</h4>
                <div id="file-details"></div>
                <div class="flex gap-2 mt-4">
                  <button id="upload-btn" class="btn btn-success" disabled>アップロード開始</button>
                  <button id="clear-btn" class="btn btn-outline">クリア</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- プレビュー部分 -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">プレビュー</h3>
            
            <div id="video-preview-area" class="bg-base-100 rounded-lg min-h-64 flex items-center justify-center">
              <div class="text-center text-base-content/50">
                <div class="text-4xl mb-2">🎬</div>
                <p>動画を選択するとプレビューが表示されます</p>
              </div>
            </div>
            
            <!-- 制約説明 -->
            <div class="mt-4">
              <h4 class="font-bold mb-2">⚠️ アップロード制約</h4>
              <ul class="text-sm space-y-1">
                <li>• ファイル形式: MP4, MOV, AVI, WebM</li>
                <li>• 最大サイズ: 100MB</li>
                <li>• 年1回のみアップロード可能</li>
                <li>• 推奨時間: 10〜30秒</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  
  // イベントリスナー設定
  setupUploadEventListeners()
}

// 認証イベントリスナー
function setupAuthEventListeners() {
  const passwordInput = document.getElementById('password-input')
  const authBtn = document.getElementById('auth-btn')
  const debugAuthBtn = document.getElementById('debug-auth-btn')
  
  const handleAuth = () => {
    const password = passwordInput.value
    
    if (validateUtils.checkPresidentPassword(password)) {
      // 認証成功
      window.swingApp.isAuthenticated = true
      storage.save('isPresident', true)
      notifyUtils.success('認証に成功しました！')
      showUploadForm()
    } else {
      // 認証失敗
      notifyUtils.error('パスワードが間違っています')
      passwordInput.value = ''
      passwordInput.focus()
    }
  }
  
  const handleDebugAuth = () => {
    // デバッグ認証（パスワードをスキップ）
    window.swingApp.isAuthenticated = true
    storage.save('isPresident', true)
    notifyUtils.success('🐛 デバッグ認証でログインしました')
    showUploadForm()
  }
  
  authBtn.addEventListener('click', handleAuth)
  debugAuthBtn.addEventListener('click', handleDebugAuth)
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAuth()
    }
  })
  
  passwordInput.focus()
}

// アップロードイベントリスナー
function setupUploadEventListeners() {
  const fileInput = document.getElementById('file-input')
  const fileSelectBtn = document.getElementById('file-select-btn')
  const fileDropArea = document.getElementById('file-drop-area')
  const clearBtn = document.getElementById('clear-btn')
  const uploadBtn = document.getElementById('upload-btn')
  
  // ファイル選択ボタン
  fileSelectBtn.addEventListener('click', () => {
    fileInput.click()
  })
  
  // ドラッグ&ドロップエリアクリック（ボタン以外の部分）
  fileDropArea.addEventListener('click', (e) => {
    // ファイル選択ボタンをクリックした場合は無視
    if (e.target.id === 'file-select-btn' || e.target.closest('#file-select-btn')) {
      return
    }
    
    // ドロップエリアの他の部分をクリックした場合のみファイル選択
    if (e.target === fileDropArea || e.target.closest('#file-drop-area')) {
      fileInput.click()
    }
  })
  
  // ファイル選択
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  })
  
  // ドラッグ&ドロップ
  fileDropArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    fileDropArea.classList.add('border-primary')
  })
  
  fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('border-primary')
  })
  
  fileDropArea.addEventListener('drop', (e) => {
    e.preventDefault()
    fileDropArea.classList.remove('border-primary')
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  })
  
  // クリアボタン
  clearBtn.addEventListener('click', clearFile)
  
  // アップロードボタン
  uploadBtn.addEventListener('click', startUpload)
}

// ファイル選択処理
function handleFileSelect(file) {
  debugUtils.log('File selected:', file.name)
  
  // バリデーション
  if (!fileUtils.isVideoFile(file)) {
    notifyUtils.error('動画ファイルを選択してください')
    return
  }
  
  if (!fileUtils.checkFileSize(file, 100)) {
    notifyUtils.error('ファイルサイズが100MBを超えています')
    return
  }
  
  selectedFile = file
  showFileInfo(file)
  showVideoPreview(file)
  
  // アップロードボタンを有効化
  document.getElementById('upload-btn').disabled = false
}

// ファイル情報表示
function showFileInfo(file) {
  const fileInfo = document.getElementById('file-info')
  const fileDetails = document.getElementById('file-details')
  
  fileDetails.innerHTML = `
    <div class="space-y-2">
      <div><strong>ファイル名:</strong> ${file.name}</div>
      <div><strong>サイズ:</strong> ${fileUtils.formatFileSize(file.size)}</div>
      <div><strong>形式:</strong> ${file.type}</div>
      <div><strong>最終更新:</strong> ${new Date(file.lastModified).toLocaleString('ja-JP')}</div>
    </div>
  `
  
  fileInfo.classList.remove('hidden')
}

// 動画プレビュー表示
function showVideoPreview(file) {
  const previewArea = document.getElementById('video-preview-area')
  
  // 既存のプレビューを削除
  if (videoPreview) {
    videoPreview.remove()
  }
  
  // 新しい動画要素を作成
  videoPreview = document.createElement('video')
  videoPreview.className = 'w-full h-auto max-h-64 rounded-lg'
  videoPreview.controls = true
  videoPreview.preload = 'metadata'
  
  // ファイルURLを設定
  const fileURL = URL.createObjectURL(file)
  videoPreview.src = fileURL
  
  // プレビューエリアを更新
  previewArea.innerHTML = ''
  previewArea.appendChild(videoPreview)
  
  // メタデータ読み込み完了時の処理
  videoPreview.addEventListener('loadedmetadata', () => {
    const duration = Math.round(videoPreview.duration)
    debugUtils.log(`Video duration: ${duration} seconds`)
    
    // 時間情報を追加表示
    const fileDetails = document.getElementById('file-details')
    fileDetails.innerHTML += `
      <div><strong>再生時間:</strong> ${duration}秒</div>
    `
  })
}

// ファイルクリア
function clearFile() {
  selectedFile = null
  
  // UI要素をリセット
  document.getElementById('file-input').value = ''
  document.getElementById('file-info').classList.add('hidden')
  document.getElementById('upload-btn').disabled = true
  
  // プレビューをクリア
  const previewArea = document.getElementById('video-preview-area')
  previewArea.innerHTML = `
    <div class="text-center text-base-content/50">
      <div class="text-4xl mb-2">🎬</div>
      <p>動画を選択するとプレビューが表示されます</p>
    </div>
  `
  
  if (videoPreview) {
    URL.revokeObjectURL(videoPreview.src)
    videoPreview = null
  }
  
  notifyUtils.info('ファイル選択をクリアしました')
}

// アップロード開始
function startUpload() {
  if (!selectedFile) {
    notifyUtils.error('ファイルが選択されていません')
    return
  }
  
  debugUtils.log('Starting upload process')
  
  // 動画データを保存（base64エンコード）
  const reader = new FileReader()
  reader.onload = (e) => {
    const videoData = {
      year: window.swingApp.currentYear,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
      data: e.target.result, // base64データ
      uploadDate: new Date().toISOString(),
      duration: videoPreview ? Math.round(videoPreview.duration) : 0
    }
    
    // グローバル状態に保存
    window.swingApp.currentVideo = videoData
    
    notifyUtils.success('動画のアップロードが完了しました！')
    
    // 分析ページに遷移
    setTimeout(() => {
      window.navigateTo('analysis')
    }, 1000)
  }
  
  reader.onerror = () => {
    notifyUtils.error('ファイルの読み込みに失敗しました')
  }
  
  // ファイルを読み込み開始
  reader.readAsDataURL(selectedFile)
  
  // UIをローディング状態に
  document.getElementById('upload-btn').disabled = true
  document.getElementById('upload-btn').innerHTML = `
    <span class="loading loading-spinner loading-sm"></span>
    アップロード中...
  `
}