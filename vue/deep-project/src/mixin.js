// Mixin(믹스인) - 공통되는 함수에 접근하는거! 




export default {
    
    methods : {
        //이름충돌방지위해 앞에 $ 붙여주기! 
        $dateFormat(value, format){
            let today = new Date(value);
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth()+1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);

            let result = format.replace('yyyy', year)
                                .replace('MM', month)
                                .replace('dd', day)
            return result;
        },
    
    },

    //공통된 life cyle hook 사용 가능! - 각 component에 진행되는 부분. log
    created(){
        console.log('컴포넌트 생성');
    },
        
    mounted (){
        console.log('DOM에 마운트');
    }

}