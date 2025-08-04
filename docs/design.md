# 設計メモ (プロトタイプ用)

**方針**: プロトタイプなので複雑なアーキテクチャやAPI設計は不要。シンプルで素早く作れる構成を優先。

## 基本構成
- 使用技術: Vite + Vanilla JS + HTML + Tailwind CSS + daisyUI
- ファイル構成: シンプルなフラット構造

## UI/スタイリング
- Tailwind CSS: ユーティリティファーストCSSフレームワーク
- daisyUI: Tailwind CSS上に構築されたコンポーネントライブラリ
- レスポンシブデザイン対応

## データ管理
- グローバル変数やlocalStorageを使用
- 複雑な状態管理ライブラリは使わない

## コードの方針
- 直感的で読みやすいコード
- 過度な抜象化やパターンは使わない
- getElementById, addEventListener等の基本的なDOM API中心

## メモ
- 技術選定理由やトレードオフなど