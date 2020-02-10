<template>
  <div class="home">
    <h2>测试页面</h2>
    <div class="wrap">
      <p class="wrap_title">1.grid 九宫格</p>
      <div>column:多少列 必须， Number或String；<br/>
        icon 图片地址 必须，（支持iconfront，可传入iconfont类名）String；<br/>
        text显示的文字 必须， 类型没有限制;<br /> 
        idx 必须，按0 1 2 3的顺序，idx值唯一
      </div>
      <!-- demo -->
      <yc_grid :column="5">
        <yc_grid_item :icon="imgurl" :text="'文字'" :idx="0" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="1" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="2" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="3" />
        <yc_grid_item :icon="'icontupian'" :text="'文字'" :idx="4" />
      </yc_grid> 
      <!-- demo -->
    </div>
    <div class="wrap">
      <p class="wrap_title">2.star 星星评分</p>
      <div>
        starnum:Number 默认5个
        重复点击统一课星星，会取消选择
      </div>
      <!-- demo -->
      <yc_star :starnum="10" :seletStar="seletStar" v-on:changeStar="changeStar"></yc_star>
      <!-- demo-->
    </div>
    <div class="wrap">
      <p class="wrap_title">3.copy 复制到剪贴板</p>
      <div>
        <p>文字复制到剪贴板</p>
        <p>用原生实现，避免加载多余插件</p>
      </div>
      <!-- demo -->
      <button class="copy_btn" @click="copyTxt('这是需要被复制到文字,说明已经成功了')">点击复制</button>
      <!-- demo-->
    </div>
    <div class="wrap">
      <p class="wrap_title">4.卡片组件</p>
      <div>
        <p>左图，右内容；</p>
        <p>右边内容自定义,因为卡片的样式很多样，满足更多需求</p>
        <p>左边图片，宽等于父级，高样式自己控制，图片上下居中</p>
      </div>
      <!-- demo -->
      <yc_card :imgUrl="imgurl">
        <p>1.薛之前</p>
        <p>2.李志</p>
        <p>1.新裤子</p>
        <p>1.新裤子</p>
      </yc_card>
      <!-- demo-->
    </div>
    <div class="wrap">
      <p class="wrap_title">5.日历组件</p>
      <div>
        <p>常规操作是个日历</p>
        <p>用原生js，不用jq，减少对插件依赖</p>
        <p>遮罩层z-index：100，如果出现样式层级问题，可以改</p>
        <p>组件isShow控制日历显示隐藏</p>
        <p>选择日期后,组件返回到是new Date对象，可以自己用api取年月日，使用更自由</p>
        <p>timeText是日历组件初始化到值，是new Date出的对象</p>
      </div>
      <!-- demo -->
      <p>{{timeText}}</p>
      <button class="btn" @click = "changeShow">点击显示组件</button>
      <yc_calendar :isShow="showCalendar" v-on:chageCalendar="chageCalendar" :initTime='timeText' />
      <!-- demo-->    
    </div>
  </div>
</template>

<script>
import yc_grid_item from '@/components/yc_grid_item'
import yc_grid from '@/components/yc_grid'
// import yc_swipe from '@/components/yc_swipe'
// import yc_swipe_item from '@/components/yc_swipe_item'
import yc_star from "@/components/yc_star"
// import yc_imgupload from "@/components/yc_imgupload"
import yc_calendar from "@/components/yc_calendar"
import yc_card from "@/components/yc_card"

export default {
  name: 'home',
  data(){
    return {
      seletStar:0,//选中的星星数量
      imgurl:'http://5b0988e595225.cdn.sohucs.com/images/20181219/b8ac5feb275e4b0e83c99d3a9a72eed3.jpeg',
      showCalendar:false,
      timeText:'未选择日期'//初始日期，new Date（）出到对象
    }
  },
  props: {
    
  },
  mounted(){

  },
  methods:{
    changeStar(seletStar){
      this.seletStar = seletStar; 
    },
    copyTxt(txt){
      var oInput = document.createElement("input");
      var obody = document.querySelector("body");

      oInput.value = txt;
      obody.append(oInput);

      try{
        oInput.select();
        document.execCommand('Copy',"false",null);
      }catch(err){
        alert("复制错误,请手动复制");
      }
      oInput.style.visibility = "hidden";
    },
    changeShow:function(){
      this.showCalendar = true;
    },
    chageCalendar:function(time){
      this.showCalendar = false;
      if(time){
        this.timeText = time;
      }
    },
  },
  components:{
    yc_grid_item,
    yc_grid,
    // yc_swipe,
    // yc_swipe_item,
    yc_star,
    // yc_imgupload
    yc_calendar,
    yc_card,
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
  .copy_btn{
    width:180px;
    height:40px;
    background-color:grey;
  }
  .btn{
    background-color:grey;
  }
</style>
