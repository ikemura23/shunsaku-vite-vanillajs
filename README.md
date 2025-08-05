# AI社内カウンセラー：悩み共有ラジオ

https://76064159.empathy-radio.pages.dev/

社員が匿名でAIに相談できるチャット窓口をWeb上に提供し、OpenAI APIを活用した感情解析により「元気がないサイン」を検出するシステムです。
AIが必要と判断した場合のみ管理職へ匿名通知を送信し、声かけ対応を促進することで社内ホスピタリティスコアが向上する仕組みを備えています。
完全匿名性を保持しながら、社員の心理的安全性向上と上司の適切なサポートを両立させる革新的な職場環境改善ツールです。
このプロジェクトは、Vite + Vanilla JavaScript + Tailwind CSS + daisyUIを使用したプロトタイプ開発環境です。

## 🎯 サービス概要

**悩み共有ラジオ**は、社員の心理的安全性を向上させる AI搭載の匿名相談システムです。

### 主な機能
- **匿名チャット機能**: 社員はログインせず匿名でAIと相談可能
- **AI感情分析**: OpenAI APIを活用した会話内容の感情解析・キーワード抽出
- **エンパシー通知**: 必要な場合のみ「元気がないサイン」として上司や管理職へ通知
- **声かけインセンティブ**: 通知を受けた管理職の声かけ対応で「社内ホスピタリティスコア」が向上
- **簡易ダッシュボード**: 部門別の状況を可視化する管理画面

### 特徴
- 完全匿名性でプライバシーを保護
- 会話ログは保存されず、個人特定不可
- 心理的ハードルを下げる「ラジオ」というゆるいネーミング
- 上司の声かけが評価対象となる逆転構造

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