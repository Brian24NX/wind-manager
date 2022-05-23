<template>
  <div>
    <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
      <el-table-column :label="$t('cma.title')" prop="title" />
      <el-table-column align="center" :label="$t('cma.publishdate')" prop="publishdate" />
      <el-table-column :label="$t('cma.numberofviews')" prop="numberofviews" align="center" />
      <el-table-column align="center" :label="$t('cma.numberoflinkes')" prop="numberoflikes" />
    </Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'CMACGM',
  components: { Pagination },
  data() {
    return {
      queryParams: {}
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

</style>
