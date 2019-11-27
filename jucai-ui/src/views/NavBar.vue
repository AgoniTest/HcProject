<template>
	<div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
        @click="$router.push('/')">
        <img v-if="collapse"  src="../../static/img/logo copy.png"/> <div>{{collapse?'':appName}}</div>
      <!-- 导航菜单 -->
    </div>  
     <el-menu class="el-menu-slide" ref="navmenu" :default-active="$router.currentRoute.path" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
     :collapse-transition="false" :collapse="collapse" :unique-opened="true" 
     @open="handleopen" @close="handleclose" @select="handleselect" router>
     <template v-for="item in asyncRouterMap" v-if="item.hidden&&item.children&&item.children.length>0">
       <el-menu-item v-if="item.children.length==1" :index="item.children[0].path" :key="item.name" >
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{$t(item.children[0].meta.title)}}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{$t(item.meta.title)}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name" >
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{$t(child.meta.title)}}</span>
          </el-menu-item>
        </el-submenu>
     </template>
     </el-menu>
	</div>
</template>

<script>
import router from 'vue-router';
import { mapState } from 'vuex'
export default {
  
    computed: {
    ...mapState({
      asyncRouterMap:state=> state.app.router,
      themeColor: state=>state.app.themeColor,
      appName: state=>state.app.appName,
      collapse: state=>state.app.collapse,
    })
  },
  methods: {
    handleopen() {
      console.log('handleopen')
    },
    handleclose() {
      console.log('handleclose')
    },
    handleselect(a, b) {
      console.log('handleselect')
    }
  }
}
</script>

<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1020;
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #545c64;
    cursor:pointer;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
   div {
      font-size: 25px;
      color: white;
      text-align: left;
      padding-left: 20px;
    }
  }
  .el-menu-slide{
    align-self: auto;;
    border-right: none;
    top: 60px;
  }
  .menu-bar-width {
    width: 200px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
}

</style>