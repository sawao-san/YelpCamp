const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('YelpCamp');
})

app.listen(port, () => {
    console.log(`ポート:${port}でリクエスト待ち受け中`)
})