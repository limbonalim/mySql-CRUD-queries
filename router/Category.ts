import { Router } from 'express';
import { connect } from '../mySql';

const categoryRouter = Router();

interface IData {
  name: string | null;
  description: string | null;
}

const getById = async (id: string) => {
  const querySelect = `SELECT * FROM categories WHERE id = '${id}'`;
  const [result, _] = await connect.query(querySelect);
  return result;
};

categoryRouter.get('/', async (req, res) => {
  try {
    const querySelect = `SELECT * FROM categories`;
    const [result, _] = await connect.query(querySelect);

    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

categoryRouter.get('/:id', async (req, res) => {
  try {
    if (!parseInt(req.params.id)) {
      res.status(400).send('invalid id');
      throw new Error('invalid id');
    }
    const result = await getById(req.params.id);

    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

categoryRouter.post('/', async (req, res) => {
  try {
    const postData: IData = {
      name: req.body.name,
      description: req.body.description ? req.body.description : null
    };

    if (postData.name) {
      const queryPost = `INSERT INTO categories (name, description) VALUES ('${postData.name}', '${postData.description}')`;
      const querySelect = `SELECT * FROM categories WHERE name = '${postData.name}' AND description = '${postData.description}'`;
      await connect.query(queryPost);
      const [result, _] = await connect.query(querySelect);
      res.status(201).send(result);
    } else {
      res.status(400).send('the name must be in the request');
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

categoryRouter.delete('/:id', async (req, res) => {
  try {
    if (!parseInt(req.params.id)) {
      res.status(400).send('invalid id');
      throw new Error('invalid id');
    }

    const queryDelete = `DELETE FROM categories WHERE id = ${req.params.id}`;
    await connect.query(queryDelete);
    res.status(200).send(`ID: ${req.params.id} was been deleted`);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

categoryRouter.put('/:id', async (req, res) => {
  try {
    if (!parseInt(req.params.id)) {
      res.status(400).send('invalid id');
      throw new Error('invalid id');
    }

    const putData: IData = {
      name: req.body.name ? req.body.name : null,
      description: req.body.description ? req.body.description : null
    };

    if (putData.name && putData.description) {
      const queryPut = `UPDATE categories SET name = '${putData.name}', description = '${putData.description}' WHERE id = ${req.params.id}`;
      await connect.query(queryPut);
      const result = await getById(req.params.id);
      res.send(result);
    } else if (putData.description) {
      const queryPut = `UPDATE categories SET description = '${putData.description}' WHERE id = ${req.params.id}`;
      await connect.query(queryPut);
      const result = await getById(req.params.id);
      res.send(result);
    } else if (putData.name) {
      const queryPut = `UPDATE categories SET name = '${putData.name}' WHERE id = ${req.params.id}`;
      await connect.query(queryPut);
      const result = await getById(req.params.id);
      res.send(result);
    } else {
      res.status(400).send('Not have data for update or not valid data');
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

export default categoryRouter;