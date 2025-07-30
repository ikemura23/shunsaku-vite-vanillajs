# Vite + Vanilla JS プロジェクト

このプロジェクトは、ViteとVanilla JavaScriptを使用したモダンなWeb開発環境です。

## 💼 アプリケーション機能

**会議雰囲気スコア測定システム** - リアルタイムで会議の雰囲気を可視化するWebアプリケーション

### 主な機能
- **📊 リアルタイム測定**: 会議参加者の声の感情と表情を継続的にスコア化
- **👥 参加者管理**: 複数の参加者を個別に追跡・表示
- **🌈 全体雰囲気メーター**: 参加者全体の雰囲気を統合したスコア表示
- **⏱️ 経過時間トラッキング**: 会議の進行時間をリアルタイム表示
- **📋 結果レポート**: 会議終了後の詳細な分析結果（グレード、統計、個人別結果）
- **🔄 測定の再開始**: いつでも新しい測定セッションを開始可能

### 測定項目
- **🎤 声の感情スコア**: 参加者の発言における感情の豊かさ
- **😊 表情スコア**: 参加者の表情の明るさ・積極性
- **🏆 総合グレード**: S〜Dランクでの会議品質評価

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
開発サーバーが起動し、ブラウザが自動的に開きます（http://localhost:3000）。

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