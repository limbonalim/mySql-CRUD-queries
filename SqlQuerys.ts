import connectionDb from './mySql';
import { IData, IQueryPutOptions } from './types';

export const queryPut = (options: IQueryPutOptions, id: string, data:  IData,) => {
  if (data.name && data.description) {
    return connectionDb.getConnection().query(options.nameAndDescription, [data.name, data.description, id]);
  } else if (data.description) {
    return connectionDb.getConnection().query(options.description, [data.description, id]);
  } else if (data.name) {
    return connectionDb.getConnection().query(options.name, [data.name, id]);
  }
};