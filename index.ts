import express, { json } from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is work');
});

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});