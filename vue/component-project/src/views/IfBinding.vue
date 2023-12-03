<template>
    <div>
        <input type="number" v-model="grade">
        <p v-if="grade >=90 ">성적 : A </p>
        <p v-else-if="grade >= 80"> 성적 : B </p>
        <p v-else-if= "grade >= 70">성적 : C </p>
        <!-- <p>=========</p> ☆ 이렇게 if 중간에 다른 tag 들어갈 수 없다! -->
        <p v-else> 성적 : D </p>
    <hr>
    <input type="checkbox" v-model="chData"> 선택
    <p v-show="chData"> Hello world! </p>
    </div>
</template>



<script>

    export default {
        data(){
            return {
                grade : '',
                chData : ''
            }
        }

    }

</script>
