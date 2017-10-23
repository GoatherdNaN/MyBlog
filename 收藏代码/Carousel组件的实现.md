
```
/**
 * Created by edlan on 2017/9/6.
 * 淡入淡出轮播组件
 */
import React                      from 'react';
import Component                  from 'modules/Common/GetComponent';
import rAF                        from 'utils/rAF';
import {getVisibilityChangeName}  from 'utils/common';
import styles                     from './index.less';
const visibilityChangeName = getVisibilityChangeName();
export default class Carousel extends Component{
  constructor(props){
      super(props)
      this.isNeedAnimate = true;
  }
  state = {
    activeIndex: 0,//当前索引
    opacity:1,//当前幻灯片的透明度
    isFinished:false,//淡出动画是否完成
    isBeforeAnimation:false,//开始动画前标识
    isEnter:false,//鼠标是否移入
    preModel:false //往前翻模式
  }
  componentDidMount(){
    if(this.props.data.length < 2) {
      this.isNeedAnimate = false;
    }
    this.mounted = true;
    if(this.isNeedAnimate) {
      this.timer = setInterval(this.slide, 3000);
      visibilityChangeName && window.addEventListener(visibilityChangeName,this.handleVisibilityChange);
    }
  }
  componentWillUnmount(){
    this.mounted = false;
    this.clearIT();
    if(this.isNeedAnimate) {
      visibilityChangeName && window.removeEventListener(visibilityChangeName,this.handleVisibilityChange);
    }
  }
  clearIT = () => {
    this.timer && clearInterval(this.timer);
    this.timer = 0;
  }
  //视图离开当前标签页时，清除定时器
  handleVisibilityChange = () => {
    if(document.visibilityState=='hidden') { //状态判断
      this.clearIT();
    } else {
      this.timer = setInterval(this.slide, 3000);
    }
  }
  //计算下一个
  slide = () => {
    let {data} = this.props, {activeIndex,preModel} = this.state;
    let next = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
    preModel && (next = activeIndex === 0 ? data.length - 1 : activeIndex - 1);
    this.setState({
      isBeforeAnimation:true,
      isFinished:false
    },()=>{
      this.fadeOut(400,next);
    })
  }
  //淡出逻辑
  fadeOut = (duration,next) => {
    let {opacity} = this.state;
    let speed = ((1 * 1000) / (duration * 60));
    const step = () => {
      opacity -= speed;
      this.mounted&&this.setState({
        opacity
      })
      rAF(() => {
        if (0 < opacity) {
          step();
        } else {
          this.mounted&&this.setState({
            isBeforeAnimation:false,
            isFinished:true,
            activeIndex:next,
            opacity : 1,
            preModel: false
          },()=>{
            (!this.timer) && (this.timer = setInterval(this.slide, 3000))
          })
        }
      })
    }
    step();
  }
  //小圆点逻辑
  handleDots = (e,index) => {
    if(!this.isNeedAnimate) {
      return
    }
    this.setState({
      activeIndex:index,
      opacity:1
    },()=>{
      this.clearIT();
      this.timer = setInterval(this.slide, 3000);
    })
  }
  //左右按钮逻辑
  preOrNext = (e,flag) => {
    let {activeIndex} = this.state,
        {data} = this.props,
        preModel = flag;
    this.clearIT();
    this.setState({preModel},()=>{
      this.slide();
    })
  }
  //鼠标移入移出，控制左右按钮的显示与隐藏
  handleEnter = () => {
    if(!this.isNeedAnimate) {
      return
    }
    this.setState({
      isEnter:true
    })
    this.clearIT();
  }
  handleLeave = () => {
    if(!this.isNeedAnimate) {
      return
    }
    this.setState({
      isEnter:false
    })
    !this.timer && (this.timer = setInterval(this.slide, 3000));
  }
  // 幻灯片的DOM块
  getCarouselDom = () => {
    const {data} = this.props;
    let {activeIndex, opacity, isFinished, isBeforeAnimation, preModel} = this.state;
    if(data.length) {
      return data.map((item,index)=>{
        let props = item?{item}:{};
        let isActive = activeIndex === index;
        let next = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
        preModel && (next = activeIndex === 0 ? data.length - 1 : activeIndex - 1);
        let isNext = next === index;
        let style = {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'none',
          opacity: '1',
          zIndex: '1'
        };
        if(isActive) {
          style.display = 'block';
          style.zIndex = '5';
          style.opacity = `${opacity}`;
          style.filter = `alpha(opacity=${opacity*100+''})`;
        }
        if(isFinished && isActive) {
          style.zIndex = '1';
        }
        if(isBeforeAnimation && isNext) {
          style.display = 'block';
          style.zIndex = '4';
          style.opacity = '1';
        }
        return React.cloneElement(this.props.children, {
          key: `carousel_${index}`,
          style,
          ...props
        })
      })
    }
    return this.props.children;
  }

  render(){
    let {activeIndex, isEnter} = this.state;
    const {data, showBtn, btnPosition} = this.props;
    return (
      <div
        className={styles['carousel-container']}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        >
        <div className={styles['carousel-box']}>
          {this.getCarouselDom()}
        </div>
        <ul className={styles['dots-box']}>
          {
            data.length&&data.map((item,index)=>{
              let isActive = activeIndex < 0 ? (0 === index) : (activeIndex === index);
              return (
                <li
                  key={index}
                  className={isActive?styles.active:null}
                  onClick={e=>this.handleDots(e,index)}
                >
                </li>
              )
            })
          }
        </ul>
        {showBtn && this.isNeedAnimate && isEnter &&
          <div style={{width:1200,height:'100%',margin:'0 auto',position:'relative'}}>
            <button style={{left:btnPosition.left}} onClick={e=>this.preOrNext(e,true)}>
              <i className='iconfont icon-left'></i>
            </button>
            <button style={{right:btnPosition.right}} onClick={e=>this.preOrNext(e,false)}>
              <i className='iconfont icon-right'></i>
            </button>
          </div>
        }
      </div>
    )
  }
}
Carousel.propTypes = {
  data: React.PropTypes.array,
  showBtn: React.PropTypes.bool,
  btnPosition: React.PropTypes.object,
};
Carousel.defaultProps = {
  data: [],
  showBtn:true,
  btnPosition: {
    left:0,
    right:0
  }
};


```
getVisibilityChangeName方法
```
/**
 * [getVisibilityChangeName 获取visibilityChange实践兼容性事件名]
 */
export function getVisibilityChangeName(){
    if ('hidden' in document) return 'visibilitychange';
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document)
            return prefixes[i] + 'visibilitychange';
    }
    // otherwise it's not supported
    return null;
}
```

