
//공통적으로 쓰는 함수 등록하는 곳! 


export default {

    methods: {
        //mixin에 등록되는 함수는 $ 쓰기!! 
        $dateFormat(value, format){
            let date = value == '' ? new Date() : new Date(value);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);

            let result = format.replace('yyyy', year)
            .replace('MM', month)
            .replace('dd', day)

            return result;

        }
    }
}