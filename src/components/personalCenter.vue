<template>
  <div class="home-content">
    <!-- <div class="home-image">
      <el-image style="width:920px;height:300px" :src="homeImgUrl"></el-image>
    </div> -->

    <el-card class="user-card">
      <!-- <el-avatar :size="90" :src="avatarUrl" class="avatar-circle"></el-avatar> -->
      <!-- <el-avatar shape="square" :size="90" :src="avatarUrl" class="avatar-circle"></el-avatar> -->
      <el-image :src="avatarUrl" fit="cover" class="avatar"></el-image>
      <div class="userinfo-box">
        <a class="username">{{ this.$store.state.userInfo.username }}</a>
        <p class="statement-info">{{ this.$store.state.userInfo.description }}</p>
        <!-- <p class="follower-info">888 粉丝 88关注</p> -->
      </div>
      <el-button @click="logout" icon="el-icon-switch-button" class="logout-btn"></el-button>
      <el-button @click="dialogFormVisible = true" icon="el-icon-edit" class="edit-btn"></el-button>

      <!-- Form -->
      <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

      <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="个性签名" :label-width="formLabelWidth">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePersonalInfo">确 定</el-button>
        </div>
      </el-dialog>

      <!-- <div class="follower-box">888 粉丝 88关注</div> -->
    </el-card>

    <el-card>
      <el-tabs class="content-tabbar">
        <el-tab-pane label="我的博客">
          <blog-page v-if="!this.$store.state.deleteFlag"></blog-page>
        </el-tab-pane>
        <el-tab-pane label="我的消息">
          <msg-page></msg-page>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
          <favorites-page></favorites-page>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import blogPage from "./pcSub/blogPage";
import msgPage from "./pcSub/msgPage";
import favoritesPage from "./pcSub/favoritesPage";

export default {
  data() {
    return {
      homeImgUrl: require("../assets/fireworks.jpg"),
      avatarUrl: require("../assets/avatar-girl.png"),
      blogShow: true,
      msgShow: true,
      favShow: true,
      dialogFormVisible: false,
      form: {
        description: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 修改个人信息
    updatePersonalInfo() {
      this.$axios
        .post("/updatePersonalInfo", {
          user_id: this.$store.state.userInfo.userId,
          gender: "",
          region: "",
          description: this.form.description
        })
        .then(ret => {
          // console.log(ret)
          if (ret.data.affectedRows == 1) {
            // 修改成功
            this.dialogFormVisible = false;
            this.$store.commit("updatePersonalInfo", this.form);
          } else {
            alert("修改失败");
            console.log(ret);
          }
        });
    },
    // 退出登录
    logout() {
      this.$store.commit("logout");
      // 清除所有cookies
      this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie)) 
      this.$router.push('LoginRegister')
    }
  },
  components: {
    blogPage,
    msgPage,
    favoritesPage
  }
};
</script>

<style scoped>
.home-content {
  width: 920px;
  height: 100%;
  margin: 20px auto;
  left: 0;
  right: 0;
}
.home-image {
  margin: 15px 0 10px 0;
}
.user-card {
  position: relative;
  margin-bottom: 10px;
  height: 100px;
}
.avatar {
  float: left;
  width: 100px;
  height: 100px;
}
.userinfo-box {
  /* position: absolute; */
  float: left;
  /* top: 12px; */
  width: 520px;
  margin: 15px 0 0 20px;
  /* padding-left: 130px; */
  font-size: 14px;
  color: #999;
}
.username {
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}
.statement-info {
  display: inline;
  margin-top: 5px;
}
.follower-info {
}
.logout-btn,
.edit-btn {
  float: right;
  width: 50px;
  height: 100px;
  border: 0;
  border-radius: 0;
}
.logout-btn:hover {
  background-color: red;
  color: white;
}
.edit-btn:hover {
  background-color: #409eff;
  color: white;
}
/* .follower-box {
  position: absolute;
  right: 0;
  top: 40px;
  width: 300px;
  font-size: 14px;
  text-align: right;
  padding-right: 70px;
} */
/* 正文框的tabbar的样式 */
/deep/.el-card__body {
  padding: 0;
}
/deep/.el-tabs__header {
  width: 510px;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 0;
}
/deep/.el-tabs__item {
  width: 170px;
  padding: 0;
  text-align: center;
}
/deep/.el-tabs__active-bar {
  width: 40px !important;
  margin: 0 65px;
}
</style>