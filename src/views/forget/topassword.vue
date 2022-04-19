<template>
  <div class="passwordcontainer">
    <div class="passwordheader">
      <image src="../../assets/logo.png"></image>
      <lang-select class="set-language" />
    </div>
    <hr />
    <div class="passwordcontent">
      <h1>忘记密码</h1>
      <div class="content">
        <div class="clearleft">
            <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" class="login-form" autocomplete="on" label-position="left">
            <el-form-item prop="verifycode">
            <el-input
              :key="verifyType"
              ref="verifycode"
              v-model="forgetForm.verifycode"
              :type="text"
              :placeholder="$t('forgetForm.verifycode')"
              name="verifycode"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            />
            </el-form-item>
            <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="forgetForm.password"
              :type="passwordType"
              :placeholder="$t('forgetForm.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            />
            </el-form-item>
            <el-form-item prop="verifycode">
            <el-input
              :key="passwordType"
              ref="confirmpassword"
              v-model="forgetForm.confirmpassword"
              :type="passwordType"
              :placeholder="$t('forgetForm.password')"
              name="confirmpassword"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            />
            </el-form-item>
          </el-form>
        </div>
        <div class="clearright">
          <el-button type="info" @click="cancel" plain>取消</el-button>
          <el-button @click="submit" plain>提交</el-button>
        </div>
      </div>
    </div>
    <div class="passwordfooter">
      <p class="inner">© 2022 CMA CGM | <a href="https://www.cma-cgm.com/legal-terms" target="new">法律条款</a>| <span>4.3.3-4</span></p>
    </div>
  </div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
export default {
  name: 'topassword',
  components: { LangSelect },
  data() {
    return {
      forgetForm:{
        verifycode:'',
        password:'',
        confirmpassword:'',
      }
    }
  },
}
</script>
<style scoped>
.passwordcontainer {
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.passwordheader {
  margin-top: 20px;
  image {
    width: 79px;
    height: 48px;
  }
}
.passwordfooter {
  margin-top: 50px;
  color: #656565;
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
  background: #f5f5f5 none repeat scroll 0 0;
  padding: 15px;
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
