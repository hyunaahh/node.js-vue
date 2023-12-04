<template>
    <div class = "container">
        <table class = "table">
            <caption> Total : {{ count }} </caption>  <!--전체 게시글 몇 개 ( > computed 속성 기반 연동 ) -->
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
                <tr :key="idx" v-for="(user, idx) in userList"
                @click="goToUserInfo(user.user_id)">
                    <td>{{user.user_no}} </td>
                    <td>{{user.user_id}} </td>
                    <td>{{user.user_name}} </td>
                    <td>{{user.user_gender}} </td>
                    <td>{{dateFormat(user.join_date, 'yyyy년MM월dd일')}} </td>
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
        //computed : 수정되면 안되는 data들 의미부여해서 한번 더 Wrapping! 
        computed : {
            //computed에서 관련 속성 이렇게 처리하기도 함. 그냥 배열길이 이렇게 wrapping 한거임.
            count(){
                return this.userList.length; 
            },

            date(join_date){
                return this.dateFormat(join_date);
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
            },
        
        //*UserInfo.vue랑 이어지는부분 
          goToUserInfo(id){
            console.log(id);
            //내부에 등록된 route 호출! (page가 바뀌는거니까 page 등록된  component 불러오겠따! ) 
            // router링크 사용하지않고 접근하는 방법 用
                  
                // 1번. name(path) : route로 등록할 때 사용한 name(path) 속성
                // 2번. params : REST방식. path 속성이 '/target/:id' 일 때 이렇게 값을 넘겨야함!  {'id' : 100 } 
                //          → 경로기반('미리' 경로쪽에 정의되어있어야함)으로 특정값을 가져올 때(node 방식을 route에도 사용가능)
                // 1번 or 2번 => 받는 쪽에서 차이 有

            //직접 라우터 불러옴! "$~" : 옵션 중에서 하나 불러오는거 . "객체"기반 값이 넘어감! path or name 기반으로 불러옴(index.js)
            this.$router.push({ path : '/userInfo', query : {userId : id}});  //key를 userId로 넘겨줄거임
      
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
          }

        }
    }

</script>
