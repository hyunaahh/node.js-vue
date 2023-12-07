<template>
  <div class="container">
    <Header />
    <router-view /> 
    <p>본문</p>
    <Footer />
  </div>
</template>


<script>
import Header from './layout/HeaderComponent.vue'
import Footer from './layout/FooterComponent.vue'

export default {

  //App.vue가 Root니까 
  components : {
    Header,
    Footer
  }
}
</script>



<style>

</style>
