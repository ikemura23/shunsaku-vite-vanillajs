# 🏌️‍♂️ 社長スイング・ボーナスジャッジ

社長のゴルフスイング動画をAIで分析し、スコアに応じて社員ボーナスが決まる年末イベント用Webアプリケーション

**〜運命の一振りが、社員の冬を暖かくする〜**

このプロジェクトは、Vite + Vanilla JavaScript + Tailwind CSS + daisyUIを使用したプロトタイプアプリです。

## ✨ 主要機能

- 🎯 **AIスコアリング**: 5項目評価（力強さ、安定性、美しさ、成長性、やる気）
- 💰 **ボーナス連動**: スコアに応じて最大20%増額
- 📹 **動画アップロード**: ドラッグ&ドロップ対応、プレビュー機能
- 🎭 **演出機能**: カウントアップアニメーション、パーティクル演出
- 📊 **履歴管理**: 統計情報、スコア推移グラフ
- 🛠️ **デバッグ機能**: データ削除・リセット機能

## 📁 プロジェクト構成

```
shunsaku-vite-vanillajs/
├── docs/               # 設計ドキュメント
│   ├── idea.md         # アイデア・コンセプト
│   ├── spec.md         # 機能仕様書
│   ├── design.md       # 設計メモ
│   └── task.md         # 作業タスク管理
├── src/                # ソースコード
│   ├── main.js         # エントリーポイント・ルーティング
│   ├── upload.js       # 動画アップロード機能
│   ├── scoring.js      # AIスコアリング（モック）
│   ├── result.js       # 結果表示・演出
│   ├── gallery.js      # 履歴・ギャラリー機能
│   ├── utils.js        # 共通ユーティリティ
│   └── style.css       # カスタムスタイル・アニメーション
├── index.html          # メインHTMLファイル
├── vite.config.js      # Vite設定
├── tailwind.config.js  # Tailwind CSS設定
├── postcss.config.js   # PostCSS設定
└── package.json        # プロジェクト設定
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
開発サーバーが起動し、ブラウザが自動的に開きます（http://localhost:3000）。

## 🎮 使用方法

### 基本フロー
1. **ホーム画面** → 「スイング動画をアップロード」ボタンをクリック
2. **社長認証** → パスワード入力: `president2024`
3. **動画アップロード** → 動画ファイル（MP4推奨）を選択・プレビュー
4. **AI分析中** → 4段階の分析プロセスを表示
5. **結果発表** → スコア発表、ボーナス増減率、お祝い演出
6. **履歴確認** → ナビの「履歴」で過去データを確認

### デバッグ・テスト機能
- **データ削除**: ギャラリー画面 → 右上「⚙️ デバッグ機能」→「今年のデータ削除」
- **全履歴削除**: 「全履歴削除」で完全リセット
- **繰り返しテスト**: データ削除後、再度アップロードでテスト可能

### スコアリング基準
| スコア範囲 | ボーナス増減 | 評価 |
|------------|--------------|------|
| 86-100点 | +20% | S完璧 |
| 71-85点 | +10% | A優秀 |
| 51-70点 | +5% | B良好 |
| 0-50点 | 現状維持 | C普通～D要改善 |

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
- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **daisyUI**: 美しいコンポーネントライブラリ
- **ダークモード対応**: daisyUIによるテーマ切り替え機能
- **レスポンシブデザイン**: Tailwindのブレークポイントシステム

## 📝 ファイル詳細

### `index.html`
- アプリケーションのエントリーポイント
- `main.js`を ES modules として読み込み
- 基本的なHTML構造を定義

### `main.js`
- JavaScriptのメインファイル
- カウンターボタンの動作を実装
- CSS ファイルをインポート

### `style.css`
- アプリケーションのスタイル定義
- ダークモード/ライトモード対応
- モダンなCSS設計パターン

### `vite.config.js`
- Viteの設定ファイル
- 開発サーバーのポート設定（3000番）
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

### CSS フレームワーク
Tailwind CSS + daisyUIが既にセットアップ済みです:
- **Tailwind CSS**: ユーティリティクラスでスタイリング
- **daisyUI**: コンポーネントクラスでUI構築
- **設定ファイル**: `tailwind.config.js`, `postcss.config.js`

## 🔧 トラブルシューティング

### ポートが使用中の場合
`vite.config.js`のポート番号を変更してください:
```javascript
server: {
  port: 3001, // 別のポート番号に変更
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

このプロジェクトは、Viteの高速な開発体験とVanilla JavaScriptのシンプルさを組み合わせた、学習と開発に最適な環境です。