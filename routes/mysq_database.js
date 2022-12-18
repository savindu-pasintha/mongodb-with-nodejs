const mysql = require("mysql");
const { promise_abc } = require("./js advanced theories");
const DBHostType = {
  local: {
    host: "35.225.36.177",
    type: "localhost",
    DBName: "test_db1",
    user: "root",
    password: "0768755787Sa",
    port: 3306,
    url: "https://www.db4free.net/phpMyAdmin/"

  },
  online: {
    type: "db4free.net",
    DBName: "dbsavindu",
    user: "savindu",
    pass: "19990524"
  }
}

const MySqlQueryExecute = (SQL_Query_as_STRING) => {
  return new Promise((resolve, reject) => {
    const mysql_connection = mysql.createConnection({
      host: DBHostType.local.host,
      port: DBHostType.local.port,
      user: DBHostType.local.user,
      password: DBHostType.local.password,
      database: DBHostType.local.DBName
    });
    mysql_connection.connect((err) => {
      if (err) {// console.log({ Connecting_Id: err.stack });//return;
        reject(err);
        mysql_connection.end();
      }
      else {
        //console.log({ Connected_Thread_Id: mysql_connection.threadId });
        mysql_connection.query(SQL_Query_as_STRING, (err, result) => {
          if (err) {
            //console.log({ Error: err });//return err;
            reject(err);
            mysql_connection.end();
          } else {
            //console.log({ Result: result }); //return { 'result': result };
            resolve(result);
            mysql_connection.end();
          }
        });
      }
    });
  });

}

module.exports = { QueryExecute: async (sql_query) => { return await MySqlQueryExecute(sql_query); } };
/*Other file const {QueryExecute} =  require('./mysq_database');
QueryExecute("CREATE TABLE user (id INT.name VARCHAR(255), address VARCHAR(255))")
.then((res)=>{console.log(res);})
.catch((err)=>(throw err;))
var pool = mysql.createPool({
  connectionLimit: 10,
  port: DBHostType.local.port,
  user: DBHostType.local.user,
  password: DBHostType.local.password,
  database: DBHostType.local.DBName
});
var userTable = "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT,email VARCHAR(255) NOT NULL,password VARCHAR(255),PRIMARY KEY (id))"
    
*/