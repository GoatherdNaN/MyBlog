> 在js中如果打算使用setInterval进行倒数,计时等功能,往往是不准确的,因为setInterval的回调函数并不是到时后立即执行,而是等系统计算资源空闲下来后才会执行.而下一次触发时间则是在setInterval回调函数执行完毕之后才开始计时,所以如果setInterval内执行的计算过于耗时,或者有其他耗时任务在执行,setInterval的计时会越来越不准,延迟很厉害.

解决方案如下：

```
function countDown(timeOut,callback) {
    const interval = 1000,startTime = new Date().getTime();
    let count = 0;
    let timer = Symbol("timer");
    if(timeOut > 0) {
        timer = setTimeout(countDownStart, interval);
    } else {
        callback(timeOut);
    }
    function countDownStart() {
    	count++;
    	let offset = new Date().getTime() - (startTime + count * interval);
    	let nextTime = interval - offset;
    	if(nextTime < 0) { 
            nextTime = 0 
    	}
    	timeOut -= interval/1000;
    	callback(timeOut);
    	if(timeOut <= 0) {
            clearTimeout(timer);
    	} else {
            timer = setTimeout(countDownStart, nextTime);
    	}
    }
}
```
