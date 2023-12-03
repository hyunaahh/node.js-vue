<template>

    <div>
        <button type="button" v-on:click="increaseCounter" >ADD 1</button>
        <input v-model.number="num">
        <button type="button" @click="setCount(7, $event), msg()"> ADD 7 </button>
        <p> The Counter is : {{counter}} </p>
        <hr>
        <!--중첩하는 중 : Event modifier(이벤트수식어) - 같이 쓸 수도 있음! ex).stop.prevent 가능-->
        <form @click.self="msg('form')"> <!-- .self: 버블링은 일어나는데 나만 예외 (.stop빼보기!) -->
            Form
            <div @click="msg('div')">
                Div 
                <p @click.stop="msg('p')"> <!-- .stop:  p이상 진행 못하게 막았음 ! -->
                    p <a @click.prevent="msg('a')" href="http://www.naver.com">네이버</a> <!-- .prevent!써서 버블링 막음 -->
                </p>
            </div>
        </form>

    </div>

</template>


<script>
export default {
  data() {
    return {
      counter: 0,
      num: 7,
    };
  },

  methods: {
    increaseCounter(e) {
      //자동으로 객체가 넘어옴
      console.log("increaseCount", e);
      this.counter++; // **waring:  this를 안쓰면 일반 변수로 인식할거임..
    },

    setCount(value, event) {
      //얘는 이벤트객체아님. 자동으로 안넘어옴 임의값을 줄수있음
      console.log("setCount", event);
      this.counter = this.counter + value;
    },

    msg(msg) {
      alert(`${msg} 선택!`);
    },
  },
};
</script>

<style scoped>
form,
form * {
  margin: 10px;
  border: 1px solid blue;
}
</style>
