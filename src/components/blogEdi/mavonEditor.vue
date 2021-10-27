<template>
  <div id="editor">
    <mavon-editor
      ref="md"
      style="height: 100%"
      :toolbars="toolbarOpt"
      placeholder="雜貨鋪裏有酒，就差你寫下的故事..."
      @change="$change"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      :value="parent_atcContent"
    ></mavon-editor>
  </div>
</template>
    
    <script>
// 本地注册mavon-editor
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

// var uuid = require("uuid")
// var COS = require("cos-js-sdk-v5");

export default {
  name: "editor",
  data() {
    return {
      img_file: {},
      toolbarOpt: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  methods: {
    $change(atcContent, renderVal) {
      this.$emit("getContent", atcContent, renderVal);
      // this.$emit('getHtmlContent', renderVal)
    },
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    uploadimg() {
      // console.log(this.img_file);
      // 1.将图片上传到服务器.
      var formdata = new FormData();
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
      }

      // this.$axios.get('/getCOStoken')
      // .then(res => {
      //   console.log(res)
      // })

      this.$axios({
        url: "/imgAdd",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        console.log(res)
        /**
         * 例如：返回数据为 res = [[pos, url], [pos, url]...]
         * pos 为原图片标志（0）
         * url 为上传后图片的url地址
         */
        // 2.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // for (var imgName in res) {
        //     this.$refs.md.$img2Url('filenameeffaf',imgName);
        // }
        this.$refs.md.$imglst2Url(res.data);
      });
    }
    // $imgAdd(pos, $file) {
    //   // 1.将图片上传到服务器
    //   let formData = new FormData()
    //   formData.append('image', $file)
    //   this.$axios({
    //     url: "/imgAdd",
    //     method: 'post',
    //     data: formData,
    //     headers: { 'Content-Type': "multipart/form-data"},
    //   }).then(url => {
    //     // 2.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //     mavonEditor.$img2Url(pos, url);
    //   })
    // }
  },
  components: {
    mavonEditor
  },
  props: ["parent_atcContent"]
  // mounted() {
  //   this.atc_content = this.parent_atcContent

  // }
  // this.atc_content = this.parent_atcContent
  // 若 要处理的文章信息 不为空
  // if (this.$store.state.operateAtc) {
  //   this.atc_content = this.$store.state.operateAtc.article_content;
  // } else {
  //   // 没有要处理的文章信息
  //   this.atc_content = "";
  // }
};
</script>

<style>
#editor {
  margin: auto;
  width: 100%;
  height: 600px;
}
</style>