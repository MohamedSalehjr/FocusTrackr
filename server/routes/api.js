const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Dummy = [
    {creator: 'u1',
    dates: [
        { date: "2023-01-01", count: 1 },
        { date: "2023-01-22", count: 2 },
        { date: "2023-01-30", count: 3 }],
    hours: 1,
    id: "p1"
}

]

router.get('/:pid', (req,res, next) => {
    const pomoId = req.params.pid; // {id: u1}  
    const pomo = Dummy.find( p => { 
        return p.creator === pomoId
    })

    if(!pomo){
        
    } else {
        res.json({dates: pomo.dates, hours: pomo.hours})
    }

    
})


// Post request when a pomodoro is completed 
/*
- For someones intial creation of a pomodoro
*/
router.post('/:pid', (req, res, next) => {
    const { date, count, length, creator } = req.body

    const createdPomo = {
        creator,
        dates: [{date: date, count: count}],
        hours: length,
    }
    Dummy.push(createdPomo)
    res.status(201).json(createdPomo)
})

//Patch Request

router.patch('/:pid', (req, res, next) => {
    const { date, length} = req.body

    const userId = req.params.uid

    const updatePomo = {...Dummy.find( u => u.creator === userId)}

    const pomoIndex = Dummy.findIndex( p => p.creator === userId)

    const updateCount = updatePomo.dates.find( d => d.date === date)
    updateCount.count += 1

    updatePomo.hours += 1

    Dummy[pomoIndex] = updatePomo

    res.status(200).json({pomo: updatePomo})
})

module.exports = router;


//For future projects use MVC structure so have routes in one file and controllers aka the logic in another file
