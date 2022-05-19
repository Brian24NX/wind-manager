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
      <div class="chart-container">
        <chart height="400px" width="100%" />
      </div>
      <div class="total">
        <span class="total">Total followers:</span><span class="total">12,000</span>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'
export default {
  name: 'Statistics',
  components: { Chart },
  data() {
    return {
      queryParams: { usertpye: 1, time: '' },
      userTypeList: [{ value: 1, label: 'Mini-Program Users' }, { value: 2, label: 'WeChat Official Account Followers' }, { value: 3, label: 'Mini-Program Number of Visits' }]
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
  .chart-container{
     position:relative;
     width:100%
  }
  .total{
    font-size:18px;
    font-weight:600;
  }
</style>
