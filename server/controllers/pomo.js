const HttpError = require('../models/http-error');
const bodyParser = require('body-parser'); 
const {validationResult} = require('express-validator')
const Pomo = require('../models/pomo');


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

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        throw new HttpError("Invalid inputs passed", 422)
    }

    const { date, hours, creator } = req.body

    const createdPomo = new Pomo({
        creator,
        hours,
        dates: [{date:date, count: 1}]
    })
    try {
        
        await createdPomo.save()
    } catch (error) {
        const err = new HttpError(
            'creating inital pomo document failed', 500
        )
        return next(err)
    }
    res.status(201).json(createdPomo)
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
