<template>
  <div class="login">
    <!--样式在layout/login-->
    <div class="main">
      <el-form :model="form" status-icon :rules="rules" ref="loginForm" class="login-content">
        <el-form-item label="" prop="enterpriseId">
          <el-input
            placeholder="租户ID"
            type="enterpriseId"
            v-model.trim="form.enterpriseId"
            auto-complete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input placeholder="用户名/邮箱" v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            placeholder="密码"
            type="password"
            v-model.trim="form.password"
            auto-complete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <!--<p style="margin-bottom: 24px">用户名：{{test.username}}; 密码：{{test.password}}</p>-->
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            :loading="loading"
            size="medium"
            class="login-button primary-button"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!--<div style="text-align: right">-->
      <!--<nuxt-link to="/register">未有账号，直接注册</nuxt-link>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Emit, Component} from 'vue-property-decorator';

@Component({
  head() {
    return {
      title: 'sPaaS Console 登录',
    };
  },
  naem: 'login',
  layout: 'login',
})
interface //定义接口
formObj {
  username: string;
  password: string;
  enterpriseId: string;
}

export default class Login extends Vue {
  // private loading:boolean = false;
  private form: formObj = {
    username: '',
    password: '',
    enterpriseId: '',
  };

  //定义方法
  validateUserName(rules?: any, value?: any, callback?: any): void {
    if (!value) {
      callback('请输入账号');
    } else {
      callback();
    }
  }
  validatePsw(rules?: any, value?: any, callback?: any): void {
    if (!value) {
      callback('请输入密码');
    } else {
      callback();
    }
  }
  rules: any = {
    username: [
      {
        validator: this.validateUserName,
        trigger: 'blur',
      },
    ],
    password: [
      {
        validator: this.validatePsw,
        required: true,
        trigger: 'blur',
      },
    ],
    enterpriseId: [
      {
        required: true,
        trigger: 'blur',
        message: '请输入租户ID',
      },
    ],
  };
  // 方法
  @Emit()
  toSignUp(): void {
    this.$router.push('/register');
  }

  // 参考https://frontendsociety.com/writing-vuex-stores-in-typescript-b570ca34c2a
  @Emit()
  login() {
    console.log(1111);
    // this.$refs.loginForm.validate(valid => {
    //   if (valid) {
    //     this.loading = true;

    //     const params = {
    //       username: this.form.username,
    //       password: this.form.password,
    //       channel: 'pc',
    //       enterpriseId: this.form.enterpriseId,
    //     };
    //     this.$store
    //       .dispatch('loginByUsername', params)
    //       .then(() => {
    //         this.loading = false;
    //         this.$router.replace('/');
    //       })
    //       .catch(e => {
    //         // TODO 异常处理
    //         this.loading = false;
    //         console.log(e);
    //       });
    //   } else {
    //     return false;
    //   }
    // });
  }
}
</script>

<style lang="less" scoped>
.login {
  .login-button {
    font-weight: 400;
  }
}

.main {
  margin-bottom: 30px;
}
</style>
