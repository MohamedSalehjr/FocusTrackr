const HttpError = require('../models/http-error');
const bodyParser = require('body-parser'); 
const {validationResult} = require('express-validator')


const Dummy = [
    {creator: 'u1',
    dates: [
        { date: "2023-01-01", count: 1 },
        { date: "2023-01-22", count: 2 },
        { date: "2023-01-30", count: 3 }],
    hours: 1,
}]


const getPomoById = (req,res, next) => {
    const pomoId = req.params.pid; // {id: u1}  
    const pomo = Dummy.find( p => { 
        return p.creator === pomoId
    })

    if(!pomo){
        throw new HttpError('Could not find pomo records for the provided id', 404)
  
    } else {
        res.json({dates: pomo.dates, hours: pomo.hours})
    }

    
}


const postIntialPomo = (req, res, next) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        throw new HttpError("Invalid inputs passed", 422)
    }

    const { date, count, length, creator } = req.body

    const createdPomo = {
        creator,
        dates: [{date: date, count: count}],
        hours: length,
    }
    Dummy.push(createdPomo)
    res.status(201).json(createdPomo)
}

const patchPomoByDate = (req, res, next) => {
    const { date, length} = req.body

    const pomoId = req.params.pid

    const updatePomo = {...Dummy.find( p => p.creator === pomoId)}

    const pomoIndex = Dummy.findIndex( p => p.creator === pomoId)

    const updateCount = updatePomo.dates.find( d => d.date === date)
    updateCount.count += 1

    updatePomo.hours += 1

    Dummy[pomoIndex] = updatePomo

    res.status(200).json({pomo: updatePomo})
}

exports.getPomoById = getPomoById
exports.postIntialPomo = postIntialPomo;
exports.patchPomoByDate = patchPomoByDate
