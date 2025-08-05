# デプロイガイド

このドキュメントでは、Cloudflare Pagesを使用したデプロイ方法について説明します。

## 前提条件

- Node.jsがインストールされていること
- Cloudflareアカウントを持っていること

## デプロイ手順

### 1. 本番用ビルドの作成

```bash
npm run build
```

このコマンドにより、`dist/`ディレクトリに本番用ファイルが生成されます。

### 2. デプロイの実行

#### npmスクリプト経由（推奨）

```bash
npm run deploy
```

このコマンドでビルドとデプロイが一括実行されます。

#### Wranglerコマンド直接実行

```bash
npx wrangler pages deploy dist --project-name empathy-radio
```

このコマンドで直接デプロイを実行できます。プロジェクト名を指定してデプロイします。

デプロイ完了後、コンソールに表示されるURLを確認し、README.mdのライブデモURLを更新してください。

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

## デプロイ後の作業

### URLの取得と更新

デプロイ完了後、以下のコマンドで最新のデプロイURLを取得できます：

```bash
wrangler pages deployment list --project-name=your-project-name | head -n 2
```

または、デプロイ時のコンソール出力に表示されるURLを確認し、README.mdの「ライブデモ」セクションを更新してください。

### README.mdの更新例

```markdown
## ライブデモ

🚀 [ライブデモを見る](https://your-project-name.pages.dev)
```