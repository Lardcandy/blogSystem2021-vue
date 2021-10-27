<template>
  <div>
    <el-container>
      <!-- 侧边导航栏 -->
      <el-aside width="180px" class="nav-bar">
        <el-row class="tac">
          <el-col>
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="navClick">
                <i class="el-icon-folder-checked"></i>
                <span slot="title">已发表</span>
              </el-menu-item>
              <el-menu-item index="2" @click="navClick">
                <i class="el-icon-folder"></i>
                <span slot="title">草稿箱</span>
              </el-menu-item>
              <!-- <el-menu-item index="3" @click="navClick">
                <i class="el-icon-delete"></i>
                <span slot="title">回收站</span>
              </el-menu-item> -->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 右边正文区域 -->
      <el-main class="main-area">
        <div v-show="activeIndex=='1'">
            <my-blog :atcList="submittedAtc"></my-blog>
        </div>
        <div v-show="activeIndex=='2'">
            <my-blog :atcList="savedAtc"></my-blog>
        </div>
        <div v-show="activeIndex=='3'">delete</div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import myBlog from './myBlog'

export default {
  data() {
    return {
      activeIndex: "1",
      submittedAtc: [],
      savedAtc: [],
      deletedAtc: []
    };
  },
  methods: {
    navClick(key) {
      switch (key.index) {
        case "1":
          this.activeIndex = "1";
          break;
        case "2":
          this.activeIndex = "2";
          break;
        case "3":
          this.activeIndex = "3";
          break;
      }
    },
    // 从服务器获取文章信息
    getAtc(typeVal) {
      this.$axios
        .get("/getArticle", {
          params: {
            userId: this.$store.state.userInfo.userId,
            type: typeVal
          }
        })
        .then(ret => {
          switch (typeVal) {
            case "submitted":
              // this.$store.commit("setSubmittedAtc", ret.data);
              this.submittedAtc = ret.data.reverse()
              break;
            case "saved":
              // this.$store.commit("setSavedAtc", ret.data);
              this.savedAtc = ret.data.reverse()
              break;
            // case "deleted":
            //     this.$emit('getDeletedAtc',ret.data)
            //     break
          }
          //   this.submittedAtc = ret.data;
        });
    }
  },
  filters: {
    dateFormatter: val => {
      return val;
    }
  },
  watch: {
    activeIndex(index) {
      switch (index) {
        case "1":
          this.getAtc("submitted");
          break;
        case "2":
          this.getAtc("saved");
          break;
        case "3":
          // this.getAtc('deleted');
          break;
      }
    }
  },
  components:{
      myBlog,
  },
  created() {
    // console.log("created!");
    this.getAtc("submitted");
    // this.getAtc("saved");
    // this.getAtc('deleted')
  }
};
</script>

<style scoped>
.nav-bar {
  margin-top: 20px;
}
.el-menu-vertical-demo {
  border: 0;
}
.el-menu-item.is-active {
  border-left: 2px solid #409eff;
}
</style>