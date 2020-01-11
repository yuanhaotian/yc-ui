<template>
  <div class="yc_grid">
      <slot />
  </div>
</template>

<script>
export default {
    name: 'yc_grid',
    props: {
        column:{
            type: Number,
            default:3
        }
    },
    mounted(){
        this.$nextTick(()=>{
            var dom = this.$children;
            var gridItemW = (100/this.column)+"%";
            dom.forEach((item,idx)=>{
                item.width=gridItemW;//用百分比
            })
        })
    }
}


</script>

<style scoped lang="scss">
.yc_grid{
    display:flex;
    flex-wrap: wrap;
    overflow: hidden;
}
</style>
