<template>
  <div class="passwordcontainer">
    <div class="passwordheader">
      <el-image :src="src"></el-image>
      <lang-select class="set-language" />
    </div>
    <hr />
    <div class="passwordcontent">
      <h1>忘记密码</h1>
      <div class="content">
        <div class="clearleft">
          <div class="leftcontent">
            <h2>验证</h2>
            <p>
              <span>忘记密码了?</span><br/>
              <span>请填写邮件以获得您新的密码</span>
            </p>
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
            </el-form>
          </div>
          <hr class="contentSeparqtor">
          <div class="rightcontent">
              <h2>安全</h2>
              <ul class="checklist">
                <li>
                  <i class="icon left" aria-hidden="true">✅</i>
                  <span class="item">填写您的邮箱地址并点击“收到验证安全码”</span>
                </li>
                <li>
                  <i class="icon left" aria-hidden="true">✅</i>
                  <span class="item">为了保护您的账号安全，我们将会发送验证码至您的邮箱中。</span>
                </li>
                <li>
                   <i class="icon left" aria-hidden="true">✅</i></i>
                   <span class="item">在此页填入验证码并重设您的新密码</span>
                </li>
              </ul>
          </div>
        </div>
        <div class="clearright">
          <el-button type="info" @click="cancel" plain>取消</el-button>
          <el-button @click="submit" plain>收到安全验证码</el-button>
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
import logo from '../../assets/logo.png'
export default {
  name: 'toemail',
  components: { LangSelect },
  data() {
    return {
      forgetForm:{
        verifycode:'',
      },
      src:logo
    }
  },
  methods:{
    submit(){},
    cancel(){}
  }
}
</script>
<style scoped>
.set-language{
  float:right;
}
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
  margin-top: 70px;
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
.leftcontent{
  display:table-cell;
  padding-left:25px;
  padding-bottom:10px;
  border-right:1px solid #dfdfdf;
  width:463px;
  padding-top:10px;
}
.rightcontent{
   display:table-cell;
   width:606px;
   padding-left:20px;
}
.contentSeparqtor{
  display:none;
}
hr{
  top:10px;
  margin:auto;
  clear:both;
  height:1px;
  padding:0;
  border:0;
  color:#cecece;
  background-color:#cecece;
  line-height:1;
}
h2{
  font-size:1.818em;
  font-weight:normal;
}
.checklist{
   padding-left:0;
}
i{
  font-style:normal;
}
ul{
  list-style:none;
}
.checklist li{
  margin-top:7px;
  line-height:1.5;
}
.checklist .icon{
  width:15px;
  margin-right:5px;
  position:relative;
  font-size:0.8em;
  color:#000;
}
.icon{
  font-family:'MustIcons';
}

.login-form{
  width:360px;
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
