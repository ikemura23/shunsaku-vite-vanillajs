# Cloudflare Pages デプロイ手順

このドキュメントは、ゴルフスコア旅行ルーレットアプリをCloudflare Pagesにデプロイする手順を説明します。

## 📦 デプロイ用ファイル

- **ファイル名**: `golf-travel-roulette-deploy.zip`
- **サイズ**: 約21KB
- **場所**: プロジェクトルート

## 🚀 Cloudflare Pagesへのデプロイ手順

### 1. Cloudflare Pagesにアクセス
1. [Cloudflare Pages](https://pages.cloudflare.com/) にアクセス
2. Cloudflareアカウントでログイン（未登録の場合は新規作成）

### 2. 新しいプロジェクトを作成
1. **「Create a project」** ボタンをクリック
2. **「Upload assets」** タブを選択
3. **「Upload a new ZIP」** をクリック

### 3. ZIPファイルをアップロード
1. `golf-travel-roulette-deploy.zip` をドラッグ&ドロップまたは選択
2. **Project name** を入力（例: `golf-travel-roulette`）
3. **「Deploy site」** ボタンをクリック

### 4. デプロイ完了
- 数秒でデプロイが完了します
- `https://[project-name].pages.dev` のURLが生成されます
- カスタムドメインも設定可能です

## 🔧 更新時の手順

アプリを更新する場合は以下の手順を実行してください：

### 1. 再ビルド
```bash
npm run build
```

### 2. 新しいZIPファイル作成
```bash
cd dist
zip -r ../golf-travel-roulette-deploy.zip *
cd ..
```

### 3. Cloudflare Pagesで更新
1. Cloudflare Pagesのプロジェクトページにアクセス
2. **「Upload assets」** → **「Upload a new ZIP」**
3. 新しいZIPファイルをアップロード
4. **「Deploy site」** をクリック

## 📝 注意事項

### ファイル構造
- ZIPファイル内の構造は以下のようになっている必要があります：
```
golf-travel-roulette-deploy.zip
├── index.html
└── assets/
    ├── index-[hash].js
    ├── index-[hash].js.map
    └── index-[hash].css
```

### ドメイン設定
- デフォルトURL: `https://[project-name].pages.dev`
- カスタムドメイン設定可能
- HTTPSは自動で有効化

### パフォーマンス
- Cloudflareの高速CDNネットワークを使用
- 世界中からのアクセスが高速
- 自動キャッシュ最適化

## 🎯 デプロイ後の確認項目

デプロイ完了後、以下の項目を確認してください：

- [ ] アプリが正常に表示される
- [ ] スコア入力フォームが動作する
- [ ] ルーレットアニメーションが動作する
- [ ] 結果表示が正常に機能する
- [ ] 履歴機能が動作する（localStorage）
- [ ] レスポンシブデザインが正常に表示される
- [ ] 画像が正常に読み込まれる

## 🔍 トラブルシューティング

### よくある問題と対処法

#### 1. 404エラーが表示される
- ZIPファイル内に `index.html` がルートレベルにあることを確認
- ファイル名が正確であることを確認

#### 2. スタイルが適用されない
- CSSファイルのパスが正しいことを確認
- ビルド時にエラーが発生していないか確認

#### 3. 画像が表示されない
- 使用している画像URLがHTTPS対応であることを確認
- 外部画像サービス（Unsplash等）のアクセス制限を確認

## 📞 サポート

問題が発生した場合は以下を確認してください：

1. **ローカルでの動作確認**
   ```bash
   npm run dev
   ```

2. **ビルドエラーの確認**
   ```bash
   npm run build
   ```

3. **Cloudflare Pages ドキュメント**
   - [公式ドキュメント](https://developers.cloudflare.com/pages/)

---

**🎉 デプロイが完了すれば、世界中からゴルフスコア旅行ルーレットアプリにアクセスできるようになります！**