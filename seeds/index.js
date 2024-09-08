const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then((res) => {
        console.log('MongoDB コネクションOK');
    })
    .catch((err) => {
        console.log('MongoDB コネクションエラー');
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

//不要になったけど記念にとっておく
const getImage = async () => {
    const config = {
        params: {
            client_id: "EVXkZDj8OSY61V5JnskvgHz1HPJ-lvEVl_cQAdkGsEY"
        }
    }

    const res = await axios.get('https://api.unsplash.com/photos/random', config);
    const imageURL = res.data.urls.regular
    console.log(imageURL);

}


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 2000) + 1000
        const image = "https://unsplash.it/630/400";
        const camp = new Campground({
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`,
            image,
            description: '大通りから二丁もつづいた。大方好くおなりなんだろう母は私が東京へ出る前からの約束であった。他は頼りにならない事になってるところなんだから。誰でも悪人になると、私は満足なのですから、学生として、また縄を解こうかと考えて、かえって変な反撥力を感じた。ええ来ました。',
            price
        })
        await camp.save();
    }

}





// const fs = require('fs');
// const test = require('./test.json');
// const data = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

// for (const key in data) {
//     console.log(key, data[key]);
// }


seedDB().then(() => {
    mongoose.connection.close();
})