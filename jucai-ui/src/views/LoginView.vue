<template>
    <div class="login">
       <BackGround/>
        <LoginHeader>
            <el-form class="for"
                    :rules="rules"
                    :model="ruleForm"
                    ref="ruleForm"
                    label-position="left"
                    label-width="0px"
                    slot="container">
               <div class="title">
                   <el-dropdown class="changelang"  @command="LangChange" trigger="click">
                       <span class="el-dropdown-link">{{$t('commen.LangSwitcher')}}
                           <i class="el-icon-arrow-down el-icon--right"></i>
                       </span>
                       <el-dropdown-menu slot="dropdown" >
                       <el-dropdown-item command="zh_cn" >{{$t('commen.Chinese')}}</el-dropdown-item>
                       <el-dropdown-item command="en_us" >English</el-dropdown-item>
                       </el-dropdown-menu>
                   </el-dropdown>
               </div>
                <!--uc-->
                   <el-form-item prop="uc">
                    <el-input type="text" v-model="ruleForm.uc" @keyup.enter.native="handleLogin"
                              auto-complete="off" :placeholder="$t('commen.Username')" clearable>
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item> 
                <!--password-->
                <el-form-item prop="pwd">
                    <el-input type="password"  v-model="ruleForm.pwd" @keyup.enter.native="handleLogin" 
                              auto-complete="off" :placeholder="$t('commen.Password')" clearable show-password>
                              <i slot="prefix" class="fa fa-lock"></i>
                    </el-input>
                </el-form-item>

                <!-- 登录button-->
                <el-form-item>
                    <el-button :loading="isLogin"
                            @click.native.prevent="handleLogin"                           
                            type="primary" style="width: 100%">
                        {{$t("commen.Login")}}
                    </el-button>
                </el-form-item>
                <!--注册button-->
                <!-- <el-form-item>
                     <el-button>
                        注册用户
                     </el-button>
                </el-form-item> -->
                <!-- 七天登录和忘记密码-->
                 <!-- <el-form-item>
                    <el-checkbox v-model="ruleForm.autoLogin"
                    :checked="ruleForm.autoLogin">
                        7天内自动登录
                    </el-checkbox>
                </el-form-item>  -->
                <!-- <el-button @click="$router.push('/password')" type="text" class="forget">忘记密码？</el-button> -->
                <span style="color:gray">{{$t("commen.Version")}}:0.1.0</span>
            </el-form>
        </LoginHeader>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import BackGround from '../components/BackGround/Background'
import axios from 'axios';
import LoginHeader from './LoginHeader'
export default {
    components:{
        LoginHeader,BackGround
    },
    data(){
        return{
            isLogin:false,
            ruleForm:{
                uc:'',
                pwd:'',
            },
            rules:{
                 uc: [{require: true ,message:'请输入用户名',trigger:'blur'}],
                 pwd: [{require: true ,message:'请输入密码',trigger:'blur'}],
            }
        }
    },
      computed: {
    ...mapState({
      user: state=> state.app.user,
      themeColor: state=>state.app.themeColor,
      appName: state=>state.app.appName,
      collapse: state=>state.app.collapse,
    })
  },
  
    methods:{
           //国际化语言切换
    LangChange(command){
           if (this.$i18n.locale=='zh_cn'&&command=='zh_cn') {
         this.$notify({
           title:'！！！',
           message:"当前语言已经是中文了",
           type:'warning',
         })
    }else if(command=='zh_cn') {
      this.$i18n.locale='zh_cn'
      this.$notify({
        title:'成功!',
        message:'已经切换成中文!',
        type:'success',
      })
    }
    if(this.$i18n.locale=='en_us'&&command=='en_us') {
      this.$notify({
           title:'！！！',
           message:"The current language is English",
           type:'warning',
         }) 
    }else if(command=='en_us') {
      this.$i18n.locale='en_us'
      this.$notify({
        title:'Success!',
        message:'Has been switched to English!',
        type:'success',
      })
    }
    },
    handleLogin(){
        this.isLogin=true
        axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/NewSystem_Login/{'accountname':'hc','uc':'"+this.ruleForm.uc+"','pwd':'"+this.ruleForm.pwd+"'}")
        .then(res=>{
            this.isLogin=false;
            let result=res.data.result;
            //解析接口返回结果
            let data=JSON.parse(result);
            //接收接口返回状态号码
            let status=data.code;
            //console.log(data.uc)
            let user=JSON.stringify(data);
            // sessionStorage.setItem("user",user);
            sessionStorage.setItem("LoginName",data.human_name)
            sessionStorage.setItem("loginTime",data.svrtime);
            sessionStorage.setItem("id",data.human_sid);
            sessionStorage.setItem("userName",data.name);
            sessionStorage.setItem("Token",data.Token);
            sessionStorage.setItem("uc",data.uc);
            switch (status){
                                case 1:
                                    // this.$message({
                                    //     message:'成功!',
                                    //     type:'success'
                                    // })
                                    this.$router.push({path:'/'})
                                    break;
                                case 2:
                                    this.$message({
                                        message:'当前账号已在其它电脑登录，被踢出',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 3:
                                    this.$message({
                                        message:'JSON 解析异常！',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;    
                                case 9:
                                    this.$message({
                                        message:'MAC地址认证未通过！',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 10:
                                    this.$message({
                                        message:'登录用户不存在！',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 11:
                                    this.$message({
                                        message:'登录用户密码错误!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 12:
                                    this.$message({
                                        message:'用户已经登录，请退出已登录的电脑!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 14:
                                    this.$message({
                                        message:'连接服务器失败!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 41:
                                    this.$message({
                                        message:'账号已经停用，不能登录!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                            }  
        }).catch(()=>{
               this.isLogin=false;
        })
    },
    }
}
</script>

<style lang="scss" scoped>
   .login{
   width: 100%;
   height: 100%;
   overflow: hidden;
   background-size: 100% 100%;
    .title{
        margin: 0px auto 40px auto;
        text-align: right;
        color: #505458;
    
    i{
        font-size: 14px;
        margin-left: 8px;
    }
    }
    .forget{
        float: right;
    }
    }
    .el-dropdown-link{
        color: #fff;
    }
</style>