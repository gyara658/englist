# backend
  Englishlistのバックエンド

# セットアップ
  ```
  $ docker-compose build
  $ docker-compose up -d
  $ docker-compose run api rails db:create
  $ docker-compose run api rails db:migrate
  $ docker-compose run api rails db:seed
  ```
