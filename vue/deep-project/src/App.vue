<template>
  <div>
    <input type="text" v-model.lazy="selected" v-focus="isFocused"/>
    <component v-bind:is="selected"></component> <!-- component 태그 : 자식 component에 대해서 지정하는거 , is: component 중에 하나를 불러옴.. -->
  </div>
</template>



<script>
import PropsCom from './components/PropsComponent.vue'
import SlotCom from './components/TextModal.vue'
import Composition from './components/CompositionInterface.vue'
import StoreCom from './components/StoreComponent.vue'

export default {
  name : 'app',

  data(){
    return {
      selected : "PropsCom",
      isFocused : false // 내가 정의한 directive랑 연결됟ㄴ property
    }
  },

  components : {
    PropsCom, // = 'PropsCom' : {} 얘가 들고있는 내용을 is가 찾아서 대체함.
    SlotCom,
    Composition,
    StoreCom
  }
}
</script>
