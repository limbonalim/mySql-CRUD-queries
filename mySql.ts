import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
let connection: Connection;

const connectionOptions: ConnectionOptions = {
  user: 'root',
  database: 'office',
  password: 'root'
};

const connectionDb = {
  async init () {
    connection = await mysql.createConnection(connectionOptions);
  },
  getConnection() {
    return connection;
  }
}

export default connectionDb;