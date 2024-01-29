import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
  res.send('category')
});

categoryRouter.get('/:id', (req, res) => {
  res.send(`category ${req.params.id}`)
});

categoryRouter.post('/', (req, res) => {
  res.send(`category post`)
});

categoryRouter.delete('/:id', (req, res) => {
  res.send(`category delete ${req.params.id}`)
});

categoryRouter.put('/:id', (req, res) => {
  res.send(`category put ${req.params.id}`)
});

export default categoryRouter;