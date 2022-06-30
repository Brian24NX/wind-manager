<template>
  <div class="login-container">
    <div class="login">
      <div class="loginleft">
        <el-image :src="require('../../assets/logo.svg')" class="left25" />
      </div>
      <div class="loginright">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
          <lang-select class="set-language" />
          <div class="title-container">
            <h3 class="title">
              {{ $t('login.title') }}
            </h3>
          </div>
          <el-form-item prop="username">
            <el-input ref="username" v-model="loginForm.username" size="large" clearable :placeholder="$t('login.username')" name="username(Email)" type="text">
              <svg-icon slot="prefix" icon-class="email" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.password"
              size="large"
              type="password"
              clearable
              show-password
              :placeholder="$t('login.password')"
              :minlength="6"
              :maxlength="20"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" icon-class="password" />
            </el-input>
          </el-form-item>

          <el-button :loading="loading" type="danger" style="width: 100%; margin-bottom: 30px; margin-top: 20px" @click.native.prevent="handleLogin">
            {{ $t('login.logIn') }}
          </el-button>
          <router-link class="link" to="/forget/toemail">{{ $t('login.forgetpassword') }}</router-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import logo from '../../assets/header.png'
export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    const email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const validateUsername = (rule, value, callback) => {
      if (!email.test(value)) {
        callback(new Error(this.$t('login.usernametips')))
      } else {
        callback()
      }
    }
    const checkapssword = (rule, value, callback) => {
      const passwordreg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,20}$/
      if (!passwordreg.test(value)) {
        callback(new Error(this.$t('forgetForm.requirerule')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      src: logo,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: checkapssword }]
      },
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  min-width: 1200px;
  margin: auto;
  .el-input {
    // display: inline-block;
    // height: 47px;
    width: 100%;

    input {
      background-color: #e5eefe;
      border-radius: 4px;
      color: #4f575b;
      border: 0;
    }

    // input {
    //   background: transparent;
    //   border: 0px;
    //   -webkit-appearance: none;
    //   border-radius: 0px;
    //   padding: 12px 5px 12px 15px;
    //   color: $light_gray;
    //   height: 47px;
    //   caret-color: $cursor;

    //   &:-webkit-autofill {
    //     box-shadow: 0 0 0px 1000px $bg inset !important;
    //     -webkit-text-fill-color: $cursor !important;
    //     background-color: #04246a !important;
    //   }
    // }
  }

  // .el-form-item {
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   background: rgba(0, 0, 0, 0.1);
  //   border-radius: 5px;
  //   color: #454545;
  // }
  .link {
    background-color: transparent;
    color: #2563d9;
    margin-bottom: 20px;
    float: right;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  min-width: 100%;
  background-color: #eef0f3;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 1200px;
  }
  .loginleft {
    width: 630px;
    height: 712px;
    display: table-cell;
    background: url('../../assets/bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;

    .left25 {
      width: 309px;
      height: 88px;
      position: absolute;
      left: 16px;
      top: 30px;
    }
  }
  .loginright {
    width: 570px;
    height: 712px;
    display: table-cell;
    background-color: #04246a;
  }
  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    input {
      background-color: #fff;
    }
  }
  .set-language {
    color: #fff;
    position: absolute;
    top: 13px;
    font-size: 18px;
    right: 0px;
    cursor: pointer;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
