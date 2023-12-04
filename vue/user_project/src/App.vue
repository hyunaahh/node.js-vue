<template>
<div>
  <Header /> <!-- component에 등록된 이름 그대로 tag처럼 씀 -->
  <router-view />
</div>
</template>

<script>
import Header from './layouts/Header.vue'

export default {
  components : {
    Header //키랑 값이 같을 땐 생략해서 표현함 Header : Header(변수가 값이면서 key값)
  }
}
</script>


