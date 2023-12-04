<template>
    <div class= "container">

        <div class="row">
            <table class="table">      

                    <tr>
                    <th class="text-right table primary">No</th>
                        <td class="text-center">
                            <input type="text" v-model="userInfo.user_no" readonly>
                        </td>
                   
                    </tr>    

                <tr>
                    <th class="text-right table primary">ID</th>
                    <td class="text-center">
                    <input type="text" v-model="userInfo.user_id" readonly>
                    </td>
                   
                </tr>

                <tr>
                    <th class="text-right table primary">Pwd</th>
                    <td class="text-center">
                    <input type="password" v-model="userInfo.user_pwd">
                    </td>
                </tr>

                <tr>
                    <th class="text-right table primary">Name</th>
                    <td class="text-center">
                    <input type="text" v-model="userInfo.user_name">
                    </td>
                </tr>

                <tr>
                    <th class="text-right table primary">Gender</th>
                    <td class="text-center">                    
                    <input type="radio" value="M" v-model="userInfo.user_gender">남자
                    <input type="radio" value="F" v-model="userInfo.user_gender">여자
                    </td>
                </tr>

                <tr>
                    <th class="text-right table primary">Age</th>
                    <td class="text-center">
                    <input type="number" v-model="userInfo.user_age">
                    </td>
                </tr>

                <tr>
                    <th class="text-right table primary">JoinDate</th>
                    <td class="text-center">
                    <input type="date" v-model="userInfo.join_date">
                    </td>
                </tr>

            </table>
        </div>


        <div class="row">
            <button class="btn btn-success" @click="updateInfo">저장</button>         
        </div>  
    </div>
</template>

<script>
import axios from 'axios'

export default {

    data(){
        return {
            searchNo: '',
            userInfo : {
                "user_pwd" : '',
                "user_name" : '',
                "user_gender" : '',
                "user_age" : 0,
                "join_date " : ''
            }
        }
    },
    
    created () {
        this.searchNo = this.$route.query.userId; //이 component를 실행할 route로 접근! 
        this.getUserInfo();

        //this.updateInfo();
      
        
    },

    methods : {
        
        async getUserInfo(){
            let result = await axios.get(`/api/users/${this.searchNo}`)
                                .catch((err) => console.log(err));
                this.userInfo = result.data;

                //날짜 변형시켜야지 input에 date가 출력됨
                let newDate = this.dateFormat(this.userInfo.join_date, 'yyyy-MM-dd'); //내부에있는건 this붙여서 불러오라
                this.userInfo.join_date = newDate;
        },

        dateFormat(value, format){
            //joinDate format 바꾸기
            //yyyy년 MM월 dd일
            let date = new Date(value);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth()+1)).slice(-2); // 두 자리로 출력하고자 한다면 
            let day = ('0' + date.getDate()).slice(-2);

            // -를 쓰든 / 쓰든 
            let result = format.replace('yyyy', year)
                                .replace('MM', month)
                                .replace('dd', day);

            //return  `${year}년 ${month}월 ${day}일`;
            return result;
          },

       
         async updateInfo(){
            //insertInfo와 비슷! 
            let data = {
                "param" : this.userInfo,
            };
        
           let result =  await axios.put(`/api/users/${this.userInfo.user_id}`, data) 
            .catch((err) => console.log(err));
           
                console.log(result.data);

            if(result.data.changedRows == 0){
                alert(`수정되지 않았습니다. \n 메세지를 확인해주세요 \n ${result.data.message}`)
            }else{
                alert (`정상적으로 수정되었습니다.`);
            }
        }

 
    }

} //e.d



</script>
