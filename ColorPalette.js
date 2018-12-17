/**
* ColorPalette
* 컬러 파레트
* "공대여자는 이쁘다"를 표시기해야 쓸 수 있습니다.
*/

var ColorPalette = function(i_opt){
  /* === 옵션 초기화 === */
  var opt = Object.assign({"defColor":"#000000","bookmark":[],"maxHistory":10,"localStorageHistoryKey":"ColorPalette-history-key"},i_opt?i_opt:{});
  
  /* === 기본 노트 생성 === */
  
  var innerHTML = '<div class="colorPalette" translate="no"> \
  <div class="colorPalette-tab colorPalette-tab-hsl" data-h="0" data-s="0" data-l="0" > \
  <div class="colorPalette-box colorPalette-box-sl"> \
  <div class="colorPalette-range colorPalette-range-s colorPalette-bg-h"></div> \
  <div class="colorPalette-range colorPalette-range-l"></div> \
  <div class="colorPalette-bar colorPalette-bar-s"></div> \
  <div class="colorPalette-bar colorPalette-bar-l"></div>					 \
  </div> \
  <div class="colorPalette-box colorPalette-box-h ColorPalette-h-landscape" width="50" height="300"> \
  <div class="colorPalette-range colorPalette-range-h"></div> \
  <div class="colorPalette-bar colorPalette-bar-h"></div> \
  </div> \
  </div> \
  <div  class="colorPalette-tab colorPalette-tab-info"> \
  <div class="colorPalette-box colorPalette-box-hsl"> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="H " data-suffix="°" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-h" type="range" min="0" max="360" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="S " data-suffix="%" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-s" type="range" min="0" max="100" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="L " data-suffix="%" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-l" type="range" min="0" max="100" step="1"  /> \
  </div> \
  </div> \
  <div class="colorPalette-box colorPalette-box-rgb"> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="R " data-suffix="" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-r" type="range" min="0" max="255" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="G " data-suffix="" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-g" type="range" min="0" max="255" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="B " data-suffix="" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-b" type="range" min="0" max="255" step="1"  /> \
  </div> \
  </div> \
  <div class="colorPalette-box colorPalette-box-colorString"> \
  <dl> \
  <dt>HSL</dt> \
  <dd><input spellcheck="false" class="colorPalette-text colorPalette-text-hsl" type="text" readonly/></dd> \
  </dl> \
  <dl> \
  <dt>RGB</dt> \
  <dd><input spellcheck="false" class="colorPalette-text colorPalette-text-rgb" type="text" readonly/></dd> \
  </dl> \
  <dl> \
  <dt>HEX</dt> \
  <dd><input spellcheck="false" class="colorPalette-text colorPalette-text-hex" type="text" pattern="^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$" maxlength="7" />	</dd> \
  </dl> \
  </div> \
  <div class="colorPalette-box colorPalette-box-btns"> \
  <button type="button" class="colorPalette-btn colorPalette-btn-curr colorPalette-bg-color-curr"></button> \
  <button type="button" class="colorPalette-btn colorPalette-btn-new colorPalette-bg-color-new"></button> \
  <button type="button" class="colorPalette-btn colorPalette-btn-confirm"></button> \
  <button type="button" class="colorPalette-btn colorPalette-btn-cancel"></button> \
  </div> \
  </div> \
  <div class="colorPalette-tab colorPalette-tab-colors"> \
  <div class="colorPalette-history"> \
  </div> \
  </div> \
  </div>';
  
  // var cp = document.getElementById("test");
  var div = document.createElement('div');
  div.innerHTML = innerHTML;
  var cp = div.querySelector(".colorPalette");
  div = null;
  var tab_hsl = cp.querySelector(".colorPalette-tab-hsl");
  var tab_colors = cp.querySelector(".colorPalette-tab-colors");
  var box_sl = cp.querySelector(".colorPalette-box-sl");
  var box_h = cp.querySelector(".colorPalette-box-h");
  var range_s = cp.querySelector(".colorPalette-range-s");
  var range_l = cp.querySelector(".colorPalette-range-l");
  var range_h = cp.querySelector(".colorPalette-range-h");
  var bar_s = cp.querySelector(".colorPalette-bar-s");
  var bar_l = cp.querySelector(".colorPalette-bar-l");
  var bar_h = cp.querySelector(".colorPalette-bar-h");
  var text_h = cp.querySelector(".colorPalette-text-h");
  var text_s = cp.querySelector(".colorPalette-text-s");
  var text_l = cp.querySelector(".colorPalette-text-l");
  var text_r = cp.querySelector(".colorPalette-text-r");
  var text_g = cp.querySelector(".colorPalette-text-g");
  var text_b = cp.querySelector(".colorPalette-text-b");
  var text_hsl = cp.querySelector(".colorPalette-text-hsl");
  var text_rgb = cp.querySelector(".colorPalette-text-rgb");
  var text_hex = cp.querySelector(".colorPalette-text-hex");
  var btn_curr = cp.querySelector(".colorPalette-btn-curr");
  var btn_new = cp.querySelector(".colorPalette-btn-new");
  var btn_confirm = cp.querySelector(".colorPalette-btn-confirm");
  var btn_cancel = cp.querySelector(".colorPalette-btn-cancel");
  var bg_h = cp.querySelectorAll(".colorPalette-bg-h");
  var bg_color_curr = cp.querySelectorAll(".colorPalette-bg-color-curr");
  var bg_color_new = cp.querySelectorAll(".colorPalette-bg-color-new");
  
  var cp_history = [];
  var bookmark =[];
  var c_data = {h:0,s:0,l:0,r:0,g:0,b:0}  
  bar_s.style.top=0;  bar_s.style.left=0;
  bar_l.style.top=0;  bar_l.style.left=0;
  bar_h.style.top=0;  bar_h.style.left=0;
  /* === 프라이빗 메소드 === */
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
    && !bookmark.find(function(v){return stringRGB==cp.toStringRGB(v);})){
      cp_history.push(Object.assign({},i_c_data));  
      showHistory();
    }
    
    
  }
  function saveHistoryToLS(){
    localStorage.setItem(opt.localStorageHistoryKey,JSON.stringify(cp_history));
  }
  function initHistoryFromLS(){
    cp_history = JSON.parse(localStorage.getItem(opt.localStorageHistoryKey));
    if(!cp_history){
      cp_history = [];
    }
    showHistory();
  }
  function showHistory(){
    tab_colors.innerHTML = "";
    var maxHistory = parseInt(opt.maxHistory);
    if(cp_history.length > maxHistory){
      cp_history.splice(0,cp_history.length-maxHistory);
    }
    saveHistoryToLS()
    var his,i_c_data,stringHEX;
    for(var i=0,m=bookmark.length;i<m;i++){
      i_c_data= bookmark[i];
      his = document.createElement('button');
      his.className="colorPalette-color colorPalette-bookmark"
      his.type = "button";
      his.c_data = Object.assign({},i_c_data);
      stringHEX = cp.toStringHEX(his.c_data);
      his.style.backgroundColor = stringHEX;
      his.setAttribute('data-stringHEX',stringHEX);
      tab_colors.appendChild(his);  
    }   
    for(var i=0,m=cp_history.length;i<m;i++){
      i_c_data= cp_history[i];
      his = document.createElement('button');
      his.className="colorPalette-color colorPalette-history"
      his.type = "button";
      his.c_data = Object.assign({},i_c_data);
      stringHEX = cp.toStringHEX(his.c_data);
      his.style.backgroundColor = stringHEX;
      his.setAttribute('data-stringHEX',stringHEX);
      tab_colors.appendChild(his);  
    }    
  }
  var _sync = function(byInput){
    bar_h.style.top=(c_data.h/360)*100+'%';
    // range_s.style.background="linear-gradient(to right, hsl("+c_data.h+", 100%, 100%), hsl("+c_data.h+", 100%, 50%))"
    
    for(var i=0,m=bg_h.length;i<m;i++){
      bg_h[i].style.backgroundColor="hsl("+c_data.h+", 100%, 50%)"
    }
    text_s.style.backgroundColor="hsl("+c_data.h+", 100%, "+c_data.l+"%)"
    text_l.style.backgroundColor="hsl("+c_data.h+", "+c_data.s+"%, 50%)"
    
    for(var i=0,m=bg_color_new.length;i<m;i++){
      bg_color_new[i].style.backgroundColor=cp.toStringHEX();
      bg_color_new[i].c_data = Object.assign({},c_data);
    }
    bar_s.style.left=c_data.s+'%';
    bar_l.style.top=(100-c_data.l)+'%';
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
    var stringHEX = cp.toStringHEX();
    /* 즐겨찾기에서 선택 색 표시 */
    var t = cp.querySelector('.colorPalette-tab-colors .colorPalette-color[data-selected]:not([data-stringHEX="'+stringHEX+'"])');
    if(t) t.removeAttribute('data-selected');
    var t = cp.querySelector('.colorPalette-tab-colors .colorPalette-color[data-stringHEX="'+stringHEX+'"]');
    if(t) t.setAttribute('data-selected',true);
    
    
    
  }
  var setBookmark = function(defColor){
    for(var i=0,m=defColor.length;i<m;i++){
      bookmark.push(cp.parseColorString(defColor[i]))  
    } 
  }
  /* === 퍼블릭 메소드 === */
  /**
  * getData 컬러 데이터 가져오기
  * @return {Object} 컬러 데이터
  */
  cp.getData = function(){
    return Object.assign({},c_data);;
  }
  /**
  * setData 컬러 데이터 설정하기
  * @param  {Object} data 컬러 데이터
  */
  cp.setData = function(data){
    c_data = Object.assign(c_data,data);
    _sync();
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  /**
  * toStringHSL 색을 hsl(111,99%,99%) 로 나타냄
  * @param  {Object} data 컬러 데이터(옵션). 없을 경우 현재츼 색
  * @return {String}
  */
  cp.toStringHSL = function(i_c_data){
    var v_c_data = i_c_data?i_c_data:c_data;
    return "hsl("+v_c_data.h.toFixed(0)+","+v_c_data.s.toFixed(0)+"%,"+v_c_data.l.toFixed(0)+"%)";
  }
  /**
  * toStringRGB 색을 rgb(111,222,99) 로 나타냄
  * @param  {Object} data 컬러 데이터(옵션). 없을 경우 현재츼 색
  * @return {String}
  */
  cp.toStringRGB = function(i_c_data){
    var v_c_data = i_c_data?i_c_data:c_data;
    return "rgb("+v_c_data.r.toFixed(0)+","+v_c_data.g.toFixed(0)+","+v_c_data.b.toFixed(0)+")";
  }
  /**
  * toStringHEX 색을 #aabbcc 로 나타냄
  * @param  {Object} data 컬러 데이터(옵션). 없을 경우 현재츼 색
  * @return {String}
  */
  cp.toStringHEX = function(i_c_data){
    var v_c_data = i_c_data?i_c_data:c_data;
    return '#'+((v_c_data.r.toFixed(0)<16)?'0':'')+v_c_data.r.toString(16)+((v_c_data.g.toFixed(0)<16)?'0':'')+v_c_data.g.toString(16)+((v_c_data.b.toFixed(0)<16)?'0':'')+v_c_data.b.toString(16);
  }
  /**
  * setHEX HEX로 값을 설정
  * @param  {String} #aabbcc
  */
  cp.setHEX = function(hex_str){
    c_data = cp.parseColorString(hex_str);
    _sync('hex')
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  /**
  * setColorString 문자열로 값을 설정
  * @param  {String} 색상 문자열
  */
  cp.setColorString = function(str){
    c_data = cp.parseColorString(str);
    _sync()
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  /**
  * setHSL hsl 값으로 설정
  * @param  {Number} h 0~360
  * @param  {Number} s 0~100%
  * @param  {Number} l 0~100%
  */
  cp.setHSL = function(h,s,l){
    var hsl ={"h":parseFloat(h==null?c_data.h:h),"s":parseFloat(s==null?c_data.s:s),"l":parseFloat(s==null?c_data.l:l)}
    c_data = Object.assign(c_data,hsl);
    var rgb = hsl2rgb(c_data.h,c_data.s,c_data.l);
    c_data = Object.assign(c_data,rgb);      
    _sync();
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  /**
  * setRGB rgb 값으로 설정
  * @param  {Number} r 0~255
  * @param  {Number} g 0~255
  * @param  {Number} b 0~255
  */
  cp.setRGB = function(r,g,b){
    var rgb ={"r":parseFloat(r==null?c_data.r:r),"g":parseFloat(g==null?c_data.g:g),"b":parseFloat(b==null?c_data.b:b)}
    c_data = Object.assign(c_data,rgb);
    var hsl = rgb2hsl(c_data.r,c_data.g,c_data.b);
    c_data = Object.assign(c_data,hsl);      
    _sync()
    cp.dispatchEvent((new CustomEvent("change", {})));
  }
  /**
  * toString 컬러 데이터를 JSON 으로 출력 
  * @return {String} {"h":0,"s":72,"l":26,"r":115,"g":19,"b":19}
  
  */
  cp.toString = function(){
    return JSON.stringify(c_data);
  }
  /**
  * parseColorString 컬러 문자열을 컬레 데이터로 변환
  * @param  {String} i_str rgb(1,2,3) or hsl(1,2%,3%) or #112233
  * @return {Object} {"h":0,"s":72,"l":26,"r":115,"g":19,"b":19}
  */
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
  /**
   * setSelectedColor 선택된 색을 설정한다. confirm과 같지만, 이벤트는 발생 안한다.
   * @param  {String} colorString [description]
   */
  cp.setSelectedColor = function(colorString){
    c_data = cp.parseColorString(colorString);
    var toStringHEX = cp.toStringHEX(c_data);
    for(var i=0,m=bg_color_new.length;i<m;i++){
      bg_color_new[i].style.backgroundColor=toStringHEX
      bg_color_new[i].c_data = Object.assign({},c_data);
    }
    for(var i=0,m=bg_color_curr.length;i<m;i++){
      bg_color_curr[i].style.backgroundColor=toStringHEX;
      bg_color_curr[i].c_data = Object.assign({},c_data);
    }
    _sync();
    cp.dispatchEvent((new CustomEvent("setselectedcolor", {})));

  }
  /**
   * getSelectedColor 선택된 색을 가져온다.
   * @return {Object} ColorData
   */
  cp.getSelectedColor = function(){
    return Object.assign({},bg_color_curr[0].c_data);
  }
  /**
  * confirm confirm 동작
  * confirm 이벤트가 발생됨
  */
  cp.confirm = function(){
    for(var i=0,m=bg_color_curr.length;i<m;i++){
      bg_color_curr[i].style.backgroundColor=cp.toStringHEX();
      bg_color_curr[i].c_data = Object.assign({},c_data);
    }
    addColorHistory(c_data)
    _sync();
    cp.dispatchEvent((new CustomEvent("confirm", {})));
  }
  /**
  * cancel cancel 동작
  * cancel 이벤트가 발생됨
  */
  cp.cancel = function(){
    cp.setData(btn_curr.c_data);
    _sync();
    cp.dispatchEvent((new CustomEvent("cancel", {})));
  }
  /* === 이벤트 초기화 부분  ====  */
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
  var cb_hex = function(evt){
    var reg = new RegExp(this.pattern, "");
    if (reg.test(this.value)) {
      // The ZIP follows the constraint, we use the ConstraintAPI to tell it
      this.setCustomValidity("");
    }else{
      this.setCustomValidity("HEX TYPE : #0cA9fF or #09f")
      console.log("HEX TYPE : #0cA9fF or #09f");
    }
    if(!this.reportValidity()){    
      return;
    }
    cp.setHEX(this.value)
    console.log(this.value);
  }
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
  
  /* === 내용 초기화 === */
  c_data = cp.parseColorString(opt.defColor);
  setBookmark(opt.bookmark);
  initHistoryFromLS();
  _sync();
  btn_curr.style.backgroundColor=cp.toStringHEX();
  for(var i=0,m=bg_color_curr.length;i<m;i++){
    bg_color_curr[i].style.backgroundColor=cp.toStringHEX();
    bg_color_curr[i].c_data = Object.assign({},c_data);
  }
  
  
  
  return cp;
}