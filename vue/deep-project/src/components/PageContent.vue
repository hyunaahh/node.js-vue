<template>
<table>
    <tr>
        <!-- mixin -->
        {{$dateFormat('2023/12/05', 'yyyy-MM-dd')}}
    </tr>

    <tr>
        <th>제목</th>
        <td>{{ title }}</td>
        <th>조회수</th>
        <td>{{ readInfo }}</td>
    </tr>

    <tr>
        <th>작성자</th>
        <td>{{ writer }}</td>
        <th>작성일자</th>
        <td>{{ regdate }}</td>
    </tr>

    <tr>
        <th>내용</th>
        <td>{{ content }}</td>
    </tr>

    <tr>
        <button @click="updateInfo"> 업데이트 </button>
    </tr>


</table>
</template>

<script>

//import AppMixin from '../mixin.js';


export default {

    //mixins : [AppMixin], //component 개별적으로 mixin 추가하는거! 얘가 mixin이라고 알려주는거 , 여러개 믹스인파일 한꺼번에 등록하는 것도 가능(=>배열)

   // props : ['title', 'count', 'writer', 'regdate', 'content']
    props : {
        title : String, // type만 정의하려면 이렇게
        count : {
            //type뿐만 아니라 default도 같이 정할거면 {}객체로! 
            type : Number ,
            default : 0
        },
        writer : {
            type : [String, Object], //type이 두가지 다 허용될 경우 []배열로! 
            default : function(){
                return { first : 'Adward', second : 'Ian'} //object가 있어서 단순 값으로 처리안한거.
            }
        },
        regdate : {
            required : true, //무조건 들어와야하는 대상이니까. 필수 (안넘어오면 안됨)
            //validator - 만족하는지 안하는지 -> '조건'을 줘야됨.
            validator : function(value){
                //yyyy-MM-dd
                let format = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/
                return !(value.match(format) == null); // (내가 검색하고자하는 format이 없으면 null)이 아니면 맞다고처리
            }
        },
        content : String
    },

    
    computed : {
        readInfo(){
            return this.count + 1; // 자동으로 업뎃되도록 computed에
        }
    },
    
    methods : {
        //시ㅏ용자가 동작해서 이벤트가 발생해을때 emit 이용해서 변경되었단 정보를 부모한테 넘겨주는 코드. => 이벤트전달 할 때
        updateInfo(){
            //(이벤트, 데이터)
            this.$emit('update-info', this.readInfo); //이벤트이름은 html방식으로 많이 정함(대소문자구분x) 
        }
    },

    // 실시간으로 동작하는 것 처럼! 특정 값,property의 변화를 계속 사용자한테 올려야한다면.. => Data 전달
    watch : {
        radInfo(){
            this.$emit('update-info', this.readInfo);
        }
    }
}

</script>

