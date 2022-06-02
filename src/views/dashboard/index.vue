<template>
  <div class="dashboard-container">
    <!--<component :is="currentRole" />-->
    <p>Welcome Wind!</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/user'
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
  created() {
    getInfo(1)

    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
