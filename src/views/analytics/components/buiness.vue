<template>
  <div>
    <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
      <el-table-column :label="$t('news.title')" prop="title" />
      <el-table-column align="center" :label="$t('news.publishdate')" prop="publishdate" />
      <el-table-column :label="$t('news.numberofviews')" prop="numberofviews" align="center" />
      <el-table-column align="center" :label="$t('news.numberofsendtoemail')" prop="numberofsendtoemail" />
    </Pagination>
  </div>
</template>

<script>
export default {
  name: 'Business',
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
