<template>
    <div class = "container">
        <div class = "row">
            <table class = " table">
                <tr>
                    <th class="text-right table primary">EmpNo</th>
                    <td class="text-center"></td>
                    <input type="text" v-model= "empInfo.emp_no ">
                </tr>

                <tr>
                    <th class="text-right table primary">Name</th>
                    <td class="text-center"></td>
                    <input type="text" v-model= "empInfo.first_name ">
                </tr>

                <tr>
                    <th class="text-right table primary">Gender</th>
                    <td class="text-center"></td>
                    <input type="radio" value="M" v-model="empInfo.gender"> 남자
                    <input type="radio" value="F" v-model="empInfo.gender"> 여자
                </tr>

                <tr>
                    <th class="text-right table primary">Salary</th>
                    <td class="text-center"></td>
                    <input type="number" v-model="empInfo.salary">
                </tr>

                <tr>
                    <th class="text-right table primary">DeptNo</th>
                    <td class="text-center"></td>
                    <input type="text" v-model="empInfo.dept_no">
                </tr>

                <tr>
                    <th class="text-right table primary">DeptName</th>
                    <td class="text-center"></td>
                    <input type="text" v-model="empInfo.dept_name">
                </tr>
            </table>
        </div>

        <div class="row">
            <button class="btn btn-success" @click = "insertInfo"> 저장 </button>
            <button class="btn btn-success" @click = "updateInfo"> 수정 </button>
        </div>
    </div>

</template>




<script>
import axios from 'axios'

export default {
    data(){
        return {
            empInfo : {
                
                first_name : '',
                gender : null,
                salary : 0,
                dept_no : 0,
                dept_name : ''
            }
        }
    },

    created(){
        
    },

    methods : {
        async insertInfo(){

            let data = {
                "param" : this.empInfo
            };

            let result = await axios.post(`/api/emps/`, data)
                        .catch( err => console.log(err));

                //this.insertInfo = result.data;
                    console.log(result.data);

                if(result.data.insertId == 0){
                    alert(`등록되지 않았습니다. \n 메세지체크 plz \n ${result.data.message}`);
                }else{
                     alert(`등록 success! ${result.data.insertId }`);
                }
        },

        async updateInfo(){
            let data = {
                "param" : this.empInfo,
            };

            let result = await axios.put(`/api/emps/${this.empInfo.emp_no}`, data)
                            .catch( err => console.log(err));

            if(result.data.changedRows == 0){
                alert(`수정되지 않았습니다. \n 메세지를 확인해주세요 \n ${result.data.message}`)
            }else{
                alert (`정상적으로 수정되었습니다.`);
            }
        }


    }

}


</script>
