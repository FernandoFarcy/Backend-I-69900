import express from 'express';
import userRouter from  './routes/user.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users',userRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`server ok en puerto ${PORT}`))