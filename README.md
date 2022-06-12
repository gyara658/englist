# englist
# README

#1, タイトルと概要、URL
  * Englishlist
    英単語学習のためのアプリです。

    NGSL(一般的な英文に含まれる単語の９２％を学べる2800語の英単語帳)
    NAWL(学術的な英文に含まれる単語の９割を学べる英単語帳)
    TSL(TOEICの英文に含まれる単語の９割を学べる英単語帳)

    _参考サイト_
    http://www.newgeneralservicelist.org/

    1.上記単語リストを学習することができます
    2.上記単語リストから覚えたい単語をリスト化することができます。


#2, 操作画面GIF
  <br />
  ![Englishlist_01](https://user-images.githubusercontent.com/49307752/172863271-592bf4b0-bf28-49e9-8ce1-8549656b83e9.gif)
  <br />

#3, 使用技術
  ## バックエンド
  * Ruby 2.7.3
  * Ruby on Rails 6.0.3（APIモード）
  * MySQL8
  * docker,docker-compose

  ## フロントエンド
  * React
  * Material-UI
  * ReactCardFlip


#4, 機能、非機能一覧
  * ユーザー登録,ログイン機能(devise)
  * 画像投稿(carrierwave/MiniMagick)
  * リスト追加
  * テストデータ投入(http://www.newgeneralservicelist.org/)
