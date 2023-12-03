<template>
    <div>

        <input type="number" v-model="price"> 원
        <hr>
        <input type="number" v-model="count"> 개
        <p> 과세 금액 : {{ amount }} </p>
        <p> 부가세 10% : {{ tax }} </p>
        <p> 결제금액 : {{ total }} </p>

    </div>

</template>


<script>

//값은 computed 동작은 watch! 

    const computed = {
    data(){
        return{
            price : 0,
            count : 0
        }
    },
    //computed에 정의한 값은 수정하지 않음! => READONLY
    computed: {
            amount(){
                //data option에 있는 property로 시작
                return this.price * this.count;
            },
            tax(){
                //computed 내부에 정의된 property 사용중.. 필요하다면 가능 단, 시작은 data option에 있는걸로 해야됨! 
                return this.amount * 0.1;
            },
            total(){
                return this.amount + this.tax;
            }
    }
    };

//watch는 데이터가 아님 => property로 사용하고자하는 애들은 option쪽에 집어넣어야함. - 성격이 변화를 감지하는거라서 처음에 실행을 하지 않아서 암껏도 안 뜬거임. ! 
const watch = {
    data() {
        return {
            price: 0,
            count: 0,
            amount : '',
            tax : '',
            total: ''
        }
    },
    watch :{
        //어떤 애를 지켜볼건지.. , return 없음!(데이터가아니고 그냥 실행하는 작업하는 거라서)
        price(){
            this.amount = this.price * this.count;
        },

        count(){
            this.amount = this.price * this.count;
        },

        amount(){
            this.tax = this.amount * 0.1;
            this.total = this.amount + this.tax;
        }
    }
};



//2가지 비교해보기! 
 export default watch;
// export default computed; 

</script>


