<template>
    
    <div class= "container">

        <div class="row">
            <table class="table">          

                <tr>
                    <th class="text-right table primary">ID</th>
                    <td class="text-center"></td>
                    <input type="text" v-model="userInfo.user_id">
                </tr>

                <tr>
                    <th class="text-right table primary">Pwd</th>
                    <td class="text-center"></td>
                    <input type="password" v-model="userInfo.user_pwd">
                </tr>

                <tr>
                    <th class="text-right table primary">Name</th>
                    <td class="text-center"></td>
                    <input type="text" v-model="userInfo.user_name">
                </tr>

                <tr>
                    <th class="text-right table primary">Gender</th>
                    <td class="text-center"></td>                    
                    <input type="radio" value="M" v-model="userInfo.user_gender">남자
                    <input type="radio" value="F" v-model="userInfo.user_gender">여자
                </tr>

                <tr>
                    <th class="text-right table primary">Age</th>
                    <td class="text-center"></td>
                    <input type="number" v-model="userInfo.user_age">
                </tr>

                <tr>
                    <th class="text-right table primary">JoinDate</th>
                    <td class="text-center"></td>
                    <!-- input type이 date 일때 "하이픈"만 인식함! 속성에 맞춰서 포맷 따라줘야함! -->
                    <input type="date" v-model="userInfo.join_date">

                </tr>

            </table>
        </div>


        <div class="row">
            <button class="btn btn-success" @click="insertInfo">저장</button>         
        </div>  
    </div>
</template>

<script>


import axios from 'axios';

export default {

    data(){
        return {
            // 데이터담는 대상! 객체, server -> db 바로 보내기때문에 필드명이랑 일치하게 해야함! 
            // not null 조건 - 초기값에 공백주면 공백넣어도 넘어가지만... but... gender나 date는.. 
            userInfo : { 
                user_id : '',
                user_pwd : '',
                user_name : null, 
                user_gender : null,
                user_age : 0,
                join_date : null
            }
        }
    },

    created(){
        //날짜 초기값 주기
        this.userInfo.join_date = this.getToday();

    },
    
    methods : {

        async insertInfo(){
            if(!this.validation()) return; // 이조건일때 뒤에꺼 진행안시키려고!  ! 없으면 if문 안에 다 담으면 되지만...

            let data = {
                //param 이라는 키에 userInfo가 들어가는거! (* postman 참고! )
                "param" : this.userInfo
            };
        
           let result =  await axios.post(`/api/users`, data) 
            .catch((err) => console.log(err));
           
                console.log(result.data);

            if(result.data.insertId == 0){
                alert(`등록되지 않았습니다. \n 메세지를 확인해주세요 \n ${result.data.message}`)
            }else{
                alert (`정상적으로 등록되었습니다.\nNo.${result.data.insertId}`);
            }
        },

        getToday(){
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth()+1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);

            return `${year}-${month}-${day}`;
        },

        //유효성check
        validation(){

                if(this.userInfo.user_id == ''){
                    alert(`아이디가 입력되지 않았습니다.`);
                    return false;
                }

                if(this.userInfo.user_pwd == ''){
                    alert(`비밀번호가 입력되지 않았습니다.`);
                    return false;
                }

            return true;

        }



    } //m


/*
★★ [1번] 방법이 DEFAULT ! 외워라현아야.. 
            json 보낼땐 원래 'fetch' 사용할 때처럼! (axios 는 json 자동변환이라서 위에도 되는거임! )
    [1번] 명시하는 쪽 
`    let result 
        = await axios(`/api/users`, JSON.stringify(data), {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : JSON.stringify(data)
        })
        .catch((err) => console.log(err));`

    [2번] - axios의 지원기능이라서.. 
    result = await axios.post(`/api/users`, data); 

*/  



}//e.d

</script>
