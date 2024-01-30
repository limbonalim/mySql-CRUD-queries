import { connect } from './mySql';

export const querySelectById = (table: string, id: string) => `SELECT * FROM ${table} WHERE id = '${id}'`;
export const querySelectByData = (table: string, name: string, description: string ) => `SELECT * FROM ${table} WHERE name = '${name}' AND description = '${description}'`;
export const queryAllSelect = (table: string) => `SELECT * FROM ${table}`;
export const queryPostData = (table: string, name: string, description: string) => `INSERT INTO ${table} (name, description) VALUES ('${name}', '${description}')`;
export const queryDelete = (table: string, id: string) => `DELETE FROM ${table} WHERE id = ${id}`;
export const queryPutAll = (table: string, id: string,  name: string, description: string) => `UPDATE ${table} SET name = '${name}', description = '${description}' WHERE id = ${id}`;
export const queryPutDescription = (table: string, id: string, description: string) => `UPDATE ${table} SET description = '${description}' WHERE id = ${id}`;
export const queryPutName = (table: string, id: string,  name: string) => `UPDATE ${table} SET name = '${name}' WHERE id = ${id}`;

export const getById = async (table: string, id: string) => {
  const [result, _] = await connect.query(querySelectById(table, id));
  return result;
};