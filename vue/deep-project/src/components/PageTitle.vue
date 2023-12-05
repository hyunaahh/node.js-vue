<!-- PropsComponent 자식COMPONENT : 부모가 넘겨준 title 출력 -->

<template>
    <h2>{{title}}</h2>
</template>

<script>
//PageTitle.vue
    export default {
        props : ['title'] // props : 배열형태 - 부모가 넘겨주는 data 걍 그대로 받겠다. (default)
    }
</script>
