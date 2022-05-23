<template>
  <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
    <el-table-column :label="$t('useful.title')" prop="title" />
    <el-table-column align="center" :label="$t('useful.publishdate')" prop="publishdate" />
    <el-table-column :label="$t('useful.numberofsendtoemail')" prop="numberofsendtoemail" align="center" />
  </Pagination>
</template>

<script>
export default {
  name: 'UsefulTemplate',
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
