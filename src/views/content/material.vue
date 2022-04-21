<template>
  <div class="librarycontainer">
    <div slot="header" class="clearfix">
      <span>{{ $t('library.title') }}</span>
    </div>
    <div class="greycontainer">
      <div class="left">
        <el-checkbox>{{$t('library.allselect')}}</el-checkbox>
        <el-button>{{$t('library.category')}}</el-button>
        <el-button>{{$t('library.delete')}}</el-button>
      </div>
      <div class="right">
        <el-select v-model="value">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-button>{{$t('library.upload')}}</el-button>
        <el-button>{{$t('library.categorysetting')}}</el-button>
      </div>
    </div>
    <div class="listcontainer">
      <div class="cardcontainer" v-for="(item, index) in librarylist" :key="index">
        <el-image :src="item.src" mode="aspectFit" class="imgsrc"/>
        <el-button class="table-cell" icon="el-icon-edit"></el-button>
        <el-button class="table-cell" icon="el-icon-guide"></el-button>
        <el-button class="table-cell" icon="el-icon-delete"></el-button>
        <el-checkbox v-model="item.checked">{{ item.name }}</el-checkbox>
      </div>
    </div>
     <Pagination v-show="total > 0" :total="total" :page="page" :limit="limit" @pagination="getlist"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination2'
export default {
  name: 'material',
  components: { Pagination },
  data() {
    return {
      //全选参数

      librarylist: [
        {
          src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: '4a731a90594a4af544c0c25941171jpeg.jpeg',
          checked: false,
        },
        {
          src: " https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: '4a731a90594a4af544c0c25941171jpeg.jpeg',
          checked: false,
        },
        {
          src: " https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: '4a731a90594a4af544c0c25941171jpeg.jpeg',
          checked: false,
        },
      ],
      total: 3,
      page: 1,
      limit: 10,
    }
  },
  methods: {
    getlist() {},
  },
}
</script>
<style scoped>
.librarycontainer{
  width :100%;
}
.greycontainer{
   background-color:#f0f0f0;
   margin:15px;
   height: 50px;
   line-height: 50px;
}
.left{
  float:left;
}
.right{
   float:right;
}
.listcontainer{
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:flex-start;
}
.cardcontainer{
   width:200px;
   height:225px;
}
.cardcontainer:not(:first-child){
    margin-left:25px;
}
.imgsrc{
  width:190px;
  height:160px;
}
.table-cell{
  display:table-cell;
}
</style>
