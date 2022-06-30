<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!--<search id="header-search" class="right-menu-item" />-->

        <!--<error-log class="errLog-container right-menu-item hover-effect" />-->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

        <!--<el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>-->

        <lang-select class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!--<el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />-->
          <!-- <img :src="" class="user-avatar"> -->
          <!-- <i class="el-icon-caret-bottom" /> -->
          <!-- <span>{{ userName }}</span>-->
          <span style="position: relative; top: -5px"> {{ userName }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="text-align: center;" @click.native="changePassword">
            {{ $t('navbar.changePass') }}
          </el-dropdown-item>
          <!--<router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item style="text-align: center;" @click.native="logout">
            <span style="display: block">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog :title="$t('forgetForm.changeTitle')" :visible.sync="cgpwdVisible" center destroy-on-close append-to-body :close-on-click-modal="false" width="550px">
        <el-form ref="dataForm" :model="dataForm" :rules="dataFormRules" label-position="top">
          <el-form-item :label="$t('forgetForm.oldPass')" prop="oldPassword">
            <el-input v-model="dataForm.oldPassword" type="password" auto-complete="off" show-password />
          </el-form-item>
          <el-form-item :label="$t('forgetForm.password')" prop="newPassword">
            <el-input v-model="dataForm.newPassword" type="password" auto-complete="off" show-password />
          </el-form-item>
          <el-form-item :label="$t('forgetForm.confirmpassword')" prop="confirmPassword">
            <el-input v-model="dataForm.confirmPassword" type="password" auto-complete="off" show-password />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitChange('dataForm')">{{ $t('forgetForm.yes') }}</el-button>
          <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
// import Search from '@/components/HeaderSearch'
import { changePwd } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    LangSelect
    // Search
  },
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
      if (value !== this.dataForm.newPassword) {
        callback(new Error(this.$t('forgetForm.passwordconsistent')))
      } else {
        callback()
      }
    }
    return {
      userName: JSON.parse(localStorage.getItem('userInfo')).name,
      cgpwdVisible: false,
      dataForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      dataFormRules: {
        oldPassword: { required: true, message: this.$t('forgetForm.oldPasswordtips') },
        newPassword: [
          { required: true, message: this.$t('forgetForm.newPasswordtips') },
          { trigger: blur, validator: checkapssword }
        ],
        confirmPassword: [
          { required: true, message: this.$t('forgetForm.confirmpasswordtips') },
          { trigger: blur, validator: validatePass2 }
        ]
      },
      formLabelWidth1: '100px'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    changePassword() {
      this.cgpwdVisible = true
    },
    submitChange(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log(this.dataForm)
          changePwd({
            oldPwd: this.dataForm.oldPassword,
            newPwd: this.dataForm.newPassword
          }).then((res) => {
            console.log(res)
            this.cgpwdVisible = false
            this.dataForm = {
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
            }
          })
        }
      })
    },
    Cancle() {
      this.cgpwdVisible = false
      this.dataForm = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
