<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">{{ this.$t('most.cma') }}/span><span class="center">{{ frenquenylylist.cma }}views</span>
        </span></el-col>
      <el-col :span="12">
        <span class="center">{{ this.$t('most.about') }}</span><span class="center">{{ frenquenylylist.abountus }}views</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">{{ this.$t('most.news') }}</span><span class="center">{{ frenquenylylist.newscenter }}views</span>
      </el-col>
      <el-col :span="12">
        <span class="center">{{ this.$t('most.online') }}</span><span class="center">{{ frenquenylylist.onlineService }}views</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">{{ this.$t('most.customer') }}</span><span class="center">{{ frenquenylylist.customerad }}views</span>
      </el-col>
      <el-col :span="12">
        <span class="center">{{ this.$t('most.useful') }}</span><span class="center">{{ frenquenylylist.userfultemplate }}views</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">{{ this.$t('most.sanction') }}</span><span class="center">{{ frenquenylylist.sanctioncheck }}views</span>
      </el-col>
      <el-col :span="12">
        <span class="center">{{ this.$t('most.contant') }}</span><span class="center">{{ frenquenylylist.contantus }}views</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MostFrenquently',
  data() {
    return {
      frenquenylylist: {
        cma: 1000,
        abountus: 3000,
        newcenter: 2000,
        onlineService: 1100,
        customerad: 1500,
        userfultemplate: 1500,
        sanctioncheck: 500,
        contantus: 300
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.center{
  text-align:center;
  font-size:18px;
  font-weight:600;
}
</style>
