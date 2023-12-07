<template>
  <div>
    <table class = "table">
        <caption> Total : {{count}} </caption>
        <thead>
            <tr>
                <th> empNo </th>
                <th> Name</th>
                <th> Hire Date</th>
      
                <th> Dept Name</th>
            </tr>
        </thead>

        <tbody>
            <tr :key="idx" v-for="(emp, idx) in empList" 
            @click="goToEmpInfo(emp.emp_no)">
                <td> {{emp.emp_no}}</td>
                <td> {{`${emp.first_name}, ${emp.last_name}`}}</td>
                <td> {{$dateFormat(emp.hire_date, 'yyyy-MM-dd')}}</td>
          
                <td> {{emp.dept_name}}</td>
            </tr>
        </tbody>
    </table>
  </div>  

</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            empList : []
        }
    },

    computed : {
        count(){
            return this.empList.length;
        }
    },

    //현재 page 열자마자 보여야하기 때문에 CREATED
    created(){
        this.getEmpList();
    },

    methods : {
        async getEmpList(){
            //★ 경로! vue는 자체적으로 db와 연결서버  없으니까 그 기능가진애랑 연결! + CORS도 같이 처리해달라고 devserver에 요청!
            let list = await axios.get('/api/emps')
                        .catch(err =>  console.log(err));
            let result = list.data;
            this.empList = result;

            console.log(result);
        },

        goToEmpInfo(empNo){
            //이름이 ~인 라우터 호출! 라우터: site 내에서 페이지 전환!
            this.$router.push({path : 'empInfo', query : {empNo : empNo}});
        },

    


    }
}

</script>
