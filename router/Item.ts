import { Router } from 'express';

const itemRouter = Router();

itemRouter.get('/', (req, res) => {
  res.send(`items`)
});

itemRouter.get('/:id', (req, res) => {
  res.send(`item ${req.params.id}`)
});

itemRouter.post('/', (req, res) => {
  res.send(`item post`)
});

itemRouter.delete('/:id', (req, res) => {
  res.send(`item delete ${req.params.id}`)
});

itemRouter.put('/:id', (req, res) => {
  res.send(`item put ${req.params.id}`)
});

export default itemRouter;