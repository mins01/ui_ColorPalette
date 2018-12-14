/**
* ColorPallet
* 컬러 파레트
* "공대여자는 이쁘다"를 표시기해야 쓸 수 있습니다.
*/

var ColorPallet = function(i_opt){
  var opt = Object.assign({"def_colors":[]},i_opt?i_opt:{});
  /* 모영 초기화 */
  // var cp = document.createElement('div');
  // cp.innerHTML = '<div class="colorPallet-tab colorPallet-tab-hsl" data-h="0" data-s="0" data-l="0" >'+
  // '<div class="colorPallet-sl">'+
  // '<div class="colorPallet-range colorPallet-range-s"></div>'+
  // '<div class="colorPallet-range colorPallet-range-l"></div>'+
  // '<div class="colorPallet-range-bar colorPallet-range-bar-s"></div>'+
  // '<div class="colorPallet-range-bar colorPallet-range-bar-l"></div>'+
  // '</div>'+
  // '<div class="colorPallet-h ColorPallet-h-landscape" width="50" height="300">'+
  // '<div class="colorPallet-range colorPallet-range-h"></div>'+
  // '<div class="colorPallet-range-bar colorPallet-range-bar-h"></div>'+
  // '</div>'+
  // '</div>';
  var cp = document.getElementById("test");
  var tab_hsl = cp.querySelector(".colorPallet-tab-hsl");
  var tab_colors = cp.querySelector(".colorPallet-tab-colors");
  var box_sl = cp.querySelector(".colorPallet-box-sl");
  var box_h = cp.querySelector(".colorPallet-box-h");
  var range_s = cp.querySelector(".colorPallet-range-s");
  var range_l = cp.querySelector(".colorPallet-range-l");
  var range_h = cp.querySelector(".colorPallet-range-h");
  var bar_s = cp.querySelector(".colorPallet-bar-s");
  var bar_l = cp.querySelector(".colorPallet-bar-l");
  var bar_h = cp.querySelector(".colorPallet-bar-h");
  var text_h = cp.querySelector(".colorPallet-text-h");
  var text_s = cp.querySelector(".colorPallet-text-s");
  var text_l = cp.querySelector(".colorPallet-text-l");
  var text_r = cp.querySelector(".colorPallet-text-r");
  var text_g = cp.querySelector(".colorPallet-text-g");
  var text_b = cp.querySelector(".colorPallet-text-b");
  var text_hsl = cp.querySelector(".colorPallet-text-hsl");
  var text_rgb = cp.querySelector(".colorPallet-text-rgb");
  var text_hex = cp.querySelector(".colorPallet-text-hex");
  var btn_curr = cp.querySelector(".colorPallet-btn-curr");
  var btn_new = cp.querySelector(".colorPallet-btn-new");
  var btn_confirm = cp.querySelector(".colorPallet-btn-confirm");
  var btn_cancel = cp.querySelector(".colorPallet-btn-cancel");
  var bg_h = cp.querySelectorAll(".colorPallet-bg-h");
  var bg_color_curr = cp.querySelectorAll(".colorPallet-bg-color-curr");
  var bg_color_new = cp.querySelectorAll(".colorPallet-bg-color-new");
  
  var cp_history = [];
  var def_colors =[];
  var c_data = {h:0,s:0,l:0,r:0,g:0,b:0}
  bar_s.style.top=0;  bar_s.style.left=0;
  bar_l.style.top=0;  bar_l.style.left=0;
  bar_h.style.top=0;  bar_h.style.left=0;
  /* 기본 프라이빗 함수 */
  var _getXY = function(evt){
    var x = evt.clientX;
    var y = evt.clientY;
    if(evt.isPrimary ){
      var x = evt.clientX;
      var y = evt.clientY;
    }else if(evt.touches && evt.touches[0]){
      var touch = evt.touches[0];
      var x = touch.X;
      var y = touch.Y;
    }else{
      var x = evt.x;
      var y = evt.y;
    }
    return [x,y];
  }
  // http://hsl2rgb.nichabi.com/javascript-function.php
  function hsl2rgb (h, s, l) {
    
    var r, g, b, m, c, x
    
    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0
    
    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6
    
    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))
    
    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))
    
    if (h < 1) {
      r = c
      g = x
      b = 0
    } else if (h < 2) {
      r = x
      g = c
      b = 0
    } else if (h < 3) {
      r = 0
      g = c
      b = x
    } else if (h < 4) {
      r = 0
      g = x
      b = c
    } else if (h < 5) {
      r = x
      g = 0
      b = c
    } else {
      r = c
      g = 0
      b = x
    }
    
    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    
    return { r: r, g: g, b: b }
    
  }
  // http://rgb2hsl.nichabi.com/javascript-function.php
  function rgb2hsl (r, g, b) {
    var max, min, h, s, l, d
    r /= 255
    g /= 255
    b /= 255
    max = Math.max(r, g, b)
    min = Math.min(r, g, b)
    l = (max + min) / 2
    if (max == min) {
      h = s = 0
    } else {
      d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
        case g:
        h = (b - r) / d + 2
        break
        case b:
        h = (r - g) / d + 4
        break
      }
      h /= 6
    }
    h = Math.floor(h * 360)
    s = Math.floor(s * 100)
    l = Math.floor(l * 100)
    return { h: h, s: s, l: l }
  }
  function addColorHistory(i_c_data){    
    var stringRGB = cp.toStringRGB(i_c_data);
    if(!cp_history.find(function(v){return stringRGB==cp.toStringRGB(v);})
    && !def_colors.find(function(v){return stringRGB==cp.toStringRGB(v);})){
      cp_history.push(Object.assign({},i_c_data));  
      showHistory();
    }
    
    
  }
  function saveHistoryToLS(){
    localStorage.setItem("cp_history",JSON.stringify(cp_history));
  }
  function initHistoryFromLS(){
    cp_history = JSON.parse(localStorage.getItem("cp_history"));
    if(!cp_history){
      cp_history = [];
    }
    showHistory();
  }
  function showHistory(){
    tab_colors.innerHTML = "";
    var maxHistory = cp.getAttribute('data-maxHistory');
    maxHistory= (maxHistory==null)?10:parseInt(maxHistory,10);
    if(cp_history.length > maxHistory){
      cp_history.splice(0,cp_history.length-maxHistory);
    }
    saveHistoryToLS()
    for(var i=0,m=def_colors.length;i<m;i++){
      var i_c_data= def_colors[i];
      var his = document.createElement('button');
      his.className="colorPallet-defColor"
      his.type = "button";
      his.c_data = Object.assign({},i_c_data);
      var stringRGB = cp.toStringRGB(his.c_data);
      his.style.backgroundColor = stringRGB;
      tab_colors.appendChild(his);  
    }   
    for(var i=0,m=cp_history.length;i<m;i++){
      var i_c_data= cp_history[i];
      var his = document.createElement('button');
      his.className="colorPallet-history"
      his.type = "button";
      his.c_data = Object.assign({},i_c_data);
      var stringRGB = cp.toStringRGB(his.c_data);
      his.style.backgroundColor = stringRGB;
      tab_colors.appendChild(his);  
    }    
  }
  var _sync = function(byInput){
    bar_h.style.top=(c_data.h/360)*100+'%';
    // range_s.style.background="linear-gradient(to right, hsl("+c_data.h+", 100%, 100%), hsl("+c_data.h+", 100%, 50%))"
    
    for(var i=0,m=bg_h.length;i<m;i++){
      bg_h[i].style.backgroundColor="hsl("+c_data.h+", 100%, 50%)"
    }
    for(var i=0,m=bg_color_new.length;i<m;i++){
      bg_color_new[i].style.backgroundColor=cp.toStringHEX();
      bg_color_new[i].c_data = Object.assign({},c_data);
    }
    bar_s.style.left=c_data.s+'%';
    // var t = (200-c_data.s)/100;
    // bar_l.style.top=(1-(c_data.l/50/t))*100+'%';
    bar_l.style.top=(100-c_data.l)+'%';
    // tab_hsl.setAttribute('data-h',c_data.h.toFixed(0)+' '+((c_data.h).toFixed(0)/360*255).toFixed(0))
    // tab_hsl.setAttribute('data-s',c_data.s.toFixed(0)+' '+((c_data.s).toFixed(0)/100*255).toFixed(0))
    // tab_hsl.setAttribute('data-l',c_data.l.toFixed(0)+' '+((c_data.l).toFixed(0)/100*255).toFixed(0))
    tab_hsl.setAttribute('data-toStringHSL',cp.toStringHSL())
    tab_hsl.setAttribute('data-toStringRGB',cp.toStringRGB())
    tab_hsl.setAttribute('data-toStringHEX',cp.toStringHEX())
    if(byInput!='hsl'){
      text_h.value = c_data.h.toFixed(0)
      text_s.value = c_data.s.toFixed(0)
      text_l.value = c_data.l.toFixed(0)  
    }
    if(byInput!='rgb'){
      text_r.value = c_data.r.toFixed(0)
      text_g.value = c_data.g.toFixed(0)
      text_b.value = c_data.b.toFixed(0)
    }
    if(byInput!='hex'){
      text_hex.value = cp.toStringHEX();
    }
    text_rgb.value = cp.toStringRGB();
    text_hsl.value = cp.toStringHSL();
    // console.log(cp.toStringHSL(),cp.toStringRGB());
    // document.body.style.backgroundColor=cp.toStringHSL();
  }
  /* 퍼블릭 메소드 */
  cp.show = function(){
    this.style.display='block';
  }
  cp.hide = function(){
    this.style.display='none';
  }
  cp.getData = function(){
    return Object.assign({},c_data);;
  }
  cp.setData = function(data){
    c_data = Object.assign(c_data,data);
    _sync();
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  cp.toStringHSL = function(i_c_data){
    var v_c_data = i_c_data?i_c_data:c_data;
    return "hsl("+v_c_data.h.toFixed(0)+","+v_c_data.s.toFixed(0)+"%,"+v_c_data.l.toFixed(0)+"%)";
  }
  cp.toStringRGB = function(i_c_data){
    var v_c_data = i_c_data?i_c_data:c_data;
    return "rgb("+v_c_data.r.toFixed(0)+","+v_c_data.g.toFixed(0)+","+v_c_data.b.toFixed(0)+")";
  }
  cp.toStringHEX = function(i_c_data){
    var v_c_data = i_c_data?i_c_data:c_data;
    return '#'+((v_c_data.r.toFixed(0)<16)?'0':'')+v_c_data.r.toString(16)+((v_c_data.g.toFixed(0)<16)?'0':'')+v_c_data.g.toString(16)+((v_c_data.b.toFixed(0)<16)?'0':'')+v_c_data.b.toString(16);
  }  
  cp.setHEX = function(hex_str){
    c_data = cp.parseColorString(hex_str);
    var hsl = rgb2hsl(c_data.r,c_data.g,c_data.b);
    c_data = Object.assign(c_data,hsl);      
    _sync('hex')
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  cp.setHSL = function(h,s,l){
    var hsl ={"h":parseFloat(h==null?c_data.h:h),"s":parseFloat(s==null?c_data.s:s),"l":parseFloat(s==null?c_data.l:l)}
    c_data = Object.assign(c_data,hsl);
    var rgb = hsl2rgb(c_data.h,c_data.s,c_data.l);
    c_data = Object.assign(c_data,rgb);      
    _sync();
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  cp.setRGB = function(r,g,b){
    var rgb ={"r":parseFloat(r==null?c_data.r:r),"g":parseFloat(g==null?c_data.g:g),"b":parseFloat(b==null?c_data.b:b)}
    c_data = Object.assign(c_data,rgb);
    var hsl = rgb2hsl(c_data.r,c_data.g,c_data.b);
    c_data = Object.assign(c_data,hsl);      
    _sync()
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  cp.setDefColors = function(defColor){
    for(var i=0,m=defColor.length;i<m;i++){
      def_colors.push(cp.parseColorString(defColor[i]))  
    } 
  }
  cp.toString = function(){
    return JSON.stringify(c_data);
  }
  cp.parseColorString = function(i_str){
    var str = i_str.toLowerCase().trim().replace(/\s/g,'');
    var c_data =  {h:0,s:0,l:0,r:0,g:0,b:0}
    if(str.indexOf('rgb')===0){
      str = str.replace(/(^rgb|[^\d,])/g,'');
      var t = str.split(',');
      var rgb ={"r":parseInt(t[0]),"g":parseInt(t[1]),"b":parseInt(t[2])}
      var hsl = rgb2hsl(rgb.r,rgb.g,rgb.b);
      c_data = Object.assign(c_data,rgb,hsl);
    }else if(str.indexOf('hsl')===0){
      str = str.replace(/(^hsl|[^\d,])/g,'');
      var t = str.split(',');
      var hsl ={"h":parseInt(t[0]),"s":parseInt(t[1]),"l":parseInt(t[2])}
      var rgb = hsl2rgb(hsl.h,hsl.s,hsl.l);
      c_data = Object.assign(c_data,rgb,hsl);
    }else if(str.indexOf('#')===0){
      str = str.replace(/^#/,'');
      if(str.length==3){
        str = str[0]+str[0]+str[1]+str[1]+str[2]+str[2];
      }
      var r = parseInt((str[0]+str[1]),16);
      var g = parseInt((str[2]+str[3]),16);
      var b = parseInt((str[4]+str[5]),16);
      var rgb ={"r":r,"g":g,"b":b}
      var hsl = rgb2hsl(rgb.r,rgb.g,rgb.b);
      c_data = Object.assign(c_data,rgb,hsl);
    }
    return c_data
  }
  cp.confirm = function(){
    for(var i=0,m=bg_color_curr.length;i<m;i++){
      bg_color_curr[i].style.backgroundColor=cp.toStringHEX();
      bg_color_curr[i].c_data = Object.assign({},c_data);
    }
    addColorHistory(c_data)
    cp.dispatchEvent((new CustomEvent("confirm", {})));
  }
  cp.cancel = function(){
    cp.setData(btn_curr.c_data);
    cp.dispatchEvent((new CustomEvent("cancel", {})));
  }
  /* 이벤트 초기화 부분   */
  var cb_for_h=function(evt,gapX,gapY,target,data){
    // if(gapX==0){return;}
    var bcr = target.getBoundingClientRect();
    var xy = _getXY(evt);
    var x = xy[0], y = xy[1];
    // x-=bcr.left
    y-=bcr.top
    // x = Math.max(0,Math.min(bcr.width,x));
    y = Math.max(0,Math.min(bcr.height,y));
    // var h = x/bcr.width*360;
    var h = y/bcr.height*360;
    // console.log(h)
    cp.setHSL(h,null,null);
  }
  toDraggable(box_h,cb_for_h,cb_for_h,null);
  var cb_for_sl=function(evt,gapX,gapY,target,data){
    // if(gapX==0){return;}
    var bcr = target.getBoundingClientRect();
    var xy = _getXY(evt);
    var x = xy[0], y = xy[1];
    x-=bcr.left
    y-=bcr.top
    x = Math.max(0,Math.min(bcr.width,x));
    y = Math.max(0,Math.min(bcr.height,y));
    var s = x/bcr.width*100;
    // var t = (200-s)/100;
    // var l = (1-y/bcr.height)*50*t;
    var l = (1-y/bcr.height)*100;
    // console.log(s,l)
    cp.setHSL(null,s,l);
  }
  toDraggable(box_sl,cb_for_sl,cb_for_sl,null);
  var cb_hsl = function(evt){cp.setHSL(text_h.value,text_s.value,text_l.value)}
  text_h.addEventListener("input",cb_hsl);
  text_s.addEventListener("input",cb_hsl);
  text_l.addEventListener("input",cb_hsl);
  var cb_rgb = function(evt){cp.setRGB(text_r.value,text_g.value,text_b.value)}
  text_r.addEventListener("input",cb_rgb);
  text_g.addEventListener("input",cb_rgb);
  text_b.addEventListener("input",cb_rgb);
  var cb_hex = function(evt){cp.setHEX(text_hex.value)}
  text_hex.addEventListener("input",cb_hex);
  var cb_confirm = function(evt){cp.confirm()}
  btn_confirm.addEventListener("click",cb_confirm);
  var cb_cancel = function(evt){cp.cancel()}
  btn_cancel.addEventListener("click",cb_cancel);
  var cb_curr = function(evt){cp.setData(this.c_data);}
  btn_curr.addEventListener("click",cb_curr);
  // btn_new.addEventListener("click",cb_curr);
  tab_colors.addEventListener("click",function(evt){
    var target = evt.target;
    if(!target.c_data){return;}
    cp.setData(target.c_data);
    _sync();
  });
  tab_colors.addEventListener("dblclick",function(evt){
    var target = evt.target;
    if(!target.c_data){return;}
    cp.setData(target.c_data);
    _sync();
    cp.confirm();
  });
  
  /* 내용 초기화 */
  _sync();
  btn_curr.style.backgroundColor=cp.toStringRGB();
  for(var i=0,m=bg_color_curr.length;i<m;i++){
    bg_color_curr[i].style.backgroundColor=cp.toStringHEX();
    bg_color_curr[i].c_data = Object.assign({},c_data);
  }
  cp.setDefColors(opt.defColor?opt.defColor:[]);
  initHistoryFromLS();
  
  
  return cp;
}