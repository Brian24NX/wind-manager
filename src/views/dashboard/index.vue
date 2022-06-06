<template>
  <div class="dashboard-container">
    <el-card body-style="height: calc(100vh - 100px);">
      <el-image style="width: 100%;height: 100%;" :src="require('@/assets/welcome.png')" fit="contain" />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
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
