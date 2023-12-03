<template>
    <div>
        <h1> {{ title + '!!!' }} </h1> <!-- template 문법: 태그 사이에 이중 중괄호 쓰면 {{ javascript 영역이 된다! }, 가벼운 연산 표기 하기 좋음-->
        <h2 v-bind:name="'sample'" v-text="title" /> <!-- v-text 속성(단방향)에 접근하는 고유 directive , property랑 연관시키는 거에서 끝! // 나머지 속성은 v-bind:name="''" -->
        <p v-html = "tagList"/> <!-- (*주의) html tag 직접 제어하는 v-html : tag(<strong>)인식하게 할려면 얘 써야함. ex)회원가입 비번입력 오류날때 사용-->
        <p v-text = "tagList"/>

        <hr>
        <!-- model directive (**type 주의깊게보기!)-->
        <input type="text" v-model="valueModel">
        <p>{{ typeof valueModel }} </p>
        <input type="number" v-model.lazy="numberModel" > <!-- type=number로 정의만 해주면 수식어(v-model.number) 안붙여도 숫자로 처리 됨 -->
        <!-- <input v-model.number="numberModel"> -->
        <p>{{ 10000 + numberModel }} </p>
        <select v-model="selectModel"> 
            <option value="summer">여름</option> 
            <option value="winter">겨울</option>
        </select>
        <p>{{ selectModel }}</p>
        <textarea v-model="textModel"/> <!-- 지가 이미 출력 하는애니까 -->

        <hr>
        <!-- checkbox, radio : checked! -->
        <!-- 한 건 -->
        <input type="checkbox" v-model="chData" true-value="여" false-value="부">
        <p> {{ chData }} </p>
        <!-- 여러 건 -->
        <div>
            <input type="checkbox" value="서울" v-model="city">서울
            <input type="checkbox" value="대구" v-model="city">대구
            <p> {{city}}</p>
        </div>

        <div>
            <input type="radio" value="독서" v-model="hobby"> 독서
            <input type="radio" value="영화" v-model="hobby"> 영화
            <input type="radio" value="운동" v-model="hobby"> 운동
            <p> {{ hobby}} </p>
        </div>

        <hr>
        <!-- bind directive : property가 연결되면서 변수값 받을 수 있음. -->
        <img v-bind:style="styleData" v-bind:src="imgUrl"> <!-- style값 기본 base type : "OBJECT" 형태! -->
        <!-- <img v-bind:style="[backSetting, addStyle]" v-bind:src="imgUrl">  이방식 권장x -->

        <!-- class는 다중값 허용 => bind directive : 선택여부에따라 바뀌어야하는 거에 씀 -->
        <div class="container" v-bind:class="{'active' : isActive, 'text-red': hasError}">  Class Binding First </div>  
        <div class="container" v-bind:class="myClass"> Class Binding Second </div> <!-- 사용빈도수 ↓ - class값 자체가 change 될때 사용 -->
    </div>
</template>


<script>
    //이 component 객체 생성 - 이 파일 실행하면 내보내고자하는 대상 정의. =>  이 안에 component 속성 정의함
    export default {
        //data : return 타입 "객체"로!  ( & 함수 기반 정의(return전에 작업가능!) )
        data(){
            return {
                //사용하고자하는 변수 정의하면 됨! 
                title : 'Hello, Vue.js', //초기값 줘도되고 안줘도 되고( null, 공백도 가능! )
                tagList : '<strong>Today is ... </strong>',
                valueModel : 'Korea',
                numberModel : 0,
                selectModel : 'winter', //공백주면 암껏도 선택 안되고 첫번쨰 옵션이 display됨
                textModel : 'textarea',
                chData : '',
                city : [], // check박스 '여러 건' 일 때 : 여러개가 선택될수도 있어서 => 초기값을 "배열"로 줘야함! 
                hobby : '', // radio는 하나만 선택되니까 배열아님! 
                imgUrl : 'https:/kr.vuejs.org/images/logo.png', //경로 
                styleData : {
                    // ** -(하이픈) 사용안함 ! → camel 표기법 쓰기~
                    backgroundColor : 'skyblue', 
                    width : '200px'
                },

                // backSetting : 'background-color:skyblue; width:200px;', //t스타일값 문자로 집어넣은거
                // addStyle : 'height:200px;',

                isActive : false,
                //hasError : !this.isActive // 처음 vue가 만들어질때 값을 선언할 때 isActive 값을 복제하겠단 의미! 내부에 있는 property나 함수 불러올때는 객체값 불러오는거기떄문에 this 써줘야함! 
                myClass : 'active'

            }
        },

        //연관된 data를 할 때 computed 씀! 내부속성변경되면 같이 돈다. 단순 초기값줄때x 연결성 有
        computed : {
            //계속 변경하면서 return 하겠다! 
            hasError(){
                return !this.isActive ;
            }
        }

    }
</script>


<style scoped>

    .container {
        width : 100%;
        height : 200%;
    }

    .active {
        background-color : yellow;
        font-weight : bold;
    }

    .text-red {
        color: red;
    }

</style>