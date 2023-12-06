const mysql = require('mysql'); //mysql 모듈 불러오기.
const sql = require('./db/sql.js');

//POOL : 요청이 들어오기전에 DB랑 소통함 미리 ! 
const dbPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    connectionLimit: process.env.MYSQL_LIMIT
})


//query는 비동기방식으로 진행해야함 ! 
/*
const query = async(alias, values) => { 
     new Promise((resolve, reject)=> {
        //(실제쿼리문, 넘어가는 data, 처리결과callback)
        return dbPool.query(sql[alias], values, (err, result)=> {
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result);
            }

        })
    })

};
*/

// sql 객체로 담아서 이렇게.
//(실제쿼리문, 넘어가는 data, 처리결과callback)
const query = async (table, dml, params) => { 
    return new Promise((resolve, reject)=> {
        dbPool.query(sql[table][dml], params, (err, rows)=> {
           if(err){
               console.log(err);
               reject(err);
           }else{
            console.log(rows)
               resolve(rows);
           }
       })
   })
};



module.exports = {
    query
}

