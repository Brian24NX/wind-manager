<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <el-image v-if="logo2" :src="logo2" class="sidebar-logo2" fit="scale-down" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <el-image v-if="logo1" :src="logo1" class="sidebar-logo1" fit="scale-down" />
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo1 from '../../../assets/header.png'
import logo2 from '../../../assets/logo.png'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Element Admin',
      logo1: logo1,
      logo2: logo2
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo1 {
      width: 150px;
      height: 40px;
      vertical-align: middle;
    }

    & .sidebar-logo2 {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
