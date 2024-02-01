import { Router } from 'express';
import connectionDb from '../mySql';
import {IItemData} from '../types';
import {RowDataPacket, ResultSetHeader} from 'mysql2';
import {imagesUpload} from '../multer';

const itemRouter = Router();

const queryAllSelect = 'SELECT i.id, i.name, p.name AS point, i.image, i.description, c.name AS category FROM items i' +
  ' LEFT JOIN categories c ON i.category = c.id LEFT JOIN points p ON i.point = p.id';
const querySelectById = 'SELECT i.id, i.name, p.name AS point, i.image, i.description, c.name AS category FROM items i' +
  ' LEFT JOIN categories c ON i.category = c.id LEFT JOIN points p ON i.point = p.id WHERE i.id = ?';
const queryDelete = 'DELETE FROM items WHERE id = ?';
const queryPost = 'INSERT INTO items (name, category, point, image, description) VALUES (?, (SELECT id FROM categories WHERE name = ?), (SELECT id FROM points WHERE name = ?), ?, ?)';

const queryPutName = (id: string, name: string) => connectionDb.getConnection().query('UPDATE items SET name = ? WHERE id = ?', [name, id]);
const queryPutDescription = (id: string, description: string) => connectionDb.getConnection().query('UPDATE items SET description = ? WHERE id = ?', [description, id]);
const queryPutCategory = (id: string, category: string) => connectionDb.getConnection().query('UPDATE items SET category = (SELECT id FROM categories WHERE name = ?) WHERE id = ?', [category, id]);
const queryPutPoint = (id: string, point: string) => connectionDb.getConnection().query('UPDATE items SET point = (SELECT id FROM points WHERE name = ?) WHERE id = ?', [point, id]);
const queryPutImage = (id: string, image: string) => connectionDb.getConnection().query('UPDATE items SET image = ? WHERE id = ?', [image, id]);

itemRouter.get('/', async (req, res, next) => {
  try {
    const [result] = await connectionDb.getConnection().query(queryAllSelect);

    res.send(result);
  } catch (e) {
    next(e);
  }
});

itemRouter.get('/:id', async (req, res, next) => {
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

itemRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const postData: IItemData = {
      name: req.body.name,
      description: req.body.description ? req.body.description : null,
      category: req.body.category,
      point: req.body.point,
      image: req.file ? `images/${req.file.filename}` : null
    };

    if (postData.name && postData.category && postData.point) {
      const [result] = await connectionDb.getConnection().query(queryPost, [postData.name, postData.category, postData.point, postData.image, postData.description]) as ResultSetHeader[];

      res.status(201).send({
        id: result.insertId,
        ...postData
      });
    } else {
      res.status(400).send('the name, categpry, point must be in the request');
    }
  } catch (e) {
    next(e)
  }
});

itemRouter.delete('/:id', async (req, res, next) => {
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

itemRouter.put('/:id', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!parseInt(req.params.id)) {
      return res.status(400).send({error: 'invalid id'});
    }
    const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];
    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }

    const putData: IItemData = {
      name: req.body.name,
      description: req.body.description ? req.body.description : null,
      category: req.body.category,
      point: req.body.point,
      image: req.file ? `images/${req.file.filename}` : null
    };

    if (putData.name || putData.description || putData.category || putData.point || putData.image) {
      if (putData.name) {
        queryPutName(req.params.id, putData.name);
      }
      if (putData.description) {
        queryPutDescription(req.params.id, putData.description);
      }
      if (putData.category) {
        queryPutCategory(req.params.id, putData.category);
      }
      if (putData.point) {
        queryPutPoint(req.params.id, putData.point);
      }
      if (putData.image) {
        queryPutImage(req.params.id, putData.image);
      }

      const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];
      res.send(result[0]);
    } else {
      res.status(400).send('Not have data for update or not valid data');
    }
  } catch (e) {
    next(e);
  }
});

export default itemRouter;