# 🏌️ ゴルフスコア旅行ルーレット ✈️

https://637b3a18.golf-travel-roulette.pages.dev/

**ゴルフのスコアに応じて旅行先が決まる！ユニークな社内レクリエーションアプリ**

あなたのゴルフスコアが、次の旅行先を決めてくれます。アンダーパーなら海外高級リゾート、ダブルボギー以上なら国内日帰り旅行など、スコアに応じて4段階の旅行カテゴリーから自動で抽選される楽しいWebアプリケーションです。

## 🎯 サービス概要

### コンセプト
社内の全ての人（管理職、社員、人事、経営陣）が楽しめる、ゴルフと旅行を組み合わせたユニークなエンターテイメントツール

### 特徴
- **スコア連動システム**: ゴルフスコアに応じて4つのカテゴリーから旅行先を自動選択
- **ルーレット演出**: 見た目にも楽しい回転アニメーションで期待感を演出
- **豊富な旅行先**: 22の魅力的な観光地から抽選
- **履歴機能**: 過去のプレイ結果を保存・表示
- **レスポンシブ対応**: PC・スマートフォンどちらでも快適に利用可能

## 🎲 スコア別旅行カテゴリー

| スコア範囲 | カテゴリー | 例 |
|:----------|:----------|:---|
| **アンダーパー (-1以下)** | 🏝️ **海外高級リゾート** | モルディブ、ハワイ マウイ島、バリ島 ウブド |
| **パー (±0)** | 🌍 **海外人気都市** | パリ、ニューヨーク、ロンドン、ローマ |
| **ボギー (+1〜+10)** | ♨️ **国内温泉・観光地** | 箱根温泉、京都 嵐山、沖縄 石垣島 |
| **ダブルボギー以上 (+11以上)** | 🚗 **国内日帰り旅行** | 鎌倉散策、富士五湖めぐり、江ノ島観光 |

## 🎮 使い方

1. **名前を入力**: あなたの名前を入力
2. **スコア入力**: ゴルフスコア（パー基準）を入力（例: -2, 0, +5）
3. **ルーレット開始**: ボタンをクリックして3秒間のアニメーション
4. **結果発表**: あなたの旅行先が決定！
5. **履歴確認**: 過去のプレイ結果を確認可能

## 🚀 技術仕様

このプロジェクトは、ViteとVanilla JavaScriptを使用したモダンなWeb開発環境で構築されています。

## 📁 プロジェクト構成

```
shunsaku-vite-vanillajs/
├── index.html          # メインのHTMLファイル
├── main.js             # JavaScriptエントリーポイント
├── style.css           # スタイルシート
├── vite.config.js      # Vite設定ファイル
├── package.json        # プロジェクト設定
└── README.md           # このファイル
```

## 🚀 開始方法

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```
開発サーバーが起動し、ブラウザが自動的に開きます（http://localhost:8080）。

### 3. プロダクションビルド
```bash
npm run build
```
`dist/` フォルダにビルド済みファイルが生成されます。

### 4. ビルド結果のプレビュー
```bash
npm run preview
```

## 🛠 主要な機能

### Vite の特徴
- **高速な開発サーバー**: ESMベースで瞬時にページを更新
- **HMR (Hot Module Replacement)**: ファイル変更時の即座反映
- **最適化されたビルド**: Rollupベースの効率的なバンドリング
- **TypeScript対応**: 設定なしでTypeScriptが使用可能

### プロジェクトの特徴
- **ES Modules**: モダンなJavaScriptモジュールシステム
- **ダークモード対応**: CSS media queryによる自動切り替え
- **レスポンシブデザイン**: モバイルファーストなスタイリング

## 📝 ファイル詳細

### `index.html`
- アプリケーションのエントリーポイント
- `main.js`を ES modules として読み込み
- 基本的なHTML構造を定義

### `src/main.js`
- JavaScriptのメインファイル
- ゴルフスコア旅行ルーレットのロジック実装
- 旅行先データ管理、ルーレット演出、履歴機能
- CSS ファイルをインポート

### `style.css`
- アプリケーションのスタイル定義
- ルーレットアニメーション、カードデザイン
- レスポンシブデザイン対応
- グラデーション背景とモダンなUI

### `vite.config.js`
- Viteの設定ファイル
- 開発サーバーのポート設定（8080番）
- ビルド時のソースマップ生成

### `package.json`
- プロジェクトのメタデータ
- npm スクリプトの定義
- ES modules の有効化 (`"type": "module"`)

## 🎯 カスタマイズ方法

### 新しいページの追加
1. HTMLファイルを作成
2. 対応するJSファイルを作成
3. `vite.config.js`でマルチページ設定を追加

### 外部ライブラリの追加
```bash
npm install <library-name>
```
その後、JSファイルでインポート:
```javascript
import { someFunction } from 'library-name'
```

### CSS フレームワークの追加
例: Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 🔧 トラブルシューティング

### ポートが使用中の場合
`vite.config.js`のポート番号を変更してください:
```javascript
server: {
  port: 3000, // 別のポート番号に変更
  open: true
}
```

### ビルドエラーの場合
1. `node_modules` を削除
2. `npm install` で再インストール
3. `npm run build` で再ビルド

## 📚 参考リンク

- [Vite 公式ドキュメント](https://vitejs.dev/)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- [MDN Web Docs - CSS](https://developer.mozilla.org/ja/docs/Web/CSS)

## 🤝 開発のヒント

1. **ホットリロード**: ファイルを保存すると自動でブラウザが更新されます
2. **開発者ツール**: ブラウザの開発者ツールでデバッグを行えます
3. **コンソール**: `console.log()` でデバッグ情報を出力できます
4. **ES6+構文**: モダンなJavaScript構文が使用できます

## 🌐 デプロイ

### Cloudflare Pages
このアプリケーションはCloudflare Pagesに簡単にデプロイできます。

```bash
# ビルド
npm run build

# デプロイ用ZIPファイル作成
cd dist && zip -r ../golf-travel-roulette-deploy.zip * && cd ..
```

詳細な手順は `docs/deploy.md` を参照してください。

## 📊 技術的な特徴

### フロントエンド
- **フレームワーク**: Vanilla JavaScript (フレームワークレス)
- **ビルドツール**: Vite 7.x
- **スタイリング**: Pure CSS (CSSフレームワーク不使用)
- **アニメーション**: CSS3アニメーション
- **データ管理**: localStorage

### UI/UX
- **デザインシステム**: カードベースUI
- **カラーパレット**: グラデーション背景
- **アニメーション**: ルーレット回転エフェクト
- **レスポンシブ**: モバイルファースト設計

### データ構造
```javascript
// 旅行先データ例
{
  category: '海外高級リゾート',
  destinations: [
    {
      name: 'モルディブ リゾート',
      image: 'https://images.unsplash.com/photo-...',
      description: '美しい海に囲まれた水上ヴィラでの至福のひととき'
    }
  ]
}
```

## 🎨 カスタマイズ

### 旅行先の追加・変更
`src/main.js` の `TRAVEL_DESTINATIONS` オブジェクトを編集:

```javascript
const TRAVEL_DESTINATIONS = {
  luxury: {
    category: '海外高級リゾート',
    destinations: [
      // 新しい旅行先を追加
      {
        name: '新しいリゾート',
        image: 'https://example.com/image.jpg',
        description: '説明文'
      }
    ]
  }
}
```

### スコア分類の変更
`getDestinationCategory()` 関数を編集:

```javascript
function getDestinationCategory(score) {
  if (score <= -2) return 'luxury'    // 条件を変更
  if (score <= 0) return 'international'
  if (score <= 15) return 'domestic'  // 条件を変更
  return 'daytrip'
}
```

## 📋 プロジェクト管理

### ドキュメント構成
```
docs/
├── idea.md       # 初期アイデア・コンセプト
├── spec.md       # 要件仕様書
├── design.md     # 設計メモ
├── task.md       # 開発タスク
└── deploy.md     # デプロイ手順
```

### 開発フロー
1. **要件定義** → `docs/spec.md`
2. **設計** → `docs/design.md` 
3. **タスク分解** → `docs/task.md`
4. **実装** → プロトタイプ重視で迅速開発
5. **デプロイ** → `docs/deploy.md`

## 🏆 実装のポイント

### プロトタイプ開発重視
- 複雑な設計より動作を優先
- 最小限の機能で素早くリリース
- 完璧なエラーハンドリングより基本機能の実装

### ユーザー体験
- **直感的操作**: シンプルな3ステップ操作
- **視覚的楽しさ**: ルーレットアニメーションで期待感演出
- **結果の満足感**: 美しい旅行先カードで結果表示

### 技術選択理由
- **Vanilla JS**: 軽量で高速、学習コストが低い
- **localStorage**: サーバー不要でシンプル
- **Unsplash画像**: 高品質な旅行画像を手軽に利用

このプロジェクトは、シンプルな技術スタックで最大限の楽しさを提供する、エンターテイメント重視のWebアプリケーションです。
