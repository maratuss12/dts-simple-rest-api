import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router.js';

const app = express();

mongoose.connect(process.env.MONGODB_URI,
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

const PORT = process.env.PORT || '4000';

app.listen(PORT, () => {
console.log(`App listens on port ${PORT}`)
});