<template>
    <div class="user-info">
    <div class="img-box">
      <h2 class="title">About me</h2>
      <img :src="require('../../../static/img/admin.jpg')" alt />
      <h4>{{user.LoginName}}</h4>
    </div>
    <div class="info-box">
      <h2 class="h2">{{$t("commen.Change Password")}}</h2>
      <!-- form -->
      <el-form ref="userData" :model="userData" class="form-box" :rules="rules">
        <el-form-item :label="$t('commen.Username')">
          <el-input v-model="user.uc" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.Old Code')" prop="oldPass">
          <el-input type="password" v-model="userData.oldPss" auto-complete="off" :placeholder="$t('Message.Please enter your old password')" show-password clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.New Code')" prop="newPass">
          <el-input type="password" v-model="userData.newPass" auto-complete="off"  show-password clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.Confirm Your Password')" prop="confirmPass">
          <el-input type="password"  v-model="userData.confirmPass" auto-complete="off"  show-password clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="pwdchange"
            type="primary"
            :disabled="!userData.confirmPass"
            :loading="loading"
          >{{$t("commen.Change Password")}}</el-button>
          <el-button @click="$refs['userData'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
      let validateNewPassword=(rule,value,callback)=>{
        if(value===this.userData.oldPss){
           callback(new Error('新密码不能与原密码相同!'))
        }else{
          callback()
        }
      }
      let validateConfirmNewPassword=(rule,value,callback)=>{
        if(value!==this.userData.newPass){
          callback(new Error('与新密码不一致!'))
        }else{
          callback()
        }
      }
        return{
            user:{
                uc:sessionStorage.getItem('uc'),
                LoginName:sessionStorage.getItem("LoginName")
            },
             userData:{
             oldPss: "",
             newPass:"",
             confirmPass:""
            },
            rules:{
              oldPss:[{required:true,message:'请输入原密码',trigger:"blur"}],
              newPass:[{required: true,message:"请输入您的新密码", trigger: "blur"},
              {validator:validateNewPassword,trigger:"blur"}],
              confirmPass:[{required:true,message:'请确认您的新密码',trigger:'blur'},
              {validator:validateConfirmNewPassword,trigger:"blur"}]
            
            },
            loading:false  //是否发起网络请求
        }
    },methods:{
        pwdchange(){
          this.$refs["userData"].validate(valid=>{
             if(valid){ this.loading=true;
     axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/ChangePassword/{'accountname':'hc','user_code':'"+this.user.uc+"','OldPass':'"+this.userData.oldPss+"','NewPass':'"+this.userData.newPass+"'}")
     .then((res)=>{
               this.loading=false;
                let result=res.data.result;
                            //解析接口返回结果
                            let data=JSON.parse(result);
                            //接收接口返回状态号码
                            let status=data.code;
                            if(status==1&&this.userData.newPass==this.userData.confirmPass){
                                  this.$message({
                                    message:'修改成功!',
                                    type:'success'
                                  })
                                  this.loading=false;
                            }
                            else {
                              this.$message({
                                message:'修改不成功',
                                type:"error"
                              })
                              return false;
                              this.loading=false;
                              
                            }
     })}
          })
            
        
  }
    }
}
</script>

<style lang="scss" scoped>
.h2{
  position: relative;
  text-align: center;
}
.user-info {
  height: 100%;
  // height: calc(100% - 70px);
  display: flex;
  overflow: auto;
  color: #606266;
  .img-box,
  .info-box {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    background: #fff;
    .title {
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .img-box {
    text-align: center;
    width: 30%;
    margin-right: 10px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    h4 {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .info-box {
    flex: 1;
    .form-box {
      padding: 0px;
    }
  }
}
</style>