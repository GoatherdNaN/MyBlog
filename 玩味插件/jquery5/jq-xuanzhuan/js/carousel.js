;(function($){

	var Carousel = function(poster){
			var self = this;
			//淇濆瓨鍗曚釜鏃嬭浆鏈ㄩ┈瀵硅薄
			this.poster                  = poster;
			this.posterItemMain = poster.find("ul.poster-list");
			this.nextBtn               = poster.find("div.poster-next-btn");
			this.prevBtn               = poster.find("div.poster-prev-btn");
			this.posterItems        =poster.find("li.poster-item");
			if(this.posterItems.size()%2==0){
				this.posterItemMain.append(this.posterItems.eq(0).clone());
				this.posterItems = this.posterItemMain.children();
			};
			this.posterFirstItem  = this.posterItems.first();
			this.posterLastItem  = this.posterItems.last();
			this.rotateFlag   = true;
			//榛樿閰嶇疆鍙傛暟
			this.setting = {
									"width":1000,			//骞荤伅鐗囩殑瀹藉害
									"height":270,				//骞荤伅鐗囩殑楂樺害
									"posterWidth":640,	//骞荤伅鐗囩涓€甯х殑瀹藉害
									"posterHeight":270,	//骞荤伅鐗囩涓€甯х殑楂樺害
									"scale":0.9,					//璁板綍鏄剧ず姣斾緥鍏崇郴
									"speed":500,
									"autoPlay":false,
									"delay":5000,
									"verticalAlign":"middle" //top bottom
									};
			$.extend(this.setting,this.getSetting());
			
			//璁剧疆閰嶇疆鍙傛暟鍊�
			this.setSettingValue();
			this.setPosterPos();
			//宸︽棆杞寜閽�
			this.nextBtn .click(function(){
				if(self.rotateFlag){
					self.rotateFlag = false;
					self.carouseRotate("left");
				};
			});
			//鍙虫棆杞寜閽�
			this.prevBtn .click(function(){
				if(self.rotateFlag){
					self.rotateFlag = false;
					self.carouseRotate("right");
				};
			});
		//鏄惁寮€鍚嚜鍔ㄦ挱鏀�
		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function(){
										window.clearInterval(self.timer);
										},function(){
										self.autoPlay();
										});
			
		};

	};
	Carousel.prototype = {
		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval(function(){
				self.nextBtn.click();
			},this.setting.delay);

		},

		//鏃嬭浆
		carouseRotate:function(dir){
			var _this_  = this;
			var zIndexArr = [];
			//宸︽棆杞�
			if(dir === "left"){
				this.posterItems .each(function(){
					var self = $(this),
						   prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
						   width = prev.width(),
						   height =prev.height(),
						   zIndex = prev.css("zIndex"),
						   opacity = prev.css("opacity"),
						   left = prev.css("left"),
						   top = prev.css("top");
							zIndexArr.push(zIndex);	
						   self.animate({
							   					width:width,
												height:height,
												//zIndex:zIndex,
												opacity:opacity,
												left:left,
												top:top
												},_this_.setting.speed,function(){
													_this_.rotateFlag = true;
												});
				});
				//zIndex闇€瑕佸崟鐙繚瀛樺啀璁剧疆锛岄槻姝㈠惊鐜椂鍊欒缃啀鍙栫殑鏃跺€欏€兼案杩滄槸鏈€鍚庝竴涓殑zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}else if(dir === "right"){//鍙虫棆杞�
				this.posterItems .each(function(){
					var self = $(this),
						   next = self.next().get(0)?self.next():_this_.posterFirstItem,
						   width = next.width(),
						   height =next.height(),
						   zIndex = next.css("zIndex"),
						   opacity = next.css("opacity"),
						   left = next.css("left"),
						   top = next.css("top");
						   zIndexArr.push(zIndex);	
						   self.animate({
							   					width:width,
												height:height,
												//zIndex:zIndex,
												opacity:opacity,
												left:left,
												top:top
												},_this_.setting.speed,function(){
													_this_.rotateFlag = true;
												});
	
				});
				//zIndex闇€瑕佸崟鐙繚瀛樺啀璁剧疆锛岄槻姝㈠惊鐜椂鍊欒缃啀鍙栫殑鏃跺€欏€兼案杩滄槸鏈€鍚庝竴涓殑zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			};
		},
		//璁剧疆鍓╀綑鐨勫抚鐨勪綅缃叧绯�
		setPosterPos:function(){
				var   self = this;
				var 	sliceItems  = this.posterItems.slice(1),
						sliceSize     = sliceItems.size()/2,
						rightSlice   = sliceItems.slice(0,sliceSize),
						level            = Math.floor(this.posterItems.size()/2),
						leftSlice      =sliceItems.slice(sliceSize);
			
				//璁剧疆鍙宠竟甯х殑浣嶇疆鍏崇郴鍜屽搴﹂珮搴op
				var rw = this.setting.posterWidth,
					   rh  = this.setting.posterHeight,
					   gap = ((this.setting.width-this.setting.posterWidth)/2)/level;
				
				var firstLeft = (this.setting.width-this.setting.posterWidth)/2;
				var fixOffsetLeft = firstLeft+rw;
				//璁剧疆宸﹁竟浣嶇疆鍏崇郴
				rightSlice.each(function(i){
					level--;
					rw = rw *self.setting.scale;
					rh = rh *self.setting.scale
					var j = i;
					$(this).css({
										zIndex:level,
										width:rw,
										height:rh,
										opacity:1/(++j),
										left:fixOffsetLeft+(++i)*gap-rw,
										top:self.setVerticalAlign(rh)
										});
				});
				//璁剧疆宸﹁竟鐨勪綅缃叧绯�
				var lw = rightSlice.last().width(),
					   lh  =rightSlice.last().height(),
					   oloop = Math.floor(this.posterItems.size()/2);
				leftSlice.each(function(i){
					$(this).css({
										zIndex:i,
										width:lw,
										height:lh,
										opacity:1/oloop,
										left:i*gap,
										top:self.setVerticalAlign(lh)
										});
					lw = lw/self.setting.scale;
					lh = lh/self.setting.scale;
					oloop--;
				});
		},
		//璁剧疆鍨傜洿鎺掑垪瀵归綈
		setVerticalAlign:function(height){
			var verticalType  = this.setting.verticalAlign,
					top = 0;
			if(verticalType === "middle"){
				top = (this.setting.height-height)/2;
			}else if(verticalType === "top"){
				top = 0;
			}else if(verticalType === "bottom"){
				top = this.setting.height-height;
			}else{
				top = (this.setting.height-height)/2;
			};
			return top;
		},
		//璁剧疆閰嶇疆鍙傛暟鍊煎幓鎺у埗鍩烘湰鐨勫搴﹂珮搴︺€傘€傘€�
		setSettingValue:function(){
			this.poster.css({
										width:this.setting.width,
										height:this.setting.height
									});
			this.posterItemMain.css({
										width:this.setting.width,
										height:this.setting.height
									});
			//璁＄畻涓婁笅鍒囨崲鎸夐挳鐨勫搴�
			var w = (this.setting.width-this.setting.posterWidth)/2;
			//璁剧疆鍒囨崲鎸夐挳鐨勫楂橈紝灞傜骇鍏崇郴
			this.nextBtn.css({
										width:w,
										height:this.setting.height,
										zIndex:Math.ceil(this.posterItems.size()/2)
										});
			this.prevBtn.css({
										width:w,
										height:this.setting.height,
										zIndex:Math.ceil(this.posterItems.size()/2)
										});
			
			this.posterFirstItem.css({
										width:this.setting.posterWidth,
										height:this.setting.posterHeight,
										left:w,
										top:0,
										zIndex:Math.floor(this.posterItems.size()/2)
										});
		},
		//鑾峰彇浜哄伐閰嶇疆鍙傛暟
		getSetting:function(){
			
			var setting = this.poster.attr("data-setting");
			if(setting&&setting!=""){
				return $.parseJSON(setting);
			}else{
				return {};
			};
		}
	
	};
	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new  _this_($(this));
		});
	};
	window["Carousel"] = Carousel;
})(jQuery);