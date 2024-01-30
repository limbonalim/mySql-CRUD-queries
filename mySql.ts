import mysql, {PoolOptions} from 'mysql2/promise';


const connectionOptions: PoolOptions = {
  user: 'root',
  database: 'office',
  password: 'root'
};

export const connect = mysql.createPool(connectionOptions);