<template>
  <div>
    <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
      <el-table-column :label="$t('cmg.title')" prop="title" />
      <el-table-column align="center" :label="$t('cmg.publishdate')" prop="publishdate" />
      <el-table-column :label="$t('cmg.numberofviews')" prop="numberofviews" align="center" />
      <el-table-column align="center" :label="$t('cmg.numberoflinkes')" prop="numberoflikes" />
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
