const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    hours: {
        type: Number,
    },
    creator: {
        type: String
    },
    email: {
        type: String
    }
    // pomo: {type: mongoose.Types.ObjectId, ref: 'Pomo'}
})



// const Dummy = [
//     {creator: 'u1',
//     dates: [
//         { date: "2023-01-01", count: 1 },
//         { date: "2023-01-22", count: 2 },
//         { date: "2023-01-30", count: 3 }],
//     hours: 1,
// }]

module.exports = mongoose.model('User', userSchema);