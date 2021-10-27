<template>
  <div>
    <el-card class="atc-area">
      <div class="atc-header">
        <h2>{{ atcInfo.article_title }}</h2>
        <p v-if="atcInfo.submit_date">{{ atcInfo.submit_date | dateFormatter }}</p>
        <p v-if="atcInfo.save_date">{{ atcInfo.save_date | dateFormatter }}</p>

        <p>阅读 {{ atcInfo.article_views}}</p>
        <p>评论 {{ cmtInfo.length }}</p>
        <p>点赞 {{ atcInfo.article_likes}}</p>
        <h4>作者：{{ atcInfo.username }}</h4>
      </div>
      <hr />
      <div v-if="!atcInfo.article_htmlContent">{{ atcInfo.article_content }}</div>
      <div
        v-if="atcInfo.article_htmlContent"
        v-html="atcInfo.article_htmlContent"
        class="markdown-body"
      ></div>
    </el-card>
    <el-card class="comment-area">
      <div slot="header" class="clearfix">
        <span>评论区</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>

      <!-- 没有登录，跳转到登录 -->
      <div v-if="!this.$store.state.userInfo.userId">
        <el-button type="success" @click="gotoLogin">去登录，发表评论</el-button>
      </div>
      <!-- 登录了 就显示评论输入框 -->
      <div v-else>
        <div class="username">{{ this.$store.state.userInfo.username }}</div>
        <el-input
          id="comment-input"
          type="textarea"
          :placeholder="defaultPlaceholder"
          v-model="textarea"
          maxlength="1000"
          show-word-limit
          autosize
          @blur="commentBoxBlur"
          @focus="commentBoxFocus"
        ></el-input>
        <div v-show="commentBtn_show" class="comment-btn">
          <el-button @click="clearComment" class="clear-btn" type="info">清空</el-button>
          <el-button @click="submitComment()" class="submit-btn" type="success">发表</el-button>
        </div>
      </div>
      <div
        v-for="cmt in cmtInfo"
        :key="cmt.comment_id"
        :class="{'hasFather': cmt.fatherComment_id, 'cmt-box':true  }"
      >
        <p class="cmt-username">{{ cmt.username }}</p>
        <p class="cmt-date">{{ cmt.comment_date | dateFormatter }}</p>
        <!-- <p class="cmt-likes">点赞 {{ cmt.comment_likes }}</p> -->
        <!-- <el-button @click="likeComment(cmt.comment_id)" type="text">点赞 {{ cmt.comment_likes }}</el-button> -->
        <div>
          <el-button @click="delComment(this)" type="text" v-if="(cmt.user_id==currentUserId) || (currentUserId == atcInfo.user_id)">删除</el-button>
        </div>
        <el-button @click="replyComment(cmt.comment_id,cmt.username)" type="text">回复</el-button>
        <p class="cmt-content">{{ cmt.comment_content }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import "github-markdown-css";
import dateFormatter from "../filters/dateFormatter";

export default {
  data() {
    return {
      atcInfo: {},
      cmtInfo: [],
      defaultPlaceholder: "输入评论...",
      textarea: "",
      commentBtn_show: false,
      father_comment_id: null,
      currentHashUrl: "",
      currentUserId:null
    };
  },
  methods: {
    // 初始化数据，用在created
    initData() {
      // 路由参数为article_id, 然后向数据库请求文章数据
      this.$axios
        .get("/getArticleDetails", {
          params: {
            atc_id: this.$route.params.id
          }
        })
        .then(ret => {
          console.log(ret);
          // console.log(ret);
          this.atcInfo = ret.data[0][0];
          this.cmtInfo = ret.data[1];

          // // 清空原数据
          // this.cmtInfo = []
          // ret.data[1].forEach(item => {
          //   // 没有父评论id
          //   if(item.fatherComment_id == null) {
          //     this.cmtInfo.push(item)
          //   }else{
          //     // 有父评论id， 插入到父评论后面
          //     this.cmtInfo.forEach((item2, index) => {
          //       if(item2.comment_id == item.fatherComment_id){
          //         this.cmtInfo.splice(index+1, 0, item)
          //       }
          //     })
          //   }
          // });
        });
    },
    // 未登录跳转到登录页面
    gotoLogin() {
      window.location.hash = "/LoginRegister";
    },
    // 评论输入框聚焦，显示 发表/清空 按钮
    commentBoxFocus() {
      this.commentBtn_show = true;
    },
    // 评论输入框失焦，隐藏 发表/清空 按钮
    commentBoxBlur() {
      if (this.textarea.trim() == "") {
        this.commentBtn_show = false;
      }
    },
    // 清空评论
    clearComment() {
      this.textarea = "";
      this.commentBtn_show = true;
    },
    // 发表评论
    submitComment() {
      this.$axios
        .post("/submitComment", {
          comment_content:
            (this.defaultPlaceholder == "输入评论..."
              ? ""
              : this.defaultPlaceholder) + this.textarea.trim(),
          fatherComment_id: this.father_comment_id,
          article_id: this.$route.params.id,
          user_id: this.$store.state.userInfo.userId
        })
        .then(res => {
          // console.log(res);
          if (res.data.affectedRows == 1) {
            // 评论发表成功
            this.father_comment_id = null;
            this.textarea = "";
            this.defaultPlaceholder = "输入评论...";
            this.commentBoxBlur();
            // 重新请求数据
            window.location.hash = this.currentHashUrl;
            this.initData();
          }
        });
      // window.location.reload()
      // window.location.hash = '#cmt-box-area'
    },
    // 回复评论
    replyComment(id, username) {
      // 清空输入框
      this.textarea = "";
      this.defaultPlaceholder = `回复 ${username} :  `;
      // 跳转到输入框
      window.location.href = "#comment-input";
      // 记录父评论id
      this.father_comment_id = id;
    },
    // 删除评论
    delComment(arg) {
      console.log(arg)
    }
    // // 点赞评论
    // likeComment(id) {
    //   this.$axios.post('/likeComment', {
    //     comment_id: id
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
    // }
  },
  filters: {
    dateFormatter
  },
  created() {
    // 保存当前路由路径
    this.currentHashUrl = window.location.hash;
    this.initData();
    this.currentUserId = this.$store.state.userInfo.userId;
  }
};
</script>

<style scoped>
.atc-area {
  width: 60%;
  margin: 15px auto;
  padding: 10px 15px 20px 15px;
  left: 0;
  right: 0;
}
.atc-header {
  margin-bottom: 30px;
}
.atc-header p {
  display: inline;
  margin-right: 5px;
}
/* 评论卡片 */
.comment-area {
  width: 60%;
  margin: 0 auto 20px auto;
  padding: 10px 15px 20px 15px;
  left: 0;
  right: 0;
}
.el-textarea >>> textarea {
  border-radius: 0;
}
/* 评论发表按钮区域 */
.comment-btn {
  width: 100%;
  float: right;
  margin: 10px auto;
}
.comment-btn >>> .el-button {
  background-color: white;
  border: 0;
  border-radius: 0;
  margin: 0;
  font-size: 12px;
  color: gray;
}
.clear-btn:hover {
  background-color: red;
  border: 0;
  color: white;
}
.submit-btn:hover {
  background-color: #409eff;
  border: 0;
  color: white;
}
/* 每个评论行 */
.cmt-box {
  margin: 5px 0;
  padding: 3px 0;
  border-bottom: 1px dotted lightgray;
}
/* 评论文字区域 */
/* .cmt-textbox {
  width: 70%;
} */
.cmt-username {
  display: inline;
  margin-right: 10px;
}
.cmt-date {
  display: inline;
  margin-right: 10px;
  font-size: 12px;
  color: #999;
}
.cmt-content {
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #4d4d4d;
}
/* 有 父评论 的 */
.hasFather {
  /* color: red;
  margin-left: 50px; */
}
/* 评论按钮区域 */
.cmt-box >>> .el-button {
  margin: 0 10px;
  float: right;
  border: 0;
  background-color: white;
  color: #79a5e5;
  font-size: 12px;
}
/* .markdown-body >>> pre {
    font-size: 17px;
    font-weight: 900;
}
.markdown-body >>> .hljs{ 
}*/
</style>