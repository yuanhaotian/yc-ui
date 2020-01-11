<template>
  <div class="yc_grid_item" :style="{width:itemWidth}" @touchstart="addCss" @touchend="removeCss">
        <div class="grid_item">
            <div class="grid_item_box">
                <img class="grid_item_box_img" :src="icon" alt="" v-if="icon.slice(0,4)=='http' ">
                <i :class="['iconfont',icon]" v-else></i>
            </div>
            <p class="grid_item_txt">{{text}}</p>
        </div>
  </div>
</template>

<script>
export default {
    name: 'yc_grid_item',
    props: {
        text:{
            default:()=>{}
        },
        icon:{
            type: String,
            default:()=>{}
        },
        idx:{
            type:Number,
        }
    },
    data(){
        return {
           itemWidth:0, 
        }
    },
    created(){
        setTimeout(()=>{
            this.itemWidth = this.width;
        },50);
        
    },
    mounted(){
     
    },
    methods:{
        addCss:function(){
            var dom = document.querySelectorAll(".yc_grid_item")[this.idx];
            dom.style.backgroundColor = '#eaebec';
        },
        removeCss:function(){
            var dom = document.querySelectorAll(".yc_grid_item")[this.idx];
            dom.style.backgroundColor = '';
        }
    }
}


</script>

<style scoped lang="scss">
.yc_grid_item{
    overflow: hidden;
    background-color:#fff;
}
.grid_item{
    padding:32px 16px;
}
.grid_item_box{
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.grid_item_box_img{
    display:block;
    width:56px;
    height:56px;
}
.iconfont{
    font-size:56px;
}
.grid_item_txt{
    margin-top:16px;
    color: #646566;
    font-size: 24px;
    word-wrap: break-word;
    text-align:center;
}
</style>
