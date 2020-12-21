
const express = require('express');
const app = express()
const subscriberModel = require('./models/subscribers');

// Your code goes here
app.get('/subscribers', async(req,res) => {
    res.send(await subscriberModel.find());
});

// using js
// app.get('/subscribers/names', async(req,res) => {
//     const Result = await subscriberModel.find();
//     const mappedResult = Result.map(doc => {
//         return {
//             name: doc.name,
//             subscribedChannel: doc.subscribedChannel
//         }
//     });
//     res.send(mappedResult);
// });

// using projection db
app.get('/subscribers/names', async(req,res) => {
    const projectionResult = await subscriberModel.find().select({
        // inclusive projection
        // name: true,
        // subscribedChannel: true,

        // exclusive projection
        _id: false, //neeed to explicitly excluded
        subscribedDate: false,
        __v: false
    });
    res.send(projectionResult);
});

app.get("/subscribers/:id", async(req,res) => {
    const idSearch = req.params.id;
    try {
        const doc = await subscriberModel.findOne({ _id: idSearch});
        if(doc == null) {
            res.status(400).send({message: "Id not found"})
        } else {
            res.send(doc);
        }
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})




















module.exports = app;
