# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code) へのガイダンスを提供します。

## プロジェクト概要
- **種類**: Vite + Vanilla JavaScript + Tailwind CSS + daisyUI ウェブアプリケーション
- **開発方針**: プロトタイプ開発がメイン - シンプルで雑でも動作することを優先
- **モジュールシステム**: ES Modules (package.jsonで`"type": "module"`を指定)
- **主要言語**: 日本語 (ドキュメントとHTMLのlang属性)
- **ビルドツール**: Vite 7.x (Rollupバンドラー使用)

## 開発コマンド
```bash
npm install          # 依存関係をインストール
npm run dev          # 開発サーバーを起動 (ポート3000、ブラウザ自動起動)
npm run build        # 本番用ビルド (dist/に出力)
npm run preview      # 本番ビルドをローカルでプレビュー
npm run deploy       # Cloudflare Pagesへデプロイ
npx wrangler pages deploy dist --project-name empathy-radio  # Wranglerコマンドでの直接デプロイ
```

## アーキテクチャとコードパターン

### ファイル構造
- `index.html` - 日本語lang属性を持つメインHTMLエントリーポイント
- `src/main.js` - ESモジュールと関数型パターンを使用するJavaScriptエントリーポイント
- `src/style.css` - ダーク/ライトモード自動切り替え機能付きメインスタイルシート
- `src/postcss.config.js` - PostCSS設定ファイル（Tailwind CSS処理用）
- `src/tailwind.config.js` - Tailwind CSS設定ファイル
- `vite.config.js` - ポート3000の開発サーバー、ソースマップ有効
- `src/` - すべてのJavaScriptファイルとCSS設定ファイルを配置するディレクトリ

### JavaScriptパターン (プロトタイプ重視)
- **シンプルなコード**: 複雑な設計パターンよりも読みやすさと速度を優先
- **ESモジュール**: 基本的な`import/export`構文のみ使用
- **直接的なDOM操作**: getElementById、addEventListener等の基本的なAPI中心
- **グローバル変数OK**: プロトタイプでは過度な抽象化を避け、必要に応じてグローバル変数も使用

### CSS機能
- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **daisyUI**: Tailwind CSS上に構築されたコンポーネントライブラリ
- **テーマシステム**: daisyUIによるダーク/ライトモード切り替え
- **レスポンシブデザイン**: Tailwindのブレークポイントシステム
- **モバイルファースト**: Tailwindのレスポンシブアプローチ

## 開発環境セットアップ
- **Node.js**: ViteとESモジュールに必須
- **ブラウザサポート**: ES6+対応のモダンブラウザ
- **ホットリロード**: ViteのHMRシステムによる自動更新

## ビルドプロセス
- **バンドラー**: Rollup (Vite経由)
- **出力**: `dist/`ディレクトリ
- **最適化**: 本番環境での自動ミニファイとアセット最適化
- **ソースマップ**: デバッグ用に有効化

## 開発ワークフロー (プロトタイプ重視)
プロトタイプ開発では以下の軽量なワークフローで進める：
0. **アイデア・案の整理** - サービス案やアイデアを`docs/idea.md`に記載（要件作成前の構想段階）
1. **簡単な要件整理** - 必要最小限の機能要件を`docs/spec.md`に記載
2. **軽い設計メモ** - 複雑なアーキテクチャは不要、基本的な構成のみ`docs/design.md`に記載
3. **シンプルなタスク** - 具体的で小さな作業単位を`docs/task.md`に記載

**重要**: APIの接続や複雑なモジュール設計は避け、とにかくシンプルに動くものを素早く作る

## ファイル配置ルール
- **JavaScriptファイル**: すべてのJSファイルは`src/`ディレクトリに配置
- **CSSファイル**: スタイルシートは`src/`ディレクトリに配置
- **設定ファイル**: PostCSS、Tailwind CSS設定は`src/`ディレクトリに配置
- **エントリーポイント**: `src/main.js`がメインエントリーポイント
- **モジュール**: 新しいJSモジュールも`src/`ディレクトリ内に作成
- **ドキュメント**: 要件書や設計書などのドキュメントは`docs/`ディレクトリに作成
- **アイデア**: サービス案やアイデアは`docs/idea.md`に記載（要件作成前の構想段階で使用）
- **仕様書**: 機能要件や仕様は`docs/spec.md`に記載
- **設計書**: アーキテクチャやシステム設計は`docs/design.md`に記載
- **作業タスク**: 作業を行う前に、作業タスクを`docs/task.md`に記載

## 特別な考慮事項
- **既存ドキュメント**: 包括的な日本語README.mdが詳細なガイダンスを提供
- **国際化**: HTMLは`lang="ja"`を使用しているが、UIテキストは現在英語
- **モジュール読み込み**: 厳密なESモジュール - CommonJS互換性なし