<template>
  <div>
    <el-row class="title-bar">
      <h3 class="title-label">文章标题：</h3>
      <el-input
        class="title-input"
        type="text"
        placeholder="请输入标题"
        v-model="atcTitle"
        maxlength="100"
        show-word-limit
      ></el-input>
      <el-button type="primary" @click="save" class="title-btn">保存</el-button>
      <el-button type="success" @click="submit" class="title-btn">发表</el-button>
    </el-row>
    <blog-edit ref="blogEdit" :parent_atcContent="atcContent" @getContent="getContent"></blog-edit>
    <p class="wordCount-bar">{{ wordCount | wcFormat }}</p>
  </div>
</template>

<script>
import blogEdit from "./blogEdi/mavonEditor";

export default {
  data() {
    return {
      atcTitle: "",
      atcContent: "",
      htmlContent: "",
      wordCount: "",
      operateAtcId: ""
    };
  },
  methods: {
    // 从子组件（富文本编辑器）获取文章内容原文本
    getContent(atcContent, renderVal) {
      // 文章内容
      this.atcContent = atcContent;
      this.htmlContent = renderVal;
      // 文章字数
      this.wordCount = atcContent.replace(/\s+/g, "").length;
    },
    // 从子组件（富文本编辑器）获取文章内容转 html内容
    // getHtmlContent(renderVal){
    //     this.htmlContent = renderVal
    // },
    postToServer(opt) {
      // 文章标题或者正文为空，不能保存或发表
      if (this.atcTitle.trim() == "" && this.atcContent.trim() == "") {
        alert("文章标题和正文不能为空！");
      } else {
        // 上传到服务器
        // 若是二次修改文章，请求服务器，
        // 新增一条article数据，同时删除原有数据
        if (this.operateAtcId) {
          this.$axios
            .post("/saveSubmit", {
              atcTitle: this.atcTitle,
              atcContent: this.atcContent,
              htmlContent: this.htmlContent,
              operation: opt,
              userId: this.$store.state.userInfo.userId
            })
            .then(ret => {
              if (ret.data.insertId) {
                // 新增成功，然后删除
                this.$axios
                  .post("/deleteArticle", {
                    delAtcId: this.operateAtcId
                  })
                  .then(ret => {
                    // console.log(ret)
                    if (ret.data.affectedRows == 1) {
                      // 删除成功，即是修改成功，跳转到文章管理页面
                      this.$router.push("/personalCenter");
                      // 清除要处理的文章信息
                      //   this.$store.commit("setOperateAtc", {});
                    } else if (ret.data.affectedRows == 0) {
                      // 删除失败
                      alert("修改失败(delete error)");
                      console.log(ret);
                    } else {
                      alert("affectedRows不等于0，1");
                      console.log(ret);
                    }
                  });
              } else {
                // 新增失败
                alert("修改失败(insert error)");
                console.log(ret);
              }
            });
        } else {
          // 若不是二次修改，则在数据库中插入新的数据
          this.$axios
            .post("/saveSubmit", {
              atcTitle: this.atcTitle,
              atcContent: this.atcContent,
              htmlContent: this.htmlContent,
              operation: opt,
              userId: this.$store.state.userInfo.userId
            })
            .then(ret => {
              // console.log(ret)
              if (ret.data.insertId) {
                //  上传成功，跳转到文章管理页面
                this.$router.push("personalCenter");
              } else {
                // 上传失败
                alert("error");
                console.log(ret);
              }
            });
        }
      }
    },
    // 保存文章到草稿箱
    save() {
      // 调用子组件 mavonEditor 上传图片的方法
      this.$refs.blogEdit.uploadimg();
      this.postToServer("save");
    },
    // 发表文章
    submit() {
      this.$refs.blogEdit.uploadimg();
      console.log(this.atcContent)
      console.log(this.htmlContent)
      this.postToServer("submit");
      // console.log(this.atcContent)
    }
  },
  filters: {
    wcFormat: value => {
      return "字数：" + value;
    }
  },
  components: {
    blogEdit
  },
  created() {
    if (this.$route.params.id) {
      this.operateAtcId = this.$route.params.id;
      // 修改文章
      this.$axios
        .get("/getArticleDetails", {
          params: {
            atc_id: this.operateAtcId
          }
        })
        .then(ret => {
          if (ret.data[0].length == 1) {
            this.atcTitle = ret.data[0][0].article_title;
            this.atcContent = ret.data[0][0].article_content;
            this.htmlContent = ret.data[0][0].article_htmlContent;
          } else {
            console.log("读取文章信息失败！");
            console.log(ret);
          }
        });
    }

    // 若 要处理的文章信息 不为空
    //   if(this.$store.state.operateAtc){
    //       this.atcTitle = this.$store.state.operateAtc.article_title
    //   }else{
    //       // 没有要处理的文章信息
    //       this.atcTitle = ""
    //   }
  }
  //     // 组件内守卫
  //   beforeRouteLeave(to, from, next) {
  //     // 导航离开该组件的对应路由时调用
  //     console.log("leave");
  //     console.log(to);
  //     console.log(from);
  //     next();
  //   },
};
</script>

<style scoped>
.title-bar {
  margin: 5px 10px;
}
.title-label {
  display: inline;
}
.title-input {
  width: 80%;
  margin-right: 15px;
}
.title-btn {
  width: 85px;
  margin: 0 3px 0 0;
}
.wordCount-bar {
  margin: 4px 0 0 23px;
  font-size: 13px;
  color: gray;
}
</style>