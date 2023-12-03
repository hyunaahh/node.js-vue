import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataBinding from '../views/DataBinding.vue'; //component 담고 경로
import ListBinding from '../views/ListBinding.vue'; //앞에는 변수라 내가 지어도 상관xs
import IfBinding from '../views/IfBinding.vue';
import OnEvent from '../views/OnEvent.vue';
import Options from '../views/Options.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/dataBinding',
    name: 'dataBinding',
    component : DataBinding //import에서 선언한거 쓰면됨
  },

  {
    path: '/listBinding',
    name: 'ListBinding',
    component : ListBinding //import에서 선언한거 쓰면됨
  },

  {
    path: '/ifBinding',
    name: 'IfBinding',
    component : IfBinding //import에서 선언한거 쓰면됨
  },

  {
    path: '/onEvent',
    name: 'OnEvent',
    component : OnEvent //import에서 선언한거 쓰면됨
  },
  {
    path: '/options',
    name: 'Options',
    component : Options 
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
