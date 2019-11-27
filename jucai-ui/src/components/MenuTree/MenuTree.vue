<template>
   <el-scrollbar class="el-scrollbar" style="height:100%">
       <el-menu>

       </el-menu>
   </el-scrollbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{}
    },
    mounted:{
        ...mapState({
           asyncRouterMap:state=> state.app.router
        })
    }
}
</script>

<style lang="scss" scoped>

</style>