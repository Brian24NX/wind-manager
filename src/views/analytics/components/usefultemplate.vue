<template>
  <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
    <el-table-column :label="$t('useful.title')" prop="title" />
    <el-table-column align="center" :label="$t('useful.numberofviews')" prop="publishdate" />
    <el-table-column :label="$t('useful.numberofsendtoemail')" prop="numberofsendtoemail" align="center" />
  </Pagination>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'UsefulTemplate',
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
