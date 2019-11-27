<template>
  <div class="personal-panel">
    <div class="personal-desc" :style="{'background':this.$store.state.app.themeColor}">
        <div class="avatar-container">
          <img class="avatar" :src="require('../../../static/img/admin.jpg')" />
        </div>  
        <div class="name-role">
          <span class="sender">{{ name }} </span>  
        </div>  
        <div class="registe-info">
          <span class="registe-info">
            <li class="fa fa-clock-o"></li>
            {{$t("commen.The Login Time")}}:{{ loginTime }}
          </span>
        </div>  
    </div>
    <!-- <div class="personal-relation">
        <span class="relation-item">followers</span>  
        <span class="relation-item">watches</span>  
        <span class="relation-item">friends</span>
    </div> -->
    <div class="main-operation">
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-male" @click="$router.push('/userinfo')"> 个人中心</el-button>
        </span>    
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-key" @click="$router.push('/userbase')"> 修改密码</el-button>
        </span>    
    </div>
    <div class="other-operation">
        <div class="other-operation-item" @click="deptchange">
          <i class="fa fa-sitemap"></i>{{$t("commen.Change Dept")}}
        </div>    
        <div class="other-operation-item" v-if="isFull" @click="full">
          <img class="full" v-if="isFull" src="../../../static/img/quanping.png">{{$t("commen.Full Screen")}}
        </div>    
        <div class="other-operation-item" v-if="!isFull" @click="exsitfull">
          <img class="full" v-if="!isFull" src="../../../static/img/tuichuquanping.png">{{$t("commen.Exit Full Screen")}}
        </div>    
        <div class="other-operation-item" @click="$router.push('/system')">
          <li class="fa fa-gg"></li>
          {{$t("commen.About System")}}
        </div>    
    </div>
    <div class="personal-footer" @click="logout">
      <li class="fa fa-sign-out"></li>
      {{$t("commen.Login Out")}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalPanel',
  components:{
  },
  data() {
    return {
      isFull:true,
      loginTime: sessionStorage.getItem("loginTime"),
      name: sessionStorage.getItem("userName"),
    }
  },
  methods: {
  full(){
    var docEle=document.documentElement;
    this.isFull=false;
    docEle.requestFullscreen();
  },
  exsitfull(){
    var docEle=document.documentElement;
    this.isFull=true;
    document.exitFullscreen();
  },
    deptchange(){
    this.$message('功能未完成，敬请期待~~')
     },
    // 退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
      .then(() => {
        sessionStorage.removeItem("user")
        this.$router.push("/login")
        this.$api.login.logout().then((res) => {
          }).catch(function(res) {
        })
      })
      .catch(() => {})
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.personal-panel {
  font-size: 14px;
  width: 280px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}
.personal-desc {
  padding: 15px;
  color: #fff;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 90px;
}
.name-role {
  font-size: 16px;
  padding: 5px;
}
.personal-relation {
  font-size: 14px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}
.relation-item {
  padding: 12px;
}
.relation-item:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
}
.main-operation {
  padding: 8px;
  margin-right: 1px;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.main-operation-item {
  margin: 15px;
}
.other-operation {
  padding: 15px;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.other-operation-item {
  padding: 12px;
}
.other-operation-item:hover {
  cursor: pointer;
  background: #9e94941e;
  color: rgb(19, 138, 156);
}
.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.personal-footer:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
  background: #b1a6a61e;
}
.full{
  position: relative;
  top: 2px;
}
</style>