//store.js

import { createStore } from 'vuex';

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

    //getters : computed랑 비슷. => 자체적으로 정보들고있는게 아니어서 연결된정보 수정해서 update. 
    getters : {
        //위에있는 state 통째로 넘어오게한거
        cartCount : (state) => {
            return state.cart.length;
        }
    },

    //mutations : (동기식) 내부적으로 함수로 변경시켜서. 어떤 data로 수정할건지 => 이메소드 실행시키면 특정한 것만 update 진행
    mutations : {
        increment(state){
            state.count++;
        },

        addProduct(state, info ){
            state.cart.push(info);
        }
    },


    //actions : (비동기 처리 가능)
    /*
    actions : {
        //(state자체값, component)
        addProduct(state, info ){

        }
    }    
*/
});    

export default store; // vue에 추가되어야함! -> main.js