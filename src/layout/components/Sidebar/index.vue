<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        unique-opened
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item v-for="route in user_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sidebar', 'user_routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
.submenu-title-noDropdown {
  padding-left: 15px !important;
}

.el-submenu__title {
  padding: 0 10px;
  padding-left: 15px !important;

  span {
    word-break: break-word;
    width: calc(100% - 35px);
    display: inline-block;
    white-space: normal;
    line-height: normal;
  }
  i {
    right: 10px !important;
  }
}

.el-menu .el-menu--inline {
  .el-submenu {
    .el-submenu__title {
      padding-left: 30px !important;
      span {
        word-break: break-word;
        width: calc(100% - 15px);
        display: inline-block;
        white-space: normal;
        line-height: normal;
      }
    }
  }

  ul > .nest-menu > a > .el-menu-item {
    padding: 0 10px !important;
    padding-left: 45px !important;
    span {
      word-break: break-word;
      width: 100%;
      display: inline-block;
      white-space: normal;
      line-height: normal;
    }
  }
}

.nest-menu > a > li {
  padding: 0 10px !important;
  padding-left: 30px !important;
  span {
    word-break: break-word;
    width: 100%;
    display: inline-block;
    white-space: normal;
    line-height: normal;
  }
}

.submenu-title-noDropdown > span {
  word-break: break-word;
  width: 100%;
  display: inline-block;
  white-space: normal;
  line-height: normal;
}
</style>
