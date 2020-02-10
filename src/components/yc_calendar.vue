<template>
  <div class="yc_calendar" v-if="isShow">
    <div class="yc_calendar_cover">
      <div class="calendar_wrap">
        <div class="calendar_wrap_head">
          <img class="calendar_wrap_head_icon" @click="lastMonth" src="../static/img/arrow_left.png" alt="">
          <p class="calendar_wrap_head_text">{{showTime}}</p>
          <img class="calendar_wrap_head_icon"  @click="nextMonth" src="../static/img/arrow_right.png" alt="">
        </div>
        <ul class="calendar_wrap_uls">
          <li class="calendar_wrap_uls_lis calendar_wrap_uls_lisTitle">
            <span class="calendar_wrap_lis_spans">一</span>
            <span class="calendar_wrap_lis_spans">二</span>
            <span class="calendar_wrap_lis_spans">三</span>
            <span class="calendar_wrap_lis_spans">四</span>
            <span class="calendar_wrap_lis_spans">五</span> 
            <span class="calendar_wrap_lis_spans">六</span> 
            <span class="calendar_wrap_lis_spans">日</span> 
          </li>
          <li class="calendar_wrap_uls_lis" v-for="(val,idx) in dateArray" :key="idx">
            <span 
              :class="['calendar_wrap_lis_spans',(idx==idxLi&&idx2==idxSpan)?'calendar_wrap_lis_spanCheck':'']" 
              v-for="(val2,idx2) in val" 
              :key="idx2"
              @click="checkSpan(idx,idx2)"
            >
              {{val2 ? val2.getDate() : ""}}
            </span>
          </li>
        </ul>
        <div class="calendar_wrap_ctrl">
          <p class="calendar_wrap_ctrl_check calendar_wrap_ctrl_checkLeft" @click="closeCalendar('check')">确认</p>
          <p class="calendar_wrap_ctrl_check" @click="closeCalendar('cancel')">取消</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
new Date(year,month-1,day);
时间越界自动进位、退位
getFullYear()
getMonth()
getDate() 一月中几号
getDay() 周几[1,2,3,4,5,6,0]

当月第一天 new Date(year,month-1,1)
当月最后一天 new Date(year,month,0)
*/
export default {
    name: 'yc_calendar',
    data(){
        return {
          dateArray:[],
          chageMonth:0,//月份和当前月份差值
          checkTime:null,//选择日历改变这个值
          showTime:'',//日历头部显示文字
          idxLi:-1,//选中多少行
          idxSpan:-1,//选中多少列
        }
    },
    props:{
      isShow:{
        default:false,
        type:Boolean
      },
      initTime:{}
    },
    created(){
    },
    mounted(){
      if(typeof this.initTime=='string'){
        var date = new Date();
        this.checkTime = date;
        this.initDate();//初始化日历时间

        var month = date.getMonth()+1;
        this.showTime = date.getFullYear()+"-"+(month<10 ? '0'+month : month);//初始化日历标题
      }else if(this.initTime instanceof Object){
        var initTime = this.initTime;
        this.checkTime = initTime;
        this.initDate(initTime.getFullYear(),initTime.getMonth());

        var month = initTime.getMonth()+1;
        this.showTime = initTime.getFullYear()+"-"+((month<10 ? '0'+month : month));//初始化日历标题
      }
    },
    methods:{
      initCheck:function(){
        var date = this.checkTime;
        var dateArray = this.dateArray;

        //同年同月，查找
        if(date && date.getFullYear()==dateArray[1][0].getFullYear() && date.getMonth()==dateArray[1][0].getMonth()){
          for(var i=0,len=dateArray.length;i<len;i++){
            for(var j=0,lenJ=dateArray[i].length;j<lenJ;j++){
              if(dateArray[i][j] && dateArray[i][j].getDate()==date.getDate()){
                  this.idxLi = i;
                  this.idxSpan = j;
                  return;
              }
            }
          }
        }
        //没有选中都
        this.idxLi = -1;
        this.idxSpan = -1;
      },
      initDate:function(year,month){
        var date = new Date();
        var year = year==undefined ? date.getFullYear() : year;
        var month = month==undefined ? date.getMonth() : month;//加1是实际月份，toString是可能输入为0

        var monthFirst = new Date(year,month,1);//某月第一天
        var monthLast = new Date(year,month+1,0);//某月最后一天
        var lastMonthDay = monthLast.getDate();
        var result = [];
        var tempArr = [];
        //第一行处理
        var lenJ=monthFirst.getDay();
        if(lenJ==0){lenJ=7}
        if(lenJ != 0){
          for(var j=1;j<lenJ;j++){
            tempArr.push("");
          }
        }

        for(var i=0;i<lastMonthDay;i++){
          var date = new Date(monthFirst.getTime()+i*24*60*60*1000);//第i天后第date对象
          tempArr.push(date);

          //够7个，或者到最后一天不满7个
          if(i==lastMonthDay-1){
            var len = 7-tempArr.length;
            for(var x=0;x<len;x++){
              tempArr.push("");
            }
            result.push(tempArr);
          }else if(tempArr.length>=7){
            result.push(tempArr);
            tempArr = [];
          }
        }
        this.dateArray = result;
        //初始化 或 上一月下一月切回来
        this.initCheck();
      },
      closeCalendar:function(type){
        if(type=='check'){
          this.$emit('chageCalendar',this.checkTime);
        }else if(type=='cancel'){
          this.$emit('chageCalendar');
        }
      },
      nextMonth:function(){
        var date  = new Date();
        if(this.initTime instanceof Object){
          date = this.initTime;
        }

        this.chageMonth =  ++this.chageMonth;
        var chageYear =  parseInt(this.chageMonth/12);
        var chageMonth = this.chageMonth%12;
        this.initDate(date.getFullYear()+chageYear,date.getMonth()+chageMonth);
        //日历标题
        var dateArr = this.dateArray[1][0];
        var month = dateArr.getMonth()+1;
        this.showTime = dateArr.getFullYear()+"-"+(month<10 ? '0'+month : month);
      },
      lastMonth:function(){
        var date  = new Date();
        if(this.initTime instanceof Object){
          date = this.initTime;
        }

        this.chageMonth =  this.chageMonth-1;
        var chageYear =  parseInt(this.chageMonth/12);
        var chageMonth = this.chageMonth%12;
        this.initDate(date.getFullYear()+chageYear,date.getMonth()+chageMonth);
        //日历标题
        var dateArr = this.dateArray[1][0];
        var month = dateArr.getMonth()+1;
        this.showTime = dateArr.getFullYear()+"-"+(month<10 ? '0'+month : month);
      },
      checkSpan:function(idx,idx2){
        if(this.dateArray[idx][idx2]){ //有些格子是空的，不能点
          this.idxLi = idx;
          this.idxSpan = idx2;
          this.checkTime = this.dateArray[idx][idx2];
        }
      }
    }
}
</script>

<style scoped lang="scss">
.yc_calendar_cover{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:100;
  background-color:rgba(0,0,0,.6);
}
.calendar_wrap{
  position:absolute;
  width:100%;
  bottom:0;
  background-color:#fff;
}
.calendar_wrap_head{
  position:relative;
  display:flex;
  align-items: center;
  height:100px;
  padding:10px 20px;
  background-color:#dcdada;
  text-align: center;
}
.calendar_wrap_head_icon{
  width:80px;
  height:80px;
}
.calendar_wrap_head_text{
  flex:1;
  padding:0 20px;
  font-size:36px;
}
.calendar_wrap_uls_lis{
  display:flex;
  height:120px;
  align-items: center;
  justify-content: center;
  font-size:35px;
  border-top:1px solid #d6d2d2;
}
.calendar_wrap_uls_lisTitle{
  height:140px;
}
.calendar_wrap_lis_spans{
  flex:1;
  height:100%;
  text-align:center;
  display:flex;
  align-items: center;
  justify-content:center;
  border-right:1px solid #d6d2d2;
}
.calendar_wrap_lis_spans:last-child{
  border-right:none;
}
.calendar_wrap_uls_lisTitle .calendar_wrap_lis_spans{
  border-right:none;
}
.calendar_wrap_ctrl{
  display:flex;
  padding:40px 20px 64px;
}
.calendar_wrap_ctrl_check{
  flex:1;
  background-color:#ed462f;
  line-height:80px;
  text-align:center;
  color:#fff;
  font-size:30px;
  border-radius:10px;
}
.calendar_wrap_ctrl_checkLeft{
  margin-right:120px;
}
.calendar_wrap_lis_spanCheck{
  background-color: #cecccc; 
}
</style>
