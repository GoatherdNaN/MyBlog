
```
//获取自定义属性(保存对象需要先将对象序列化，再在获取时反序列化一下
var tree = document.getElementById("tree");
//getAttribute()取值属性
console.log(tree.getAttribute("data-leaves"));

//对象的序列化（对->字）
var str = JSON.stringify(jsObj);  

//对象的反序列化（字->对）
var str1 = JSON.parse(str);

//删除数组中为指定值的项
const removeByValue = (arr, val) => {
    if(arr.indexOf(val)<0) {
    	return
    }
    let _index = arr.findIndex(item=>item == val);
    arr.splice(_index,1);
    removeByValue(arr, val);
}

//通过某天获取其所在周
const getCurrentWeek=date=>{
	if(!/^(\d{4})\-(\d{1,2})\-(\d{1,2})$/.test(date)){
	    alert('请传入一个yyyy-MM-dd格式的时间');
            return;
        }
	let w = new Date(date.replace(/-/, "/")).getDay();
	let n = (w == 0 ? 7 : w) - 1;
	let weekObj = {};
	weekObj.weekFirstDay = new Date(new Date(date.replace(/-/, "/")).getTime() + 24*(-n)*60*60*1000).toLocaleDateString().replace(/\//g,'-'); 
	weekObj.weekLastDay = new Date(new Date(weekObj.weekFirstDay.replace(/-/, "/")).getTime() + 24*6*60*60*1000).toLocaleDateString().replace(/\//g,'-'); 
	return weekObj;
}

//通过某天获取其所在月
const getCurrentMonth = date => {
	if(!/^(\d{4})\-(\d{1,2})\-(\d{1,2})$/.test(date)){
    	    alert('请传入一个yyyy-MM-dd格式的时间');
    	    return;
        }
        let month=new Date(date.replace(/-/, "/")).getMonth()+1;
        let year=new Date(date.replace(/-/, "/")).getFullYear();
        let new_year = year;
        let new_month = month++;
        if(month>12) {
            new_month -= 12;
            new_year++;
        }
        let monthFirstDay = new Date(new_year,new_month,1);
        let monthLastDay=(new Date(monthFirstDay.getTime()-1000*60*60*24)).getDate();
        let monthObj={};
        monthObj.monthFirstDay=year+'-'+(month-1)+'-'+1;
        monthObj.monthLastDay=year+'-'+(month-1)+'-'+monthLastDay;
        return monthObj;
};
//将复杂对象转换为字符串(貌似没这么麻烦，直接序列化JSON即可)
const objectToString = obj => {
    let r = [];
    if(typeof  obj == "string") {
    	return "\"" +  obj.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    }
    if(typeof  obj == "object") {
    	if(! obj.sort) {
            for(let i in  obj) {
            	r.push(i + ":" +  objectToString( obj[i]));
            }
            if(!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test( obj.toString)) {
            	r.push("toString:" +  obj.toString.toString());
            }
            r = "{" + r.join() + "}";
    	} else {
            for(let i = 0; i <  obj.length; i++) {
            	r.push( objectToString( obj[i]))
            }
            r = "[" + r.join() + "]";
    	}
    	return r;
    }
    return obj.toString();
}
/**
 * [获取时间语句]
 * @param  {[string]}   dateStr   eg. 2017-09-01 15:23:00
 */
const getDateDiff = dateStr => {
    const now = new Date().getTime() / 1000,
    	  dateTimeStamp = new Date(dateStr.substring(0, 19).replace(/-/g, '/')).getTime() / 1000;
    const diffValue = now - dateTimeStamp;
    const timeScale = ['year', 'month', 'week', 'day', 'hour', 'minute'],
    	  timeExt = ['年前', '月前', '周前', '天前', '小时前', '分钟前'],
    	  dateRule = {
             minute: 60,
             hour: 60 * 60,
             day: 60 * 60 * 24,
             week: 60 * 60 * 24 * 7,
             month: 60 * 60 * 24 * 30,
             year: 60 * 60 * 24 * 30 * 12
    	   };
    	
    if(diffValue < 0) return;
    for(let i = 0, len = timeScale.length; i < len; i++) {
        let timeDif = Math.floor(diffValue / dateRule[timeScale[i]]);
        if(timeDif >= 1) {
            return `${+timeDif}${timeExt[i]}`
        }
    }
    return '刚刚'
};
/**
 * 检测浏览器是否支持某个css属性
 *prop [css属性名] | value [css属性值]
 */
const cssSupported = (prop, value) => {
  const d = document.createElement('div')
  d.style[prop] = value
  return d.style[prop] === value
}
/**
 * 将数组切成一个个小数组
 * @param  {[原数组]}                arr
 * @param  {切割小数组的长度}         [len=4]
 * @return {[由小数组组成的新数组]}   result
 */
const splitArray = (arr,len=4) => {
  let _len = arr.length;
  const result = [];
  for(let i = 0; i<_len;i += len) {
    result.push(arr.slice(i,i+len));
  }
  return result
}
//生成指定长度的随机数字字母字符串
const getRandomStr = len => {
    let str = "";
    for(; str.length < len; str += Math.random().toString(36).substr(2));
    return str.substr(0, len);
}
```
