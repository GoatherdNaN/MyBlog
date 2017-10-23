$.fn.extend({

	tzxppt: function(opts) {

		var defaults = {
			pptwidth: 600, //盒子容积的宽度
			pptheight: 200, //盒子容积的高度
			btnWidth: 24, // 按钮的宽度 
			btnHeight: 45, //按钮的高度
			btnposX: 30, //按钮两边的距离
			btnflag: true, //是否显示两边按钮
			//按钮图片
			right_img: 'url(img/arrows_09.png)', //按钮图片地址
			left_img: 'url(img/arrows_07.png)', //按钮图片地址	
			listbtnBottom: 30, //列表按钮上下距离	
			listbtnWidth: 280, //列表容积宽度
			//列表按钮宽度是根据总共宽度的自适应
			circleHeight: 20, //列表按钮高度
			circleInterval: 10, //列表按钮左右距离
			bgColor: '#f00', //列表按钮颜色
			circleStyle: 50, //圆点样式 0为方形			
			showbgColor: '#0f0', //圆点当前显示的颜色			
			listflag: true //是否显示圆点

		}
		var pptStyle = $.extend({}, defaults, opts);

		var This = $(this);
		//保存当前调用的this，因为点击时候会修改	this

		var i = 1; //显示当前第一个盒子
		var btnTop = (pptStyle.pptheight - pptStyle.btnHeight) / 2;
		//按钮距离顶部的距离	
		$(this).css({
			'width': pptStyle.pptwidth,
			'height': pptStyle.pptheight,
			'position': 'relative',
			'overflow': 'hidden'
		});
		//设置外部容器的宽度和高度；

		var firstli = $(this).children('ul').children('li').eq(0).clone();
		var lastli = $(this).children('ul').children('li').eq($(this).children('ul').children('li').length - 1).clone();
		firstli.appendTo($(this).children('ul'));
		//把第一个li添加到首位
		lastli.prependTo($(this).children('ul'));
		//自动拷贝li到头和尾；

		var licount = $(this).children('ul').children('li').length;
		//获取li的个数
		var ulwidth = $(this).children('ul').children('li').length * pptStyle.pptwidth; //动态获取li的宽度

		$(this).children('ul').css({
			'width': ulwidth,
			'height': pptStyle.pptheight,
			'left': -pptStyle.pptwidth,
			'position': 'absolute'
		});
		//设置ul的属性
		$(this).children('ul').children('li').css({
			'width': pptStyle.pptwidth,
			'height': pptStyle.pptheight,
			'float': 'left'
		});
		//设置每个li的属性

		//自动拷贝li到头和尾；	

		$(this).children("span").eq($(this).children("span").length - 1).css({
			'top': btnTop,
			'position': 'absolute',
			'right': pptStyle.btnposX,
			'display': 'block',
			'background': pptStyle.right_img,
			'width': pptStyle.btnWidth,
			'height': pptStyle.btnHeight,
			'cursor': 'pointer'

		});
		$(this).children("span").eq($(this).children("span").length - 1).children().css({
			'width': '100%',
			'height': '100%'

		});
		$(this).children("span").eq(0).children().css({
			'width': '100%',
			'height': '100%'

		});
		$(this).children("ul").children('li').children('a').children().css({
			'width': '100%',
			'height': '100%'

		});
		$(this).children("span").eq(0).css({
			'top': btnTop,
			'position': 'absolute',
			'left': pptStyle.btnposX,
			'display': 'block',
			'background': pptStyle.left_img,
			'width': pptStyle.btnWidth,
			'height': pptStyle.btnHeight,
			'cursor': 'pointer'
		});

		var listLeft = (pptStyle.pptwidth - pptStyle.listbtnWidth) / 2; //列表按钮居中	

		$(this).children("ol").css({
			'width': pptStyle.listbtnWidth,
			'bottom': pptStyle.listbtnBottom,
			'left': listLeft,
			'overflow': 'hidden',
			'height': pptStyle.circleHeight,
			'position': 'absolute'

		});
		var circleWidth = (pptStyle.listbtnWidth - pptStyle.circleInterval * $(this).children("ol").children().length) / $(this).children("ol").children().length
			//定义列表按钮宽度
		$(this).children("ol").children().css({
			'width': circleWidth,
			'height': pptStyle.circleHeight,
			'margin-left': pptStyle.circleInterval,
			'background': pptStyle.bgColor,
			'float': 'left',
			'cursor': 'pointer',
			'border-radius': pptStyle.circleStyle + '%'

		})
		This.children("ol").children().eq(0).css({
			'background': pptStyle.showbgColor

		})

		//列表按钮
		$(this).children("ol").children().click(function() {
			var index = $(this).index() + 1;
			i = index; //修改i的位置	
			clearInterval(time)
			This.children("ol").children().eq(i - 1).css({
				'background': pptStyle.showbgColor

			})
			$(this).siblings().css({
				'background': pptStyle.bgColor

			})

			palyppt(i);
		});

		//判断是否需要按钮
		if(pptStyle.btnflag) {

			$(this).children("span").css({

				'display': 'block'

			});
		} else {
			$(this).children("span").css({

				'display': 'none'

			});
		}

		//判断是否有列表按钮
		if(pptStyle.listflag) {

			This.children("ol").children().css({

				'display': 'block'

			});
		} else {
			This.children("ol").children().css({

				'display': 'none'

			});
		}

		$(this).children("span").eq($(this).children("span").length - 1).click(function() {
			++i;
			console.log(i)
			palyppt(This);
			clearInterval(time)

		});

		$(this).children("span").eq(0).click(function() {
			--i;
			console.log(i)
			palyppt(This);
			clearInterval(time)

		})

		var time = setInterval(function() {

			++i;

			palyppt();

		}, 3000);

		$(this).hover(function() {
			clearInterval(time);
		}, function() {
			time = setInterval(function() {
				++i;
				palyppt();

			}, 3000);

		});

		function palyppt() {

			This.children("ol").children().siblings().css({
				'background': pptStyle.bgColor

			})
			console.log(i)
			This.children("ol").children().eq(i - 1).css({
				'background': pptStyle.showbgColor

			})

			if(i < 0) {
				i = licount - 1
			}
			if(i > licount - 1) {
				i = 1;
				
				This.children("ol").children().eq(0).css({
				'background': pptStyle.showbgColor

			})
				
				
			}

			var posx = -pptStyle.pptwidth * i;
			//在执行动画之前，必须先清空动画队列，立即完成当前动画
			This.children('ul').stop(true, true).animate({
				'left': posx
			}, 1000, function() {
				if(i >= licount - 1) {
					i = 1;
					This.children('ul').css({
						'left': -pptStyle.pptwidth + 'px'
					})
					
			This.children("ol").children().eq(0).css({
				'background': pptStyle.showbgColor

			})
					
				}
				if(i <= 0) {
					i = licount - 2;
					This.children('ul').css({
						'left': (-pptStyle.pptwidth * (licount - 2)) + 'px'
					})
				}
			});

		}
	}
})