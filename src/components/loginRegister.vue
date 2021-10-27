<template>
  <div>
    <el-card class="box-card">
      <div class="clearfix">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录" name="first"></el-tab-pane>
          <el-tab-pane label="注册" name="second"></el-tab-pane>
        </el-tabs>
      </div>

      <login v-show="activeName == 'first'"></login>
      <register v-show="activeName == 'second'"></register>
    </el-card>
  </div>
</template>

<script>
import login from "./logRegSub/login.vue";
import register from "./logRegSub/register.vue";

export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: {
    login,
    register
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/* 登录注册卡片 */
.box-card {
  width: 350px;
  height: 55%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
}

/* 让标签页在卡片中居中  >>>深度作用选择器*/
.el-tabs >>> .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}

.el-tabs >>> .el-tabs__header {
  margin-bottom: 30px;
}
</style>