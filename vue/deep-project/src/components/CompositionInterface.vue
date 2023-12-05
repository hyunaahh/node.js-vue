<template>
    <div>
        <h3>{{title}}</h3>
        <p>저자 : {{author.name}}</p>
        <template v-if="isWrited">
            <p :key="idx" v-for="(info, idx) in author.books">
                {{info}}
            </p>
        </template>
        <p v-else> 아직 출간한 책이 없습니다. </p>
        <button @click="plusBookInfo">정보 업데이트</button>

    </div>
</template>



<script setup>
//script에 setup 붙여줌! 

import {reactive, ref, computed, watch} from 'vue' //함수불러오고! 

// data option : reactive(반응형 data를 만드는 역할-객체or배열형태로 넣어주면 변경된사항 읽어들여서 data(){return { author : {}}} property에 정의된거처럼 동작함! )
//               , ref
// computed  옵션 : computed
// watch 옵션 : watch
// methods 옵션 : 없음! 특정함수호출 x just 함수로 내부에 선언만 하면 됨.

//composition에서 property 선언하는 법 
const author = reactive({
    name : 'John Doe',
    books : [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
});


const title = ref('제목을 입력해주세요'); //단일값은 ref를 이용해서 선언해야 함! 접근은 title.value 이런식으로 선언


//computed : 함수! -> 콜백함수로 넘겨줌. 
const isWrited = computed (()=>{
                            return author. books.length > 0 ? 'Yes' : 'No';
                        });         

//watch(감시하고자하는 대상, callback) 
watch(author.books, (info)=>{
    console.log(info[info.legnth-1]);
});

//함수- methods 안쓰고 이렇게 선언하면 됨.
const plusBookInfo = ()=>{
    let info = 'Node.js - Javascript Runtime'
    author.books.push(info);
}


</script>