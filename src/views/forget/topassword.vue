<template>
  <div class="passwordcontainer">
    <div class="passwordheader">
      <el-image :src="src" />
      <lang-select class="set-language" />
    </div>
    <hr>
    <div class="passwordcontent">
      <h1 class="forgetTitle">{{ $t('forgetForm.forgotpassword') }}</h1>
      <div class="content">
        <div class="clearleft">
          <div class="leftcontent">
            <el-form ref="forgetForm" :model="forgetForm" :rules="rules" class="login-form" autocomplete="on" label-position="left">
              <el-form-item prop="verifycode">
                <el-input
                  ref="verifycode"
                  v-model="forgetForm.verifycode"
                  size="small"
                  type="text"
                  :placeholder="$t('forgetForm.verifycode')"
                  name="verifycode"
                  tabindex="2"
                  autocomplete="on"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  ref="password"
                  v-model="forgetForm.password"
                  size="small"
                  type="password"
                  :placeholder="$t('forgetForm.password')"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                />
              </el-form-item>
              <el-form-item prop="confirmpassword" style="margin-bottom: 0;">
                <el-input
                  ref="confirmpassword"
                  v-model="forgetForm.confirmpassword"
                  size="small"
                  type="password"
                  :placeholder="$t('forgetForm.confirmpassword')"
                  name="confirmpassword"
                  tabindex="2"
                  autocomplete="on"
                />
              </el-form-item>
            </el-form>
          </div>
          <hr class="contentSeparqtor">
          <div class="rightcontent">
            <h2 class="titles">{{ $t('forgetForm.safe') }}</h2>
            <ul class="checklist">
              <li>
                <i class="icon left" aria-hidden="true">✅</i>
                <span class="item">{{ $t('forgetForm.require') }}</span>
              </li>
              <li>
                <i class="icon left" aria-hidden="true">✅</i>
                <span class="item">{{ $t('forgetForm.requiresix') }}</span>
              </li>
              <li>
                <i class="icon left" aria-hidden="true">✅</i>
                <span class="item">{{ $t('forgetForm.requirerule') }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="clearright">
          <el-button size="small" plain @click="cancel">{{ $t('forgetForm.cancel') }}</el-button>
          <el-button type="primary" size="small" @click="submit('forgetForm')">{{ $t('forgetForm.submit') }}</el-button>
        </div>
      </div>
    </div>
    <div class="passwordfooter">
      <p class="inner">
        © 2022 CMA CGM | <a href="https://www.cma-cgm.com/legal-terms" target="new">{{ $t('forgetForm.terms') }}</a>
      </p>
    </div>
  </div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
import logo from '../../assets/logo.png'
// eslint-disable-next-line no-unused-vars
import { resetPwd } from '@/api/user.js'
export default {
  name: 'Topassword',
  components: { LangSelect },
  data() {
    const checkapssword = (rule, value, callback) => {
      // eslint-disable-next-line no-unused-vars
      const passwordreg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,20}$/
      if (!passwordreg.test(value)) {
        callback(new Error(this.$t('forgetForm.requirerules')))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.forgetForm.password) {
        callback(new Error(this.$t('forgetForm.passwordconsistent')))
      } else {
        callback()
      }
    }
    return {
      forgetForm: {
        verifycode: '',
        password: '',
        confirmpassword: '',
        email: ''
      },
      src: logo,
      rules: {
        verifycode: { required: true, message: this.$t('forgetForm.verifycodetips') },
        password: [{ required: true, message: this.$t('forgetForm.passwordtips') }, { trigger: blur, validator: checkapssword }],
        confirmpassword: [{ required: true, message: this.$t('forgetForm.confirmpasswordtips') }, { trigger: blur, validator: validatePass2 }]
      }
    }
  },
  created() {
    this.forgetForm.email = this.$route.query.email
  },
  methods: {
    // 提交表单
    submit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = {
            email: this.forgetForm.email,
            newPwd: this.forgetForm.password,
            veriCode: this.forgetForm.verifycode
          }
          const res = await resetPwd(data)
          // eslint-disable-next-line eqeqeq
          if (res.code == 200) {
            this.$router.push('/login')
          } else {
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.set-language {
  float: right;
}
.passwordcontainer {
  min-height: 100%;
  width: 1180px;
  margin: 0 auto;
  overflow: hidden;
}

.forgetTitle {
  font-size: 28px;
  font-weight: 400;
  margin: 12px 0;
  color: #184894;
}

.passwordheader {
  margin: 20px 0 10px;
  image {
    width: 79px;
    height: 48px;
  }
}
.passwordfooter {
  margin-top: 70px;
  color: #656565;
  font-size: 12px;
}
.inner {
  padding: 8px 0 20px;
  border-top: 1px solid #d7d7d9;
  position: relative;
  text-align: center;
}
.clearright {
  float: right;
  padding-top: 15px;
}
.inner a {
  background-color: transparent;
  color: #2563d9;
  margin-right: 5px;
}
.clearleft {
  display: flex;
  background: #f5f5f5 none repeat scroll 0 0;
  padding: 15px;
}
.leftcontent {
  display: table-cell;
  padding-left: 25px;
  padding-bottom: 10px;
  border-right: 1px solid #dfdfdf;
  width: 463px;
  padding-top: 10px;
}
.titles {
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 15px;
}
.rightcontent {
  // display: table-cell;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 606px;
  padding-left: 20px;
}
.contentSeparqtor {
  display: none;
}
hr {
  top: 10px;
  margin: auto;
  clear: both;
  height: 1px;
  padding: 0;
  border: 0;
  color: #cecece;
  background-color: #cecece;
  line-height: 1;
}
h2 {
  font-size: 1.818em;
  font-weight: normal;
}
.checklist {
  padding-left: 0;
  font-size: 12px;
  margin: 0;
}
i {
  font-style: normal;
}
ul {
  list-style: none;
}
.checklist li {
  margin-top: 7px;
  line-height: 1.5;
}
.checklist .icon {
  width: 15px;
  margin-right: 5px;
  position: relative;
  font-size: 0.8em;
  color: #000;
}
.icon {
  font-family: 'MustIcons';
}

.login-form {
  width: 360px;
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
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
