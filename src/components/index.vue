<template>
  <!-- 轮播图 -->
  <div class="block">
    <el-carousel trigger="click" height="600px">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <el-image :src="item.url"></el-image>
      </el-carousel-item>
    </el-carousel>

    <!-- 首页第二导航栏  推荐 分类 ...-->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-col :xs="4" :sm="24" :md="24" :lg="3" :xl="1">
        <el-menu-item index="1">
          <router-link to="/" tag="div">新闻</router-link>
        </el-menu-item>
      </el-col>
      <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
        <el-menu-item index="2">博客</el-menu-item>
      </el-col>
      <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
        <el-menu-item index="3">图片</el-menu-item>
      </el-col>
      <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
        <el-menu-item index="4">篮球</el-menu-item>
      </el-col>
      <el-col :xs="4" :sm="24" :md="24" :lg="2" :xl="1">
        <el-menu-item index="5">排球</el-menu-item>
      </el-col>
    </el-menu>

    <!-- <router-view></router-view> -->
    <div class="article-area">
      <Article></Article>
    </div>
  </div>
</template>

<script>
import Article from "./indexSub/article.vue";

export default {
  name: "app",
  data() {
    return {
      imgList: [
        { id: 0, url: require("../assets/desktop.jpg") },
        { id: 1, url: require("../assets/fireworks.jpg") },
        { id: 2, url: require("../assets/Kobe.jpg") },
        { id: 3, url: require("../assets/terrible night.jpg") },
        { id: 4, url: require("../assets/wallpaper.jpg") }
      ],
      atcList: [],
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    Article
  },
  created() {
    this.$axios
      .get("/getAllArticle")
      .then(ret => {
        // 将文章信息保存到vuex
        this.$store.commit('setArticleList', ret.data.reverse())
      });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 抵消掉导航栏下方多出的1px白条 */
.block {
  position: relative;
  top: -1px;
}

.router-link-active {
  border-bottom: 3px solid #ffd04b;
  color: #ffd04b;
  font-weight: bold;
}

.article-area{
  display: inline;
}
</style>