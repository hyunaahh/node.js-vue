require('dotenv').config({path:'./db/mysql.env'});
const express = require('express');
const app = express();
const mysql = require('./db.js')

app.use(express.json({
    limit : '50mb'
}));

app.listen(3000, ()=>{
    console.log('server start!')
})


//* 나중에 proxy 설정해주기. 

//전체조회
app.get('/board', async(req, res)=> {
    let list = await mysql.query('boardList');
    res.send(list);
})


//개별조회
app.get('/board/:no', async(req, res)=> {
    let data = req.params.no;
    let list = await mysql.query('boardInfo', data);
    res.send(list[0]);
})

//등록
app.post('/board', async(req, res)=> {
    let data = req.body.param;
    let result = await mysql.query('boardInsert', data);
    res.send(result);
})

//수정
app.put('/board/:no', async(req, res)=> {
    let datas = [req.body.param, req,params.no];
    let result = await mysql.query('boardUpdate', datas);
    res.send(result);
})


//댓글 전체조회
app.put('/reply', async(req, res)=>{
    let list = await mysql.query('replyList');
    res.send(list);
});

 
// //삭제
// app.put('/board/:no', async(req, res)=> {
//     let data = req.params.no;
//     let result = await mysql.query('boardDelete', data);
//     res.send(result);
// })