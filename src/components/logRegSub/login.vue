<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      style="text-align:center"
    >
      <el-form-item prop="username">
        <i class="el-icon-user" style="font-size:20px"></i>
        <el-input type="text" v-model="ruleForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="el-icon-lock" style="font-size:20px"></i>
        <el-input type="password" v-model="ruleForm.password" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 表单验证通过，向服务器请求数据
        if (valid) {
          this.$axios
            .post("/login", {
              username: this.ruleForm.username,
              // 用散列算法给密码加密
              password: this.$crypto.MD5(this.ruleForm.password).words.toString()
            })
            .then(ret => {
              // console.log(ret)
              // console.log(ret.data[0])
              if (ret.data.length === 1) {
                Message.success("登录成功！");
                let info = {
                  userId: ret.data[0].user_id,
                  username: ret.data[0].username,
                  description: ret.data[0].description
                };
                this.$cookies.set("user_id", ret.data[0].user_id);
                this.$cookies.set("user_pw", ret.data[0].password);
                this.$store.commit("login", info);
                this.$router.push("personalCenter");
              } else {
                // 用户名密码验证失败，弹出提示
                Message.error("用户名或密码错误！");
              }
            });
        } else {
          // 表单验证失败
          console.log("invalid");
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("enter");
    console.log(to);
    console.log(from);
    next();
  }
};
</script>

<style scoped>
</style>