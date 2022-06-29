<template>
  <div class="dashboard-container">
    <div v-if="show" class="homepageContainer">
      <el-image style="width: 100%;height: 100%;" :src="require('@/assets/welcome_1.png')" fit="contain" />
    </div>
    <div v-else class="homepageContainer2">
      <el-image style="width: 100%;height: 100%;" :src="require('@/assets/welcome_2.png')" fit="cover" />
      <el-image class="leftTop" :src="require('@/assets/leftTop.png')" fit="scale-down" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {}
}
</script>
<style scoped lang="scss">
.homepageContainer {
  width: 100%;
  height: calc(100vh - 90px);
  background: url(../../assets/welcome.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.homepageContainer2 {
  width: 100%;
  height: calc(100vh - 90px);
  position: relative;

  .leftTop {
    width: 20vw;
    position: absolute;
    top: 100px;
    left: 100px;
    z-index: 10;
  }
}
</style>
