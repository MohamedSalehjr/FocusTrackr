const HttpError = require('../models/http-error');
const bodyParser = require('body-parser'); 
const {validationResult} = require('express-validator')
const mongoose = require('mongoose');
const Pomo = require('../models/pomo');
const User = require('../models/users');

const {Webhook} = require("svix")



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
        pomo = await Pomo.find({creator: pomoId});
        
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
        const payload = JSON.stringify(req.body);
        const headers = req.headers;
 
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY)
        const evt = wh.verify(payload, headers) 
        const { id } = evt.data;
        // Handle the webhook
        const eventType = evt.type;
        if (eventType === "user.created") {
          console.log(`User ${id} was ${eventType}`);
          const hours = 0
          const current = new Date();
          const today = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
          const date = today
          const time = 0
          const createdPomo = new Pomo({
            hours,
            dates: [{date:date, count: 0, time: time}],
            creator: id
        })
        await createdPomo.save()
        }
         res.status(200).json({
            success: true,
            message: 'Webhook received'
         })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const patchPomoByDate = async (req, res, next) => {
    const { date, length} = req.body

    const pomoId = req.params.pid

    let pomo;
    try {
        pomo = await Pomo.findOne({creator:pomoId});
    } catch (error) {
        const err = new HttpError("Something went wrong could not find pomo", 500)
        return next(err)
    }

    let dateObject = pomo.dates.find((d) => d.date === date)
    let arrayWithoutPassedInDate = pomo.dates.filter((d) => d.date != date)

    if(dateObject){
        
        // dateObject.count = dateObject.count + 1

        const newData = {
            count: dateObject.count + 1,
            time: dateObject.time + length
        }

        dateObject = {...dateObject, ...newData}

        console.log(arrayWithoutPassedInDate)
        let newDatesArray = arrayWithoutPassedInDate.push(dateObject)
        console.log(newDatesArray)

        // pomo.dates = newDatesArray

        // console.log(dateObject)
        
        // console.log(pomo)
    }else{
        pomo.dates.push({date: date, count: 1, time: length })
        console.log(pomo)
    }

    const newhours = pomo.hours + length

    pomo.hours = newhours
   
   
    try {
        await pomo.save()
    } catch (err) {
        const error = new HttpError("could not update pomo`", 500)
        return next(error)
    }

    res.json({pomo: pomo.toObject({getters: true})})
}

// handle case where dateobject is undefined

exports.getPomoById = getPomoById
exports.postIntialPomo = postIntialPomo;
exports.patchPomoByDate = patchPomoByDate
