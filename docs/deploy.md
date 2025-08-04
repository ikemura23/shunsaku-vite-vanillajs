# デプロイガイド

このドキュメントでは、Cloudflare Pagesを使用したデプロイ方法について説明します。

## 前提条件

- Node.jsがインストールされていること
- Cloudflareアカウントを持っていること
- Wranglerがインストールされていること（なければ`npm install -g wrangler`でインストール）

## デプロイ手順

### 1. 本番用ビルドの作成

```bash
npm run build
```

このコマンドにより、`dist/`ディレクトリに本番用ファイルが生成されます。

### 2. デプロイの実行

```bash
npx wrangler pages deploy dist
```

このコマンド一つでCloudflare Pagesにデプロイが完了します。

### 3. 初回デプロイ時の設定

初回デプロイ時にはプロジェクト名の設定が求められる場合があります。適切な名前を入力してください。

## 注意事項

- デプロイ前に必ず`npm run build`でビルドを実行してください
- `dist/`ディレクトリが存在し、ビルドファイルが含まれていることを確認してください
- Cloudflareアカウントにログインしていることを確認してください（`wrangler auth login`）

## トラブルシューティング

### ログインが必要な場合

```bash
wrangler auth login
```

### プロジェクト情報の確認

```bash
wrangler pages project list
```

### デプロイ履歴の確認

```bash
wrangler pages deployment list
```