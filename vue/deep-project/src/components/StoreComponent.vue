<template>
    <div>
        <form>
            <label> 제품ID : <input type="text" v-model="productInfo.product_id"></label><br>
            <label> 제품명 : <input type="text" v-model="productInfo.product_name"></label><br>
            <label> 카테고리 : <input type="radio" value="A" v-model="productInfo.category">A
                                <input type="radio" value="B" v-model="productInfo.category">B </label>
            <br>
            <button type="button" @click="addCart"> 추가 </button>
            <br>
            Total : {{total}}
            
            
            
        </form>

        <table>
            <thead>
                <tr>
                    <th> 카테고리 </th>
                    <th> 제품ID </th>
                    <th> 제품명 </th>
                </tr>
            </thead>

            <tbody>
                <tr :key="idx" v-for="(info, idx) in productList">
                    <td>{{info.category}}</td>
                    <td>{{info.product_id}}</td>
                    <td>{{info.product_name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>




<script>

export default {

    data(){
        return {
            productInfo : {
                product_id : '',
                product_name : '',
                category : ''
            }
        }
    },

    computed : {
        productList(){
            //$store: 등록된 저장소 불러온거. 
            return this.$store.state.cart;
        },
        total(){
            return this.$store.getters.cartCount;
        },
    },
    methods : {
        //위에 data에 입력된 정보 저장소에 저장하고자 한다면 : commit! 이용해서 정보 넘겨줌 + 넘겨야 하는 정보 
        addCart(){
            //**  참조타입이라서 그럼. 얘 안쓰니까 이상하게 됐음 없애보등가.. - 내부 필드값 복사해야함! ?
            let obj = {
                product_id : this.productInfo.product_id,
                product_name : this.productInfo.product_name,
                category : this.productInfo.category
            }
                //commit : mutations에 등록된 함수 이름 호출! 
           // this.$store.commit('addProduct', obj);

                //dispatch : action 등록 함수 호출
            this.$store.dispatch('addProduct', obj);
        }
    }
}

</script>
