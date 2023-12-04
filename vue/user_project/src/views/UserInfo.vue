<!-- UserInfo.vue -->

<template>

    <div class= "container">

        <div class="row">
            <table class="table">
                
                <tr>
                    <th class="text-right table primary">No.</th>
                    <td class="text-center">{{ userInfo.user_no}}</td>
                </tr>

                <tr>
                    <th class="text-right table primary">ID</th>
                    <td class="text-center">{{ userInfo.user_id}}</td>
                </tr>

                <tr>
                    <th class="text-right table primary">Pwd</th>
                    <td class="text-center">{{ userInfo.user_pwd}}</td>
                </tr>

                <tr>
                    <th class="text-right table primary">Name</th>
                    <td class="text-center">{{ userInfo.user_name }}</td>
                </tr>

                <tr>
                    <th class="text-right table primary">Gender</th>
                    <td class="text-center">{{ userInfo.user_gender}}</td>
                </tr>

                <tr>
                    <th class="text-right table primary">Age</th>
                    <td class="text-center">{{  userGender}}</td>
                </tr>

                <tr>
                    <th class="text-right table primary">JoinDate</th>
                    <td class="text-center">{{ joinDate }}</td>
                </tr>

            </table>
        </div>


        <div class="row">
            <button class="btn btn-info" @click="goToUpdate(userInfo.user_id)">수정</button>
            <router-link  to="/" class="btn btn-success">목록</router-link> <!-- a 말고 button기반으로 tag -->
            <button @click="deleteInfo(userInfo.user_id)" class="btn btn-warning">삭제</button> <!-- 삭제는 router랑 상관 X -->
        </div>

    </div>

</template>



<script>

 import axios from 'axios';


export default{

    data(){
        return{
            searchNo : '', //라우터가 넘겨받을 property 값도 필요하니까(요청값 라우터 통해서 받아올거임)
            userInfo: {} 
        }
    },

    computed : {
        userGender(){
            return this.userInfo.user_gender == 'M' ? '남' : '여';
        },

        joinDate(){
            let date = new Date(this.userInfo.join_date);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth()+1)).slice(-2); // 두 자리로 출력하고자 한다면 
            let day = ('0' + date.getDate()).slice(-2);

            return  `${year} - ${month} - ${day}`;
        }
    },

    
    created(){
        this.searchNo = this.$route.query.userId; //라우터통해서 호출들어오면 라우트가 동작함.
        this.getUserInfo();
    },

    methods : {
       async getUserInfo(){
            let result = await axios.get(`/api/users/${this.searchNo}`)
                                    .catch(err => console.log(err));
            //result는 객체로 넘어옴! -> 필요한 걸 직접 요청하면 됨. 
            this.userInfo = result.data;
        },

        async deleteInfo(userId){
            let result = await axios.delete(`api/users/${userId}`)
                                    .catch(err=>console.log(err));

            console.log(result.data);

            let count = result.data.affectedRows;
            if( count == 0) {
                alert('정상적으로 삭제되지 않았습니다.');
            }else{
                alert('정상적으로 삭제되었습니다. ');
                this.$router.push({name : 'userList'}); //redirect 효과! name(선택), path(필수값) 쓸 수 있음 (route에 등록된거! index.js)
            }
            },

             goToUpdate(id){
                this.$router.push({path : '/userUpdate', query : {userId : id}}) //page를 요청할때는 router, page가 열릴땐 route
             }
        }
    


} //export default
</script>
