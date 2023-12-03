const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:3000'

module.exports = defineConfig({
  transpileDependencies: true,

  //개발하는동안 적용되는 server
  devServer :{
    port : 8080,

    //어떤경우에 origin을 대체할건지 정의하는거.. 통신시도할때 사용하는 주소
    proxy : {
      //앞부분이 /로 시작되는 경우 proxy를 시작하겠단 의미.
      '^/' : { 
        target, //우리가 가져야하는 origin. target속성의 origin으로 대체하겟다.
        changeOrigin : true //true로 해줘야 바껴짐 기본적으로 false임.
      }
    }
  }
})

