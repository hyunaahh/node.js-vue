//EXPRESS SERVER  기본세팅! 
require('dotenv').config({path:'./db/mysql.env'}); //환경변수! 제일 처음에 써야 함! 
const express = require('express'); //추가된 express module 불러오기
const app = express(); //동작할 instance 만들어줌
const mysql = require('./db.js'); //exports가 반환하는 객체 그 자체! => mysql.query로 받는 이유! 

//REST방식 - express가 제공하는 json parser 추가! (별도 middleware 필요하다면 use 메소드 활용하기!)
app.use(express.json({
    limit : '50mb'
}));

//서버가 실행될 떄 어던 포트로 실행될지 - listen : 서버실행! 
app.listen(3000, ()=> {
    console.log('Server start!, http://localhost:3000')
});

//부서조회
app.get('/dept', async (req, res)=>{
    let list = await mysql.query('dept','list');
    res.send(list);
})

//전체조회
app.get('/emps', async (req, res)=>{
    let list = await mysql.query('emp','empList');
    res.send(list);
})

// 개별조회
app.get('/emps/:emp_no', async (req, res)=>{
    let data = req.params.emp_no;
    //select는 돌아오는게 무조건 배열! => 한건만 넘어오니까 idx 0번
    let list = await mysql.query('emp','empInfo', data); 
    res.send(list[0]);
})

// 등록 - *******
const empTable = ['emp_no', 'first_name', 'last_name', 'gender', 'hire_date']
const deptTable = ['emp_no', 'dept_no', 'from_date', 'to_date']
const salaryTable = ['emp_no', 'salary', 'from_date', 'to_date']
//↑ 쿼리문순서랑 같게 해야함! <- 값으로 넘어가는 형태는 주의하기! 

app.post('/emps', async(req, res)=> {

    let empInfo = req.body.param;

    let empData = {}; // insert할 떈 "객체"가 넘어가야함! set=?절에 어떤 col에 어떤 값이 들어가는지 미정.
    //let empData = { 'emp_no' : empInfo.emp_no}; 이 방법도 가능 but 공백일 경우 제거 불가.
    for (let column of empTable){  // let column = 'emp_no'
        let value =  empInfo[column]; // let value = empInfo['emp_no']
         if(value == '') continue; // 공백들어올거 check 하기 위함. (필수x)
        empData[column] = value; // 새로운 바구니(객체로)에 데이터 옮기는 작업. empData['emp_no']
    }

    let result = await mysql.query('emp','empInsert', empData);
    

    
     let deptEmpData = []; //set절에 어느 컬럼을 업뎃할지 정해져있어서 배열! column정보가 넘어갈 필요가 없으니까!!!!! - 배열길이 = 물음표길이 이상(넘치면 나머지는 버림)
     for(let column of deptTable){
        let value = empInfo[column];
        if(value == '') continue;
        deptEmpData.push(value);
     }
     result = await mysql.query('empDept','insert', deptEmpData);
     


     let salData = {};
     for(let column of salaryTable){
        let value = empInfo[column];
        if(value == '') continue;
        salData[column] = value;
     }
     salData.to_date = '9999-01-01' //쿼리문에 위에껄아 다르게 todate 없음. 변수로 그 값 넘겨줘야함
     result = await mysql.query('salaries','insert', salData);

     res.send(result); //결과 통신에 보내! 
     // res.end(); 웬만하면 안쓰는게 좋음.. 통신은 끊기지만 사용자는 ?!됨 
})

// OBJECT기준 : 물음표 하나 봤을떄 column이 명시되어있는지?! 아니면 일반 값으로 넘어가면 됨.
// express => db로 넘겨주는 형태가 달라짐! 
//수정, 삭제 : 배열 - ? 하나 아니면 배열임! (물음표 개수기준-2개이상 배열) 

//수정
app.put('/emps/:emp_no', async(req, res)=> {

    let datas = [req.body.param, req.params.emp_no];

    let result = await mysql.query('emp','empUpdate', datas);
    res.send(result);
})


//삭제 - ** 원래 delete는 body 없음!(get을 확장한 개념이라서) 
// BUT express와 같은 일부 framework는 delete- body 허용! 

//기능적으로 delete니까  method가 delete임!(화면입장에서!) 기능적인거랑 상관X
app.delete('/emps/:emp_no', async(req, res)=> {

    let datas = [req.body.param.to_date, req.params.emp_no];
    let result = await mysql.query('empDept','update', datas);

    res.send(result);
    
})