<template>
  <div class="yc_star">
     <div class="staWrap">
       	<span :class="['stars',val]" v-for="(val,idx) in starClass3" :key="idx" @click = "changeStar(idx)">★</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'yc_star',
    props: {
        starnum:{
            type: Number,
            default:5
        },
        seletStar:{
            type:Number,
            default:0,
        }
    },
    data(){
        return {
            starClass3:Array.from({length:this.starnum},(v,k)=>{return "stars"}),
        }
    },
    mounted(){
     
    },
    methods:{
        changeStar(idx){
            var result = Array.from({length:this.starnum},(v,k)=>{return "stars"});
            var nowIdx = idx+1;

            //星星重复点击，去掉颜色
            var starClass3 = this.starClass3;
            var num=0;
            starClass3.map(val=>{
                if(val=='starRed'){
                   num++;
                }
            })
          
            if(num==nowIdx){
                this.starClass3= Array.from({length:this.starnum},(v,k)=>{return "stars"});
            }else{
                for(var i=0;i<nowIdx;i++){
                    result[i] = 'starRed';
                }
                this.starClass3 = result;
            }

            //给父级
            var emitNum = 0;
            this.starClass3.map((val,idx)=>{
                if(val=="starRed"){
                    emitNum++;
                }
            });
            this.$emit('changeStar',emitNum);//给父组件数量
        }
    }
}


</script>

<style scoped lang="scss">
.yc_star{
    overflow: hidden;
}
.stars{
    font-size:20px;
    margin:0 10px;
}
.starRed{
    color:red;
}
</style>
