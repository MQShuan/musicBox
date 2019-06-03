// components/customize-audio/customize-audio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicSrc:{
      type:String,
      value:'',
    },
    duration:{
      type:String,
      value:"00:00"
    },
    musicName:{
      type:String,
      value:'',
    },
    musicSubName:{
      type:String,
      value:'',
    },
  },

  //生命周期
  lifetimes:{
    create:function(){
      
    },
    ready:function(){
      this.audioManage = wx.createInnerAudioContext();//创建audio实例
      this.audioManage.src = this.data.musicSrc;
      this.audioManage.autoplay = true;
      this.setData({
        duration:this.audioManage.duration,
      })
      console.log(this.audioManage.src);
      console.log(this.audioManage.duration)
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    playState:true,
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    audioState:function(){
      if(this.data.playState){
        this.audioManage.pause();
      }
      else{
        this.audioManage.play();
      }
      this.setData({
        playState:!this.data.playState,
      });
    },
    audioStop:function(){
      this.audioManage.stop();
      this.setData({
        playState:false,
      });
    },
  }
})
