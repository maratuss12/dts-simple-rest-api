import express from 'express';
import Homework from './database.js';
const router = express.Router();

//create new homework
//POST /api/homeworks
router.post('/homeworks', async(req, res) =>{
    try {
        const { course, title, due_date, status } = req.body;
        const homework = new Homework({
            course,
            title,
            due_date,
            status,
        });

        const createdHomework = await homework.save();

        res.status(201).json(createdHomework);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});


//desc Get all homeworks
//route GET /api/homeworks
//404 datanya tidak ada
router.get('/homeworks', async(req, res) => {
    const homeworks = await Homework.find({});

    if(homeworks && homeworks.length !==0){
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        });
    }
});

//desc Get a homework
//route GET /api/homeworks/:id
router.get('/homeworks/:id', async(req, res) => {
    const homework = await Homework.findById(req.params.id);

    if(homework){
        res.json(homework)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
});

//desc Update a homework
//route PUT /api/homeworks/:id
router.put('/homeworks/:id', async(req, res) => {

    const { course, title, due_date, status } = req.body;
    const homework = await Homework.findById(req.params.id);

    if(homework)
    {
        homework.course = course;
        homework.title = title;
        homework.due_date = due_date;
        homework.status = status;

        const updatedHomework = await homework.save();
        res.json(updatedHomework);
    }  else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
});

//desc Delete a homework
//route DELETE /api/homeworks/:id
router.delete('/homeworks/:id', async(req, res) => {

    const homework = await Homework.findById(req.params.id);

    if(homework)
    {
        await homework.remove();
        res.json({
            message: 'Data removed'
        });
    }  else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
});

//desc Delete all homework
//route DELETE /api/homeworks/:id
router.delete('/homeworks', async(req, res) => {

    const homeworks = await Homework.find();

    if(homeworks && homeworks.length !==0){
        await Homework.remove();
        res.json({
            message: 'All data removed!'
        })
    } else {
        res.status(404).json({
            message: 'Homework not found'
        });
    }
});

export default router;