<template>
  <div>
    <el-row :gutter="0">
      <el-col
        v-for="atc in this.$store.state.atcList"
        :key="atc.article_id"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
      >
        <el-card class="box-card" shadow="hover">
          <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
          <div class="atc-title">
            <a @click="toAtcDetails(atc.article_id)">{{ atc.article_title }}</a>
          </div>
          <p class="atc-digest">{{ atc.article_content }}</p>
          <p class="atc-author">{{ atc.username }}</p>
          <p class="atc-date">{{ atc.submit_date | dateFormatter }}</p>
          <!-- <p
            class="atc-info"
          >阅读{{ atc.article_views }} 评论{{atc.article_comments}} 点赞{{atc.article_likes}}</p> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dateFormatter from '../../filters/dateFormatter'

export default {
  methods:{
    toAtcDetails(atc_id){
      // 在新标签页打开编辑器
      let routeUrl = this.$router.resolve({
        path: `/articleDetails/${atc_id}`,
      })
      window.open(routeUrl.href, '_blank')
    }
  },
  filters: {
    dateFormatter,
  },
};
</script>

<style scoped>
.text {
  /* font-size: 14px; */
}
.item {
  padding: 18px 0;
}
.box-card {
  width: 95%;
  height: 120px;
  margin: 20px auto 0 auto;
}
.atc-title {
  width: 100%;
  height: 30px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.atc-title a {
  white-space: nowrap;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  color: #3d3d3d;
}
.atc-digest {
  width: 100%;
  height: 18px;
  margin: 5px 0 10px 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #8a8a8a;
}
.atc-author {
  display: inline;
  margin: 0 10px 3px 0;
  font-size: 18px;
  font-weight: 600;
}
.atc-date {
  display: inline;
  /* margin-right: 10px; */
  font-size: 14px;
  color: #8a8a8a;
}
.atc-info {
  display: inline;
  float: right;
  font-size: 14px;
  color: #5d5d5d;
}
</style>