const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then((res) => {
        console.log('MongoDB コネクションOK');
    })
    .catch((err) => {
        console.log('MongoDB コネクションエラー');
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('common'));
app.use((req, res, next) => {
    console.log('初めてのミドルウェア');
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

// 一覧表示
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

// 新規作成画面表示
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

// 詳細画面表示
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})

//　新規登録時
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

//編集画面表示
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
})

// 編集時
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${id}`);
})

//削除時
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
})


app.listen(port, () => {
    console.log(`ポート:${port}でリクエスト待ち受け中`)
})