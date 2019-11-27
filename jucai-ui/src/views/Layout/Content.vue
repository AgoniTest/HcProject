<template>
<el-scrollbar class="el-scrollbar" style="height:100%">
  <div id="main-container" class="main-container" :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!-- 主内容区域 -->
    <keep-alive>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
      </keep-alive>
    <!-- <div class="main-content">
      
    </div> -->

 </div>
</el-scrollbar>
</template>

<script>

export default {
    
}
</script>


<style lang="scss" scoped>
.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: 60px;
  left: 1px;
  right: 1px;
  bottom: 0px;
  background: rgba(67, 69, 70, 0.1);
  .main-content {
    position: absolute;
    top: 45px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    padding: 5px;
  }
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>