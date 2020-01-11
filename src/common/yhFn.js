//使用原生，不依赖任何插件；移动端
var yhFn = {
    addCssYh:addCssYh,
    // chgeFixedYh:chgeFixedYh,
}

/* 
addCssYh 点击的时候，元素加一些样式。做按钮点击
dom:"#id"  ".className"  'p'
csspara:
 {
    color:'pink',
    fontSize:'12px',
 }
 eleIdx: 获取的dom元素中第eleIdx个加样式
 */
function addCssYh(element,csspara,eleIdx){
    var dom = document.querySelectorAll(element);
    if(!eleIdx.toString() || JSON.stringify(csspara)=="{}"){ 
        return;
    }

    if(dom[eleIdx]){
        dom[eleIdx].addEventListener('touchstart',addCssStart(dom[eleIdx],csspara));
        dom[eleIdx].addEventListener('touchend',removeCssStart(dom[eleIdx],csspara));
    }else{
        console.log('dom元素获取出错');
    }
}

/*
    遍历添加属性
    dom元素，csspara 样式 Object
*/
var addCssStart = function addCssStart(dom,csspara){
    for(var val in csspara){
        dom.style[val] = csspara[val];
        console.log(dom,val,csspara)
    }
}
var removeCssStart = function removeCssStart(dom,csspara){
    for(var val in csspara){
        dom.style[val] = "";
    }
}

/*
   fixed在手机底部的按钮，软键盘弹起来的时候，会把按钮顶上去
*/
function chgeFixedYh(element,eleIdx){
    var dom = document.querySelectorAll(element);
    var eleIdx = eleIdx ? eleIdx : 0;

    if(dom[eleIdx]){
        var oHeight = $(window).offsetHeight; //浏览器当前的高度
        window.onresize = function(){
            if($(this).height() < oHeight){
                $(".btnWrap").css("position","static");
            }else{
                $(".btnWrap").css("position","fixed");
            }
        }
    }else{
        console.log('dom元素获取出错');
    }
}

export default yhFn;