<template>
  <div>
    <div v-if="this.$router.hash == '#/admin'">
      hhhhhhhhhhhhhhhh
    </div>
    <el-row :gutter="0" v-else>
      <div id="app">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="black"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-col :xs="4" :sm="24" :md="24" :lg="3" :xl="1">
            <el-menu-item index="1">
              <i class="el-icon-s-shop"></i>
              <span>LARDCANDY</span>
              <!-- <h3>Elisa生日应援官网</h3> -->
            </el-menu-item>
          </el-col>
          <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
            <el-menu-item index="2">
              <router-link to="/" tag="div">首页</router-link>
            </el-menu-item>
          </el-col>
          <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
            <el-menu-item index="3">
              <router-link to="/secretGarden" tag="div">逛一逛</router-link>
            </el-menu-item>
          </el-col>
          <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
            <el-menu-item index="4">
              <router-link to="/discussArea" tag="div">讨论区</router-link>
            </el-menu-item>
          </el-col>
          <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
            <el-menu-item index="5">
              <router-link to="/resource" tag="div">资源</router-link>
            </el-menu-item>
          </el-col>
          <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
            <el-menu-item index="6">
              <router-link to="/blogEdit" tag="div">写博客</router-link>
            </el-menu-item>
          </el-col>
          <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
            <el-menu-item index="7">
              <router-link
                to="/personalCenter"
                tag="div"
                v-if="this.$store.state.userInfo.username"
              >{{ this.$store.state.userInfo.username }}</router-link>
              <router-link to="/LoginRegister" tag="div" v-else>登录 | 注册</router-link>
            </el-menu-item>
          </el-col>
        </el-menu>
        <!-- 组件显示区域 -->
        <router-view></router-view>
      </div>
    </el-row>
    <!-- footer -->
    <div>
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021064445号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "2"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  // 导航栏与当前路由路径不同步的问题
  // watch:{
  //   '$route':(newVal) => {
  //     console.log('改变了：',newVal)
  //     console.log('activeIndex:',this.activeIndex)
  //     if(newVal.path === '/'){
  //       // 路由是首页 #/
  //       this.activeIndex='2'
  //     }else if(newVal.path.includes('/discussArea')){
  //       // 路由是讨论区 #/discussArea
  //       this.activeIndex = '3'
  //     }else if(newVal.path.includes('/resource')){
  //       // 路由是资源 #/resource
  //       this.activeIndex = '4'
  //     }else if(newVal.path.includes('/blogEdit')){
  //       // 路由是写博客 #/blogEdit
  //       this.activeIndex = '5'
  //     }else if(newVal.path.includes('/personalCenter')){
  //       // 路由是个人中心 #/personalCenter
  //       this.activeIndex = '6'
  //     }
  //   }
  // },
  components: {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

/* .el-menu-demo {
  position: fixed;
} */

.el-menu-item {
  text-align: center;
}
</style>
