import { Router } from 'express';

const pointRouter = Router();

pointRouter.get('/', (req, res) => {
  res.send('points')
});

pointRouter.get('/:id', (req, res) => {
  res.send(`point ${req.params.id}`)
});

pointRouter.post('/', (req, res) => {
  res.send(`point post`)
});

pointRouter.delete('/:id', (req, res) => {
  res.send(`point delete ${req.params.id}`)
});

pointRouter.put('/:id', (req, res) => {
  res.send(`point put ${req.params.id}`)
});

export default pointRouter;
