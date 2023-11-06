const HttpError = require('../models/http-error');
const bodyParser = require('body-parser'); 
const {validationResult} = require('express-validator')
const mongoose = require('mongoose');
const Pomo = require('../models/pomo');
const User = require('../models/users');



// const Dummy = [
//     {creator: 'u1',
//     dates: [
//         { date: "2023-01-01", count: 1 },
//         { date: "2023-01-22", count: 2 },
//         { date: "2023-01-30", count: 3 }],
//     hours: 1,
// }]


const getPomoById = async (req,res, next) => {
    const pomoId = req.params.pid; // {id: u1}  

    let pomo;
    try {
        pomo = await Pomo.find({email: pomoId});
    
        console.log(pomo[0].hours)
        
    } catch (error) {
        const err = new HttpError("Something went wrong could not find pomo", 500)
        return next(err)
    }

    if(!pomo){
        const error = new HttpError('Could not find pomo records for the provided id', 404)
        return next(error)
    } else {
        res.json({pomo: pomo.map(pomo => pomo.toObject({getters:true}))})
    }

    
}


const postIntialPomo = async (req, res, next) => {

    // const { date, hours, email, creator } = req.body

    // const createdPomo = new Pomo({
    //     email,
    //     hours,
    //     dates: [{date:date, count: 1}],
    //     creator
    // })

    // let user;
    // try {
    //     user = await User.findById(creator)
        
    // } catch (err) {
    //     const error = new HttpError('Could not find user', 500)
    //     return next(error)
    // }

    // if(!user){
    //     const error = new HttpError('Could not find user', 404)
    //     return next(error)
    // }

    // try {
    //     const sesh = await mongoose.startSession()
    //     sesh.startTransaction();
    //     await createdPomo.save({session:sesh})
    //     user.pomo = createdPomo
    //     await user.save({session:sesh})
    //     await sesh.commitTransaction()
    // } catch (error) {
    //     const err = new HttpError(
    //         'creating inital pomo document failed', 500
    //     )
    //     return next(err)
    // }
    // res.status(201).json(createdPomo)
    try {
        const payload = req.body;
        const headers = req.headers;
        
        // Replace process.env.CLERK_WEBHOOK_SECRET_KEY with your actual secret key
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payload.toString(), headers);
        const id = evt.data.id;
        
        // Handle the webhook
        const eventType = evt.type;
        if (eventType === 'user.created') {
            console.log(`User ${id} was ${eventType}`);
        }
        
        res.status(200).json({
            success: true,
            message: 'Webhook received'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

const patchPomoByDate = async (req, res, next) => {
    const { date, length} = req.body

    const pomoId = req.params.pid


    let pomo;
    try {
        pomo = await Pomo.findById(pomoId);
    } catch (error) {
        const err = new HttpError("Something went wrong could not find pomo", 500)
        return next(err)
    }

    // let pomoDatesArray = pomo[0].dates;
    // let dateObject = pomoDatesArray.find((d) => d.date === '2023-01-01')
    // const updateCount = dateObject.count
    const newhours = pomo.hours + length
    console.log(newhours)
    pomo.hours = newhours
   
    const dateObject =  pomo.dates.find((d) => d.date === date)

    dateObject.count += 1


    try {
        await pomo.save()
    } catch (err) {
        const error = new HttpError("could not update pomo`", 500)
        return next(error)
    }

    res.json({pomo: pomo.toObject({getters: true})})
}

exports.getPomoById = getPomoById
exports.postIntialPomo = postIntialPomo;
exports.patchPomoByDate = patchPomoByDate
