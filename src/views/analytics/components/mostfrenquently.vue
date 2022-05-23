<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">CMA CGM+</span><span class="center">{{ frenquenylylist.cma }}views</span>
      </el-col>
      <el-col :span="12">
        <span class="center">About Us</span><span class="center">{{ frenquenylylist.abountus }}views</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">News Center</span><span class="center">{{ frenquenylylist.newscenter }}views</span>
      </el-col>
      <el-col :span="12">
        <span class="center">Online Service</span><span class="center">{{ frenquenylylist.onlineService }}views</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">Customer Advisory</span><span class="center">{{ frenquenylylist.customerad }}views</span>
      </el-col>
      <el-col :span="12">
        <span class="center">Useful Template and Link</span><span class="center">{{ frenquenylylist.userfultemplate }}views</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="center">Sanction Check</span><span class="center">{{ frenquenylylist.sanctioncheck }}views</span>
      </el-col>
      <el-col :span="12">
        <span class="center">Contant Us</span><span class="center">{{ frenquenylylist.contantus }}views</span>
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
