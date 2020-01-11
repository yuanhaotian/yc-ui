<template>
  <div class="home">
    <h2>测试页面</h2>
    <div class="wrap">
      <p class="wrap_title">1.grid</p>
      <div>column:多少列 必须， Number或String；<br/>
        icon 图片地址 必须，（支持iconfront，可传入iconfont类名）String；<br/>
        text显示的文字 必须， 类型没有限制;<br /> 
        idx 必须，按0 1 2 3的顺序，idx值唯一
      </div>
      <!-- demo -->
      <yc_grid :column="4">
        <yc_grid_item :icon="imgurl" :text="'文字'" :idx="0" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="1" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="2" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="3" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="4" />
      </yc_grid> 
      <!-- demo -->
    </div>
  </div>
</template>

<script>
import yc_grid_item from '@/components/yc_grid_item'
import yc_grid from '@/components/yc_grid'

export default {
  name: 'home',
  data(){
    return {
      imgurl:'http://5b0988e595225.cdn.sohucs.com/images/20181219/b8ac5feb275e4b0e83c99d3a9a72eed3.jpeg',
    }
  },
  props: {
    
  },
  mounted(){

  },
  components:{
    yc_grid_item,
    yc_grid,
  }
}
</script>

<style scoped lang="scss">
  .home{
    padding:12px;
  }
  .wrap{
    margin-bottom:20px;
  }
  .wrap_title{
    font-size:30px;
    background-color:#ddd;
  }
</style>
