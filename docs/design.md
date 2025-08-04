# 設計メモ (プロトタイプ用) - 社長スイング・ボーナスジャッジ

**方針**: プロトタイプなので複雑なアーキテクチャやAPI設計は不要。シンプルで素早く作れる構成を優先。

## 基本構成
- 使用技術: Vite + Vanilla JS + HTML + Tailwind CSS + daisyUI
- ファイル構成: シンプルなフラット構造（src/配下にモジュール配置）

## ページ構成・ルーティング
```
index.html → トップページ（イベント概要・カウントダウン）
├── /upload → 動画アップロードページ（社長専用）
├── /analysis → AI分析中ページ（ローディング演出）
├── /result → 結果発表ページ（スコア・ボーナス表示）
└── /gallery → 歴代スイング履歴ページ
```

## ファイル構造（プロトタイプ版）
```
src/
├── main.js          # エントリーポイント・ルーティング
├── upload.js        # 動画アップロード処理
├── scoring.js       # AIスコア生成（モック）
├── result.js        # 結果表示・演出
├── gallery.js       # 履歴表示
├── comments.js      # 社員コメント機能
└── utils.js         # 共通ユーティリティ
```

## データ管理（簡易版）
- **グローバル状態**: `window.swingApp` オブジェクト
- **永続化**: localStorage（動画データはbase64エンコード）
- **データ構造**:
```javascript
window.swingApp = {
  currentYear: 2024,
  currentVideo: null,
  currentScore: null,
  history: [], // 歴代データ
  comments: [] // 社員コメント
}
```

## AIスコアリング（モック実装）
```javascript
// 簡易スコア生成ロジック
const generateScore = (videoFile) => {
  const baseScore = 65 + Math.random() * 25; // 65-90点のベース
  const factors = {
    fileSize: videoFile.size > 50MB ? 5 : -2, // ファイルサイズ影響
    duration: videoDuration > 10 ? 3 : -1,    // 動画時間影響
    random: Math.random() * 10 - 5           // ランダム要素
  };
  return Math.min(100, Math.max(0, Math.round(baseScore + factors.fileSize + factors.duration + factors.random)));
}
```

## UI/スタイリング
- **テーマ**: daisyUI corporate テーマ（ビジネス感）
- **カラー**: primary（青系）、success（緑系）、warning（オレンジ系）
- **レスポンシブ**: モバイルファースト（sm:, md:, lg: ブレークポイント）
- **アニメーション**: CSS transition + daisyUI loading components

## コンポーネント設計（関数ベース）
```javascript
// ページ表示関数
const showUploadPage = () => { /* HTML生成・イベント設定 */ }
const showAnalysisPage = () => { /* ローディング演出 */ }
const showResultPage = (score) => { /* スコア表示・演出 */ }

// 共通コンポーネント
const createScoreCard = (score) => { /* スコアカード生成 */ }
const createCommentForm = () => { /* コメント入力フォーム */ }
const createProgressBar = (progress) => { /* 進行状況バー */ }
```

## 演出・エンタメ要素
- **カウントダウンタイマー**: setInterval でリアルタイム更新
- **スコア発表演出**: 数字のカウントアップアニメーション
- **ローディング**: daisyUI loading + 3段階進行表示
- **効果音**: Web Audio API（オプション）
- **パーティクル**: CSS keyframes でお祝い演出

## セキュリティ・制約（プロトタイプ）
- 社長認証: 簡易パスワード（localStorage保存）
- 動画保存: クライアントサイドのみ（base64）
- アップロード制限: 年1回（localStorage日付チェック）
- ファイル検証: 拡張子・サイズのみ

## パフォーマンス考慮
- 動画プレビュー: HTMLVideoElement
- 大容量ファイル: File APIで段階的読み込み
- 画像最適化: 不要（動画のみ扱い）
- バンドルサイズ: Viteの自動最適化に依存

## メモ
- AI分析は後の拡張ポイント（MediaPipe、TensorFlow.js等）
- 社員コメントはリアルタイム更新不要（ページリロードで反映）
- エラーハンドリングは最小限（console.log + alert）
- 本格運用時は動画保存・認証・リアルタイム機能が必要