<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.usertpye" placeholder="请选择" clearable filterable style="width: 100%">
                <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-date-picker
                v-model="queryParams.time"
                type="daterange"
                start-placeholder="StartTime"
                end-placeholder="EndTime"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="download">Download</el-button>
      </div>
      <!--echart图表-->
      <div v-if="queryParams.usertpye==1">
        <!--图表1-->
      </div>
      <div v-if="queryParams.usertpye==2">
        <!--图表1-->
      </div>
      <div v-if="queryParams.usertpye==3">
        <!--图表1-->
      </div>
      <div v-if="queryParams.usertpye==4">
        <!--图表1-->
      </div>
      <div v-if="queryParams.usertpye==5">
        <!--图表1-->
      </div>
      <div v-if="queryParams.usertpye==6">
        <!--图表1-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      msg: ''
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    search() {

    }
  }
}
</script>

<style scoped>

</style>
