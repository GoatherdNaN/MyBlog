
```
/**
 * Created by edlan on 2017/8/29.
 * 滚动信息插件
 * 使用：
 *  1、定义children组件
 *   function ChildrenName(props) {
 *     let {key, item} = props;
 *     return (
 *       ...your children component
 *     )
 *   }
 *  2、嵌套调用
 *   <RollNotice data={your_data} destination={lineHeight}>
 *     <ChildrenName (need_props)/>
 *   </RollNotice>
 */
import React                      from 'react';
import Component                  from 'modules/Common/GetComponent';
import rAF                        from 'utils/rAF';
import {getVisibilityChangeName}  from 'utils/common';
const addCopyItem = (arr,num,flag) => {
  if(flag) {
    return [...arr,...arr.slice(0,num)]
  }
  return arr
}
const visibilityChangeName = getVisibilityChangeName();
export default class RollNotice extends Component{
    constructor(props){
      super(props)
      this.index = 0;
      this.isAnimate = false;
      this.countHeight = 0
    }
    state = {
      noticePosition: 0 // 列表位置
    }
    componentDidMount() {
      let {linage, data, destination} = this.props;
      this.mounted = true;  //组件销毁的状态，防止组件销毁后存在异步的setState调用
      this.RollNoticeBox = this.refs.RollNoticeBox;
      this.childArr = this.RollNoticeBox.childNodes;//所有子组件列表
      this.destination = this.childArr[0].offsetHeight;
      for(let i = 0,len = data.length;i < len; i++) {
        this.countHeight += this.childArr[i].offsetHeight;
      }
      if(this.countHeight > destination*linage) {
        this.isAnimate = true;
        this.compute();
      }
      visibilityChangeName && window.addEventListener(visibilityChangeName,this.handleVisibilityChange);
    }
    componentWillUpdate() {
      let {linage, destination} = this.props;
      if(this.countHeight > destination*linage) {
        this.isAnimate = true;
        this.clearIT();
        this.compute();
      } else {
        this.isAnimate = false;
        this.clearIT();
      }
    }
    componentWillUnmount() {
      this.clearIT();

      this.mounted = false;

      visibilityChangeName && window.removeEventListener(visibilityChangeName,this.handleVisibilityChange);
    }
    handleVisibilityChange = () => {
      if(document.visibilityState=='hidden') { //状态判断
        this.clearIT();
      }else {
        this.isAnimate && this.compute();
      }
    }
    clearIT = () => {
      this.timer && window.clearInterval(this.timer);
      this.timer = null;
    }
    compute = () => {
      let {noticePosition} = this.state, {data} = this.props;
      this.timer = setInterval(() => {
        if (this.index < data.length) {
          this.move(this.destination, 400);
          this.destination += this.childArr[this.index + 1].offsetHeight;
          this.index += 1;
        } else {
          // 列表到底,设置列表为开始位置
          this.mounted&&this.setState({noticePosition:0},()=>{
            this.index = 1;
            this.destination = this.childArr[0].offsetHeight;
            this.move(this.destination, 400);
            this.destination += this.childArr[1].offsetHeight;
          })
        }
      }, 2500)
    }
    // 实现滚动动画
    move = (destination, duration) => {
      let {noticePosition} = this.state;
      let speed = ((destination - noticePosition) * 1000) / (duration * 60),
          count = 0;
      const step = () => {
        noticePosition += speed;
        this.mounted&&this.setState({
          noticePosition
        })
        count++;
        rAF(() => {
          if (noticePosition < destination) {
            step()
          } else {
            this.mounted&&this.setState({
              noticePosition : destination
            })
          }
        })
      }
      step()
    }
    handleMouse = (e,flag) => {
        flag&&this.isAnimate&&this.compute();
        !flag&&this.clearIT();
    }
    render(){
      let {noticePosition} = this.state,{destination,linage,data} = this.props;
      const style = {
        transform: `translateY(-${noticePosition}px)`,
         msTransform: `translateY(-${noticePosition}px)`
      };
      return(
        <div
          onMouseEnter={e=>this.handleMouse(e,0)}
          onMouseLeave={e=>this.handleMouse(e,1)}
          style={{
            height: destination*linage,
            overflow: 'hidden',
            verticalAlign: 'middle'
          }}
        >
          <div style={style} ref='RollNoticeBox'>
            {
              data.length?addCopyItem(data,linage,this.isAnimate).map((item,index)=>{
                    let props = item?{item}:{}
                    return React.cloneElement(this.props.children, {
                      key: `rollnotice_${index}`,
                      ...props
                    })
                }):this.props.children
            }
          </div>
        </div>
      )
    }
  }
  RollNotice.propTypes = {
    destination: React.PropTypes.number,//每行行高
    linage: React.PropTypes.number,     //显示条数
    data: React.PropTypes.array
  };
  RollNotice.defaultProps = {
    destination:30,
    linage:10,
    data: []
  };



```
###### rAf.js

```
module.exports = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) { window.setTimeout(callback, 1000 / 60) }

```
###### GetCommponent.js

```
import React from 'react';
import {is, fromJS} from 'immutable';

export default class Component extends React.Component{
  shouldcomponentupdate = (nextProps, nextState) => {
    return !(this.props === nextProps || is(fromJS(this.props), fromJS(nextProps))) ||
      !(this.state === nextState || is(fromJS(this.state), fromJS(nextState)));
  }
}

