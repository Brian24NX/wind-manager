<template>
  <div>
    <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
      <el-table-column :label="$t('buiness.title')" prop="title" />
      <el-table-column align="center" :label="$t('buiness.publishdate')" prop="publishdate" />
      <el-table-column :label="$t('buiness.numberofviews')" prop="numberofviews" align="center" />
      <el-table-column align="center" :label="$t('buiness.numberofsendtoemail')" prop="numberofsendtoemail" />
    </Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Business',
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
