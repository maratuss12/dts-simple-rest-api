import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router.js';

const app = express();

mongoose.connect('mongodb+srv://admin:admin@digitalent.hpf1j.mongodb.net/jadwalin?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log('Connect to db success say')
}).catch(err => {
    console.log('Connect to db failed bos!!!');
    console.log(err)
})

// connectDB();

//connect to db tanpa pengecekan credential
// mongoose.connect('mongodb+srv://admin:admin@digitalent.hpf1j.mongodb.net/jadwalin?retryWrites=true&w=majority',
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }, 
// () => {
//     console.log('Connect to db success');
// });

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routers
app.get('/', (req, res) => {
    res.json({
        message: 'success',
    });
})

//untuk memanggil router.js
app.use('/api', router);

app.listen('3000', () => {
    console.log('App listens on port 3000')
});