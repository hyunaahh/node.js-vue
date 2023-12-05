<template>

  <layout>

    <template v-slot:header>
        <h1>팝업제목</h1> <!-- slot을 대체하는거, 필요에따라 component 재사용함  -->
    </template>   

    <template v-slot:default>
        <p>팝업컨텐츠 1</p>
        <p>팝업컨텐츠 2</p>
    </template>    

    <template v-slot:footer>
        <button type="button"> 닫기 </button>
    </template>    

  </layout>

</template>

<script>

    import layout from './ModalLayout.vue'

    export default {
        components : {
            layout
        }
    }

</script>

<style>

</style>