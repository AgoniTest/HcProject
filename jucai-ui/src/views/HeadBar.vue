<template> 
  <div class="headbar" :style="{'background':themeColor}" 
    :class="collapse?'position-collapse-left':'position-left'">
    <!-- 导航收缩 -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1" @click="onCollapse"><hamburger :isActive="collapse"></hamburger></el-menu-item>
      </el-menu>
    </span>
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" :background-color="themeColor" text-color="#fff"  active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
            <el-menu-item index="1" @click="$router.push('/home')">{{$t('commen.Home Page')}}</el-menu-item>
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor" :active-text-color="themeColor" mode="horizontal">
        <!-- 主题切换 -->
        <el-menu-item index="1">
           <Themepicker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange">
           </Themepicker>
        </el-menu-item>
        <!-- 语言切换 -->
        <el-menu-item index="2" v-popover:popover-lang>
             <li style="color:#fff;" class="fa fa-language fa-lg"></li>
             <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">
                <div class="lang-item" @click="langChange('zh_cn')">简体中文</div>
                <div class="lang-item" @click="langChange('en_us')">English</div>
             </el-popover>
        </el-menu-item>
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img src="../../static/img/admin.jpg" />{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
                  <Personal :user="user"></Personal>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mock from "@/mock/index"
import Themepicker from '../components/Themepicker'
import Hamburger from "@/components/Hamburger"
import Personal from './core/Personal'
export default {
  components:{
      Hamburger,Themepicker,Personal
  },
  data() {
    return {
      user: {
        name: sessionStorage.getItem("userName"),
        avatar: "",
        role: "超级管理员",
        registeInfo: "注册时间：2018-12-20 "
      },
      activeIndex: '1',
      langVisible: false
    }
  },
  methods: {
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // 折叠导航栏
    onCollapse: function() {
      this.$store.commit('onCollapse')
    },
    //切换主题
    onThemeChange(themeColor){
      this.$store.commit('setThemeColor',themeColor)
    },
    langChange(lang){
      lang===''? 'zh_cn' :lang
      this.$i18n.locale =lang
      this.langVisible=false
    }
  },
  mounted() {
    var user = sessionStorage.getItem("userName")
    if (user) {
      this.user.name = user
      this.user.avatar = require("@/assets/user.png")
    }
  },
  computed:{
    ...mapState({
      themeColor:state=>state.app.themeColor,
      collapse: state=>state.app.collapse
    })
  },

}
</script>

<style scoped lang="scss">
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}
.hamburg, .navbar {
  float: left;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>