<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
body {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  margin: 0;
  color: #4c4c4c;
}
.el-button--text {
  color: #e10202;
}

.searchContainer {
  margin-bottom: 20px;
  padding: 15px 34px 15px 24px;
  background-color: #fff;
}

.tableContainer {
  background: #ffffff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.15);
  padding: 20px;

  .operations {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 28px;
  }
}

.detailContent {
  word-break: break-all;
  background-color: #F5F7FA;
  border: 1px solid #dfe4ed;
  padding: 10px 20px;
  border-radius: 6px;
  overflow: hidden;
  line-height: 1.6;

  p {
    padding: 0;
    margin: 0;
  }
}

.el-dialog__header {
  padding: 10px 20px;
}

.el-dialog__headerbtn {
  top: 12px;
}

.el-form-item__label {
  word-break: break-word;
}

.el-icon-search {
  cursor: pointer;
}

.wscnph {
  max-width: 100%;
  height: auto;
}
</style>
