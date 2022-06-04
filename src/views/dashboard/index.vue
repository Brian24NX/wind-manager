<template>
  <div class="dashboard-container">
    <!--<component :is="currentRole" />-->
    <!-- <p>Welcome Wind!</p> -->
    <el-card body-style="height: calc(100vh - 100px);">
      <el-image :src="require('@/assets/welcome.png')" fit="aspectFit" />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getInfo } from '@/api/user'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
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
