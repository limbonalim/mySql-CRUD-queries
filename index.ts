import express, { json } from 'express';
import cors from 'cors';
import categoryRouter from './router/Category';
import itemRouter from './router/Item';
import pointRouter from './router/Point';

const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use('/category', categoryRouter);
app.use('/item', itemRouter);
app.use('/point', pointRouter);

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});