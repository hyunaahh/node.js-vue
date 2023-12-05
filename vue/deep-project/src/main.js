import { createApp } from 'vue'
import App from './App.vue'
import mixin from './mixin.js'
import store from './store.js'

createApp(App)
.use(store)
.mixin(mixin)
.directive('focus', {
    mounted(el, binding, vnode, prevVNode){
        console.log('mounted', el, binding, vnode, prevVNode)

        if(binding.value){
            el.focus();
        }
    },
    updated(el, binding, vnode, prevVNode){
        console.log('updated', el, binding, vnode, prevVNode)

        if(binding.value){
            //value값이 변경되면 스타일 변경되도록! 
            el.style.color='red';
        }else{
            el.style.color='blue';
        }
    }
})
.mount('#app')
