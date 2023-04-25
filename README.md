# 概要

1. Notion とウェブサイトを提携する
1. Notion のデータベースを引っ張ってきてサイトに登録する
1. スタートボタンを押してフラッシュカード開始
1. このときドラッグ、フリックでカードを動かせたら最高
1. 結果を表示
1. Notion データベースのそれぞれの単語のチェックボックス欄に結果を反映

# 使用予定技術

## フレームワーク

- Next.js
  いろいろ準備するのめんどくさいから

## UI フレームワーク

- Material UI
  スタイル組むのめんどいから
  （特にこだわりないため要相談、時間が許すなら Tailwind, Sass, CSS Modules を検討したい）

## アニメーションライブラリ

- Framer Motion
  多分使う

## 開発環境

- TypeScript
- Prettier

## デプロイ先

- Vercel

# 分担

一方が Notion 提携
もう一方がフラッシュカード

# Notion 提携側

## データフェッチ

1. ルートにおいて getServersideProps でデータベースの値を fetch してくる
1. データベースの値をグローバルコンテキストにセット

## データ更新

1. 下のデータモデルの出力のようなデータが request の body として与えられる
1. `/api/page/`にリクエストが投げられる
1. ページ ID のチェックボックスを request の body の通りにセットする
1. notion から更新後のデータベースの値を返す
1. クライアントサイドで変更させる

# データモデル

入力

```json
{
  [
    {
      "page_id": 'hoge',
      "checkbox": false,
      "name": "word1"
    },
    {
      "page_id": 'fuga',
      "checkbox": false,
      "name": "word2"
    }
  ...
  ]
}
```

出力

```json
{
  [
    {
      "page_id": 'hoge',
      "checkbox": true,
      "name": "word1",
    },
    {
      "page_id": 'fuga',
      "checkbox": false,
      "name": "word2"
    }
  ...
  ]
}
```
