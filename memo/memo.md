# Yell-Camp作成時のメモ

## Expressのミドルウェア

* ミドルウェアは、リクエスト/レスポンスのライフサイクルの中で実行されるただの関数のこと
* 各ミドルウェアは、リクエストオブジェクトとレスポンスオブジェクトにアクセスできる
* ミドルウェアは、res.send()などのメソッドでレスポンスを返してHTTPリクエストを終了させることができる
* ミドルウェアは、next()を呼び出すことで、次々と連鎖させることができる

https://expressjs.com/ja/guide/using-middleware.html


### morgan - ログ用ミドルウェア

https://www.npmjs.com/package/morgan


### nextの使い方

以下のように
expressでapp.get関数などでは第三引数まで設定することができて、
第三引数にnextの関数を設定することができる

![alt text](image.png)

use関数は他の関数実行時に必ず実行される関数だが、
以下のようにnextを書けば、次の処理が実行されるようになる
※returnは書かなくてもいいが、next()の後ろに処理を書いてしまうと、その処理が実行され、useの処理が終わらなくなってしまう。

```javascript
app.use((req, res, next) => {
    console.log('初めてのミドルウェア');
    return　next();
})
```

### app.use

https://expressjs.com/ja/4x/api.html#app.use

以下のようにルーティングを指定すると、
指定されたルートの時だけ、処理を実行することになる

```javascript
app.use('/dogs', (req, res, next) => {
    //処理
    return next()
})
```

さらに、app.useは書く位置が重要で、
よくある書き方としては、
listen()の一個上あたりに書いて、間違ったroutingが指定されているときの処理を書くことがある

```javascript
//他のget処理等の下に記載すること
app.use((req, res) => {
    res.send('ページが見つかりません')
})
```


### パスワードミドルウェア

以下のようにパスワードをチェックする用の関数を用意する
get関数はCallback関数をいくつも設定することができるため


```javascript
//パスワードミドルウェア
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    //passwordがsupersecretなら次の処理（ルートがあっていれば、ページを表示する）
    if (password === 'supersecret') {
        return next();
    }
    res.send('パスワードが必要です')
}

//パスワードチェックしてからページを表示
app.get('/secret', verifyPassword, (req, res) => {
    res.send('ここは秘密のページです！！誰にも言わないで！')
})

```


## API

### unsplash

https://unsplash.com/documentation#creating-a-developer-account


ログインしてアプリケーションのKeyを取得する
https://unsplash.com/oauth/applications/651653