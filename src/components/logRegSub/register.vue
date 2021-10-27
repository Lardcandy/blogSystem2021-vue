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
        <!-- <i class="el-icon-user" style="font-size:20px"></i> -->
        <el-input
          type="text"
          v-model="ruleForm.username"
          placeholder="用户名"
          suffix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <!-- <i class="el-icon-lock" style="font-size:20px"></i> -->
        <el-input
          type="password"
          v-model="ruleForm.password"
          placeholder="密码"
          suffix-icon="el-icon-lock"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <!-- <i class="el-icon-message" style="font-size:20px"></i> -->
        <el-input type="email" v-model="ruleForm.email" placeholder="邮箱">
          <el-button
            @click="mailValidate"
            slot="append"
            :disabled="mailValidate_btn"
          >{{ mailValidate_btn_val }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="validateCode">
        <el-input type="text" v-model="ruleForm.validateCode" placeholder="验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  data() {
    // 验证邮箱是否已存在
    var validateEmail = (rule, value, callback) => {
      this.$axios
        .post("/validator/email", {
          email: value
        })
        .then(ret => {
          // 数据库没有重复的username
          if (ret.data.length === 0) {
            callback();
          } else {
            callback(new Error("邮箱已存在"));
          }
        });
    };

    // 验证用户名是否已存在
    var validateUsername = (rule, value, callback) => {
      this.$axios
        .post("/validator/username", {
          username: value
        })
        .then(ret => {
          // 数据库没有重复的username
          if (ret.data.length === 0) {
            callback();
          } else {
            callback(new Error("用户名已存在"));
          }
        });
    };
    // 验证验证码是否匹配
    var validateCode = (rule, value, callback) => {
      let MD5_validateCode = this.$crypto
        .MD5(this.ruleForm.validateCode)
        .words.toString();
      if (MD5_validateCode == this.mailValidate_code) {
        callback();
      } else {
        callback(new Error("验证码错误"));
      }
    };
    return {
      mailValidate_btn: false,
      mailValidate_btn_val: "发送验证码",
      mailValidate_code: "",
      ruleForm: {
        email: "",
        username: "",
        password: "",
        validateCode: ""
      },
      rules: {
        email: [
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          },
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          {
            validator: validateEmail,
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在2 ~ 20以内",
            trigger: "blur"
          },
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 8,
            max: 20,
            message: "密码长度在8 ~ 20以内",
            trigger: "blur"
          }
        ],
        validateCode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          },
          {
            validator: validateCode,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 邮箱验证
    mailValidate() {
      if (this.ruleForm.email.trim()) {
        let timeout1 = null;
        this.mailValidate_btn = true;
        // 倒计时
        this.mailValidate_btn_val = "59s后重试";
        let seconds = 59;
        let interval1 = setInterval(() => {
          seconds--;
          this.mailValidate_btn_val = `${seconds}s后重试`;
        }, 1000);
        setTimeout(() => {
          clearInterval(interval1);
          this.mailValidate_btn = false;
          this.mailValidate_btn_val = "发送验证码";
        }, 60000);

        this.$axios
          .post("/mailValidate", {
            email: this.ruleForm.email
          })
          .then(ret => {
            this.mailValidate_code = ret.data;
            // 五分钟后验证码失效
            clearTimeout(timeout1);
            timeout1 = setTimeout(() => {
              this.mailValidate_code = "";
            }, 300000);
          })
      }
    },
    submitForm(formName) {
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证通过，请求服务器发送数据
          // MD5加密密码
          let pwMD5 = this.$crypto.MD5(this.ruleForm.password).words.toString();
          this.$axios
            .post("/register", {
              email: this.ruleForm.email,
              username: this.ruleForm.username,
              password: pwMD5
            })
            .then(ret => {
              // console.log('return: ')
              // console.log(ret)
              if (ret.status === 200) {
                // 注册成功，跳转到个人中心
                Message.success("注册成功！");
                let info = {
                  userId: ret.data.insertId,
                  username: this.ruleForm.username,
                  description: ""
                };
                this.$store.commit("login", info);
                this.$cookies.set("user_id", info.userId);
                this.$cookies.set("user_pw", pwMD5);
                // window.location.hash = "#/";
                this.$router.push("personalCenter");
              } else {
                // 注册失败
                Message.error('注册失败！' + ret)
                console.log(ret);
              }
            });
        } else {
          console.log("invalid");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>