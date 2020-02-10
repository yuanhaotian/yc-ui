<template>
  <div class="yc_card">
    <div class="card_wrap">
        <div class="card_wrap_left">
            <img class="card_wrap_left_img" :src="imgUrl" alt="">
        </div>
        <div class="card_wrap_right">
            <slot />
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'yc_card',
    data(){
        return {
         
        }
    },
    props:{
        imgUrl:{
            type: String,
            default:()=>{}
        }
    },
    created(){
      
    },
    mounted(){
     
    },
    methods:{
      
    }
}

</script>

<style scoped lang="scss">
.card_wrap{
    overflow: hidden;
    display:flex;
    background-color:#333;
}
.card_wrap_left{
    display: flex;
    align-items: center;  
    overflow: hidden;
    width:200px;
}
.card_wrap_left_img{
    display:block;
    width:100%;
    height:150px;
}
.card_wrap_right{
    flex:1;
    padding:10px 20px;
}
</style>
