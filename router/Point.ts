import { Router } from 'express';
import { IData, IQueryPutOptions } from '../types';
import connectionDb from '../mySql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { queryPut } from '../SqlQuerys';

const pointRouter = Router();

const querySelectById = 'SELECT * FROM points WHERE id = ?';
const queryAllSelect = 'SELECT * FROM points';
const queryPost = `INSERT INTO points (name, description) VALUES (?, ?)`;
const queryDelete = `DELETE FROM points WHERE id = ?`;
const queryPutOptions: IQueryPutOptions = {
  nameAndDescription: 'UPDATE points SET name = ?, description = ?  WHERE id = ?',
  description: 'UPDATE points SET description = ?  WHERE id = ?',
  name: 'UPDATE points SET name = ?  WHERE id = ?'
};

pointRouter.get('/', async (req, res, next) => {
  try {
    const [result] = await connectionDb.getConnection().query(queryAllSelect);

    res.send(result);
  } catch (e) {
    next(e);
  }
});

pointRouter.get('/:id', async (req, res, next) => {
  try {
    if (!parseInt(req.params.id)) {
      return res.status(400).send({error: 'invalid id'});
    }

    const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];

    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }

    res.send(result[0]);
  } catch (e) {
    next(e);
  }
});

pointRouter.post('/', async (req, res, next) => {
  try {
    const postData: IData = {
      name: req.body.name,
      description: req.body.description ? req.body.description : null
    };

    if (postData.name) {
      const [result] = await connectionDb.getConnection().query(queryPost, [postData.name, postData.description]) as ResultSetHeader[];

      res.status(201).send({
        id: result.insertId,
        ...postData
      });
    } else {
      res.status(400).send('the name must be in the request');
    }
  } catch (e) {
    next(e);
  }
});

pointRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!parseInt(req.params.id)) {
      return res.status(400).send({error: 'invalid id'});
    }

    const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];

    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }

    const [_] = await connectionDb.getConnection().query(queryDelete, [req.params.id]) as ResultSetHeader[];
    res.status(200).send(`ID: ${req.params.id} was been deleted`);
  } catch (e) {
    next(e);
  }
});

pointRouter.put('/:id', async (req, res, next) => {
  try {
    if (!parseInt(req.params.id)) {
      return res.status(400).send({error: 'invalid id'});
    }
    const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];
    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }

    const putData: IData = {
      name: req.body.name ? req.body.name : null,
      description: req.body.description ? req.body.description : null
    };

    if (putData.name || putData.description) {
      await queryPut(queryPutOptions, req.params.id, putData);
      const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];
      res.send(result[0]);
    } else {
      res.status(400).send('Not have data for update or not valid data');
    }
  } catch (e) {
    next(e);
  }
});

export default pointRouter;
