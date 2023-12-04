<template>
    <div class = "container">
        <table class = "table">
            <thead>
                <tr>
                    <th> No. </th>
                    <th> ID </th>
                    <th> 이름 </th>
                    <th> 성별 </th>
                    <th> 가입 날짜 </th>
                </tr>
            </thead>

            <tbody>
                <tr :key="idx" v-for="(user, idx) in userList">
                    <td>{{user.user_no}} </td>
                    <td>{{user.user_id}} </td>
                    <td>{{user.user_name}} </td>
                    <td>{{user.user_gender}} </td>
                    <td>{{user.join_date}} </td>

                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script>
    import axios from 'axios';

    export default {
        data(){
            return{
                userList : [] // list니까 배열로!  기본타입 구분하기! - 초기값 타입 알려주기! 
            }
        },
        
        computed : {
            //computed에서 관련 속성 이렇게 처리하기도 함. 그냥 배열길이 이렇게 wrapping 한거임.
            count(){
                return this.userList.length; 
            }
        },

        //component가 생성되면서 dom으로 mount 되기 전에 created 기반으로 ajax를 돌려야함
        created(){
            //해당 component가 처음부터 데이터를 들고있어야하는 순간 created를 쓴다! => 컴포넌트가 초기화할 data관련 진행!  
            this.getUserList(); // this가 붙어야지 내부에서 검색한다고?
        },
        
        methods : { 
            //통신을 일으키기! -비동기통신이라 async  await 쓰럭임
            async getUserList(){
                let list = (await axios.get('/api/users') //module 가진 애가 axios => 통신의 결과를 객체로 받아옴 **vue.coonfig.js에서 proxy설정 보기1 
                                    .catch(err => {
                                        console.log(err);
                                    })).data; //axios가 실행한 결과는 객체고! > 그 객체안에서의  "data값"만 필요하니까! 
                
                //let result = await axios.get('http://localhost:3000/users')
               // .catch(err => {
                //     console.log(err);
                //     })
                //let list = result.data;

                this.userList = list;
            }
        }
    }

</script>
