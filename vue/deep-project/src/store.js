//store.js

import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'


//공유되는 data 기반! 
const store = createStore({

    //state: data 정의! => 저장소에 저장되는 data, component가 공유해야하는 data
    state() {
        return {
            cart : [
                {
                product_id : 1,
                product_name : "아이폰거치대",
                category : "A"
            }
        ],
            count : 0
        }
    },

    //getters : computed랑 비슷. => 자체적으로 정보들고있는게 아니어서 연결된정보 수정해서 update. READONLY
    getters : {
        //위에있는 state 통째로 넘어오게한거
        cartCount : (state) => {
            return state.cart.length;
        }
    },

    //mutations : (동기식) 내부적으로 함수로 변경시켜서. 어떤 data로 수정할건지 => 이메소드 실행시키면 특정한 것만 update 진행 ↔ COMMIT
   //             state에 접근 가능 
    mutations : {
        increment(state){
            state.count++;
        },

        addProduct(state, info ){
            state.cart.push(info);
        }
    },


    //actions : (비동기 처리 가능) - mutations가 가진 여러개의 함수 순차적으로 호출 가능. = > 비동기작업 지원. ↔ DISPATCH
   //                               state에 접근 불가. mutation에 있는 함수랑 이름 같아도 됨(wrapping 함)

    actions : {
        //매개변수 (store의 instance가 통째로 넘어옴-mutation에 정의된 함수에 동시다발적으로 접근하려고, component)
        addProduct(context, info ){
            setTimeout(()=> {
                context.commit('addProduct', info);
            }, 1000);

        }
    },
    
    plugins : [
        createPersistedState({
            paths : ['cart'] // state에 정의된 변수쓰면 됨- 배열로! 여기 선언된 값만 유지됨 or 새로고침할때마다 bye됨
        })
    ]

});    

export default store; // vue에 추가되어야함! -> main.js