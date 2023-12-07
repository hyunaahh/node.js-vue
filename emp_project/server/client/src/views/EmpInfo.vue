<template>
    <div class = "container" >
        <div class= "row">
            <table class = "table">
                <tr>
                    <th class="text-right table primary"> EmpNo</th>
                    <td class="text-center"> {{empInfo.emp_no}} </td>
                </tr>

                 <tr>
                    <th class="text-right table primary"> Name </th>
                    <td class="text-center"> {{`${empInfo.first_name}, ${empInfo.last_name}`}} </td>
                </tr>

                <tr>
                    <th class="text-right table primary"> Gender </th>
                    <td class="text-center"> {{ empInfo.gender}} </td>
                </tr>

                 <tr>
                    <th class="text-right table primary"> Hire Date </th>
                    <td class="text-center"> {{ $dateFormat(empInfo.hire_date, 'yyyy-MM-dd')}} </td>
                </tr>

               

                 <tr>
                    <th class="text-right table primary"> Salary </th>
                    <td class="text-center"> {{empInfo.salary }} </td>
                </tr>

                 <tr>
                    <th class="text-right table primary"> DeptNo</th>
                    <td class="text-center"> {{empInfo.dept_no }} </td>
                </tr>

                 <tr>
                    <th class="text-right table primary"> DeptName</th>
                    <td class="text-center"> {{empInfo.dept_name}} </td>
                </tr>


            </table>
        </div>

    <div class="row">
        <button class="btn btn-info" @click="goToUpdate(empInfo.emp_no)"> 수정</button>
        <router-link to="/empList" class="btn btn-success">List</router-link>
        <button class="btn btn-warning" @click="deleteInfo(empInfo.emp_no)"> 삭제 </button>
    </div>

    </div>
</template>

<script>
import axios from 'axios'; 

export default {
    data (){
        return{
            empInfo : {},
            searchNo : '' //
        }
    },

    created() {
        this.searchNo = this.$route.query.empNo;
        this.getEmpInfo();
    },

    computed : {
        userGender(){
            return this.empInfo.gender == 'M' ? '남' : '여';
        }
    },

    methods : {
        async getEmpInfo(){
            let result = await axios.get(`/api/emps/${this.searchNo}`)
                            .catch(err => console.log(err));
            let info = result.data;            
            this.empInfo = info;
            console.log('info' + info);
        },

        async goToUpdate(){
            this.$router.push({path:'/empForm', query : {empNo : empNo}})
        },

    //퇴사 일자 입력받아야하는 부분.. (ex. 모달창, alert창 띄워서 입력받으면 됨)
         async deleteInfo(empNo){
            //서버측에 요청할떄랑 같은 모습으로 넘기기! 

            let input = prompt('퇴사일자를 입력해주세요', this.$dateFormat('yyyy-mm-dd','yyyy-MM-dd'));

            let data = {
                param : {
                    to_date : this.input
                }
            }

            let result = await axios.delete(`/api/emps/${empNo}`, { data : this.to_date
             })
                            .catch(err => console.log(err));

            let count = result.data.affectedRows;
            if( count == 0) {
                alert('정상적으로 삭제되지 않았습니다.');
            }else{
                alert('정상적으로 삭제되었습니다. ');
                this.$router.push({name : 'userList'}); 
            }
        }
    }
}

</script>
