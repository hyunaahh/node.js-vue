<!-- UserInfo.vue -->

<template>

    <div class= "container">

        <div class="row">
            <table class="table">
                <thead>
                   <tr>
                    <th class="text-right table primary">No.</th>
                    <td class="text-center"></td>
                    </tr>

                    <tr>
                    <th class="text-right table primary">ID</th>
                    <td class="text-center"></td>
                    </tr>

                <tr>
                    <th class="text-right table primary">Pwd</th>
                    <td class="text-center"></td>
                </tr>

                <tr>
                    <th class="text-right table primary">Name</th>
                    <td class="text-center"></td>
                </tr>

                <tr>
                    <th class="text-right table primary">Genter</th>
                    <td class="text-center"></td>
                </tr>

                <tr>
                    <th class="text-right table primary">Age</th>
                    <td class="text-center"></td>
                </tr>

                <tr>
                    <th class="text-right table primary">JoinDate</th>
                    <td class="text-center"></td>
                </tr>

            </table>
        </div>


        <div class="row">

        </div>

    </div>

</template>






<script>
export default{

    data(){
        return{
            userInfo: {} 
        }
    }


} //export default
</script>
