import { Router } from 'express';
import { connect } from '../mySql';
import {
  getById,
  queryAllSelect,
  queryDelete,
  queryPostData,
  queryPutAll,
  queryPutDescription, queryPutName,
  querySelectByData
} from '../SqlQuerys';
import { IData } from '../types';
import { tables } from '../constants';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
  try {
    const [result, _] = await connect.query(queryAllSelect(tables.Category));

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
    const result = await getById(tables.Category, req.params.id);

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
      await connect.query(queryPostData(tables.Category, postData.name, postData.description || ''));
      const [result, _] = await connect.query(querySelectByData(tables.Category, postData.name, postData.description || ''));
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

    await connect.query(queryDelete(tables.Category, req.params.id));
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
      await connect.query(queryPutAll(tables.Category, req.params.id, putData.name, putData.description));
      const result = await getById(tables.Category, req.params.id);
      res.send(result);
    } else if (putData.description) {
      await connect.query(queryPutDescription(tables.Category, req.params.id, putData.description));
      const result = await getById(tables.Category, req.params.id);
      res.send(result);
    } else if (putData.name) {
      await connect.query(queryPutName(tables.Category, req.params.id, putData.name));
      const result = await getById(tables.Category, req.params.id);
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