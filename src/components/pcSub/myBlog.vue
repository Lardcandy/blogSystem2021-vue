<template>
  <div>
    <p v-if="atcList.length==0">空空如也呀，这位客官{{atcList}}</p>
    <div v-for="atc in atcList" :key="atc.article_id" class="atc-card">
      <div class="text-area">
        <a :href="`#/articleDetails/${atc.article_id}`" target="_blank" class="atc-title">{{ atc.article_title }}</a>
        <!-- <p>{{ atc.article_content }}</p> -->
        <p class="atc-date" v-if="atc.submit_date">{{ atc.submit_date | dateFormatter }}</p>
        <p class="atc-date" v-if="atc.save_date">{{ atc.save_date | dateFormatter }}</p>
        <!-- <p>{{ atc.user_id }}</p> -->
        <i class="atc-info el-icon-view">{{ atc.article_views}}</i>
        <i class="atc-info el-icon-chat-dot-round">{{ atc.article_comments}}</i>
        <i class="atc-info el-icon-sugar">{{ atc.article_likes}}</i>
      </div>
      <div class="btn-area">
        <el-button @click="atcEdit(atc.article_id)" icon="el-icon-edit" class="edit-btn"></el-button>
        <el-button
          @click="deleteDialogVisible = true;delAtcId=atc.article_id"
          icon="el-icon-delete"
          class="del-btn"
        ></el-button>

        <el-dialog title="删除提示" :visible.sync="deleteDialogVisible" width="30%" center>
          <span>确认删除这篇文章吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialogVisible = false" class="dialog-btn">取 消</el-button>
            <el-button type="danger" @click="atcDelete()" class="dialog-btn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import dateFormatter from '../../filters/dateFormatter'

export default {
  data() {
    return {
      deleteDialogVisible: false,
      delAtcId: "",
      editAtc: {}
    };
  },
  methods: {
    // 编辑文章
    atcEdit(atcId) {
      // this.$router.push(`blogEdit/${atcId}`)
      // 将要处理的文章信息传到vuex中，以便其他组件取用
      let i;
      for (i in this.atcList) {
        if (atcId == this.atcList[i].article_id) {
          // this.$store.commit("setOperateAtc", this.atcList[i]);
          this.editAtc = this.atcList[i]
        }
      }
      // this.$router.push("blogEdit");
      // 在新标签页打开编辑器
      let routeUrl = this.$router.resolve({
        path: `/blogEdit/${this.editAtc.article_id}`,
        // params: {
        //   id: this.editAtc.article_id
        // }
      })
      window.open(routeUrl.href, '_blank')
    },
    // 删除文章
    atcDelete() {
      // console.log('delete')
      // console.log(this.delAtcId)
      this.deleteDialogVisible = false;
      this.$axios
        .post("/deleteArticle", {
          delAtcId: this.delAtcId
        })
        .then(ret => {
          if (ret.data.affectedRows == 1) {
            // 删除成功
            Message.success("删除文章成功！");
            // 刷新页面
            this.$store.commit('setDeleteFlag', true)
            setTimeout(()=>{
              this.$store.commit('setDeleteFlag', false)
            }, 1)
          } else if (ret.data.affectedRows == 0) {
            Message.error("删除文章失败！");
          } else {
            Message.error("affectedRows:" + ret.data.affectedRows);
          }
        });
    }
  },
  filters: {
    dateFormatter,
  },
  props: ["atcList"],
  updated() {
    //
  },
};
</script>

<style scoped>
/* 博客栏 */
.atc-card {
  margin: 0 50px 0 0;
  height: 80px;
  border-bottom: 1px dotted lightgray;
  overflow: auto;
}
/* 博客栏的文字区域 */
.text-area {
  margin: 18px 0 0 0;
  float: left;
  width: 500px;
}
/* 文章标题 */
.atc-title {
  display: block;
  margin: 5px 0 8px 0;
  text-decoration: none;
  color: #4d4d4d;
  font-size: 18px;
  font-weight: normal;
}
/* 文章日期 */
.atc-date {
  display: inline;
  margin: 10px 20px 0 0;
  font-size: 14px;
  color: #999;
}
.atc-info {
  width: 70px;
  /* margin-right: 30px; */
  color: #999;
  font-size: 16px;
}
/* 博客栏的按钮区域 */
.btn-area {
  float: right;
}
.atc-card >>> .el-button:not(.dialog-btn) {
  margin: 0;
  padding: 0;
  border: 0;
  width: 50px;
  height: 80px;
  border-radius: 0;
}
/* 对话框 */
.btn-area >>> .el-dialog {
  box-shadow: none;
}
/* .atc-card >>> .el-button:hover {
} */
.edit-btn:hover {
  background-color: #409eff;
  color: white;
}
.del-btn:hover {
  background-color: red;
  color: white;
}
</style>