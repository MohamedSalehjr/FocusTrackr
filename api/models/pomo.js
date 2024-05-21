const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pomoSchema = new Schema({
    hours: {
        type: Number,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    count: {
        type: Number,

    },
    date: {
        type: String,

    },
})


// const Dummy = [
//     {creator: 'u1',
//     dates: [
//         { date: "2023-01-01", count: 1 },
//         { date: "2023-01-22", count: 2 },
//         { date: "2023-01-30", count: 3 }],
//     hours: 1,
// }]

module.exports = mongoose.model('Pomo', pomoSchema);