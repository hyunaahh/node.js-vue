<!-- pagetitle.vue의 "부모"COMPONENT -->

<template>
    <div>
        <PageTitle title="Hello, world!"/> 
            <!-- *숫자로 넘기려면 v-bind로 넘겨야함 이거 안쓰니까 10+1=101 됐음-->
        <!-- <PageContent :title="header" v-bind:count="10" 
                                            :writer="['Adward']" 
                                            :regdate="'2023-12-05'" 
                                            :content="{first : 'Node.js', second : 'Vue.js'}"/>  -->
        <PageContent v-bind="info" @update-info="handler" /> <!--bind directive로 바로 부여!, @emit이 넘겨준 이벤트 함수로 처리 --> 
        <RefCom ref="child"/>
        <button  @click ="childHandler">자식제어</button> <!-- 자식 component가 아닌 일반 html tag에도 ref 속성 사용 가능-->
    </div>
</template>

<script>
//PropsComponent.vue

import PageTitle from './PageTitle.vue'
import PageContent  from './PageContent.vue'
import RefCom from './RefComponent.vue'

export default {

    data(){
        return{
        header : '',
        //info : 객체형태로 , 필드명은 자식component의 prop에 정의되어있어야함. 이름 일치하게! 
        info : {
            title : 'Today is',
            count : 10,
            writer : 'Adward',
            regdate : '2023-12-05',
            content : '내용 없음'

        }
        }
    },

    components : {
        //자식
        PageTitle, 
        PageContent,
        RefCom
    },

    methods : {
        //매개변수로 특정 data 넘어옴
        handler(value){
            alert(value);
        },

        //ref
        childHandler(){
        //$refs.접근하고자하는대상.중 content -property로 접근안하고 ref로 직접 접근하는게 됨.
           // this.$refs.child.content = 100;
            //this.$refs.child.content = '부모가 보내는 데이터';

            //this.$refs.child.plusCount(); //내부 함수(여기없고 자식한테 있는애)에 대해서도 직접 접근 가능
                //200나오는 이유는 같이 동작해서 그럼.. (
            this.$refs.child.$refs.cBtn.click(); //객체~~로 계속 타고타고 들어가는 구조
        }
    }
}
</script>
