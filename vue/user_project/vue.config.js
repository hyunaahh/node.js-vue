const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:3000'

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false,
  // 개발하는동안 적용되는 server → 완성되면 이 설정 빠짐 ! 
  devServer :{
    port : 8080,
    
    //어떤경우에 origin을 대체할건지 정의하는거.. 통신시도할때 사용하는 주소
    proxy : {
      //앞부분이 /로 시작되는 경우 proxy를 시작하겠단 의미.
      '^/api' : {  //우리가 통신을 일으키는 경로. 슬러시(/)기준으로 넘기면 
        target, // 우리가 가져야하는 origin. target속성의 origin으로 "대체"하겟다.
        changeOrigin : true, //true로 해줘야 바껴짐 기본적으로 false임.
        ws : false, // web socket : 별도 설정없이 웹소켓 ㅈ ㅣ원. 프록시할때 ws 쓸건지 말건지 결정하면 됨. ex) 채팅, 실시간지도업뎃, 
        pathRewrite : {'^/api' : '/'} // 경로다시쓰기! → api/로 시작하는 애를 : '/'로 쓰겠따(접근하겠다)! 
      }
    }
  }
})

