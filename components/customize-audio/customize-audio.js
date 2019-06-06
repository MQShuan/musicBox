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
      });
      setTimeout(() => {//获取歌曲的总时长duration
        this.audioManage.duration;
        this.audioManage.currentTime;
        console.log(this.audioManage.duration);
        console.log(this.audioManage.currentTime);
      }, 1000);
      this.audioManage.onPlay(() => {
        console.log('开始播放')
      })
      this.audioManage.onTimeUpdate(() => {
        let sliderNow = this.audioManage.currentTime / this.audioManage.duration * 100;
        this.setData({
          sliderDuration: sliderNow,
        });
        console.log(sliderNow);
      });

    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    playState:true,
    sliderDuration:0,
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
    changeDuration:function(e){
      let currentDuartion = e.detail.value/100 * this.audioManage.duration;
      this.setData({
        sliderDuration: e.detail.value,
      })
      this.audioManage.seek(currentDuartion);

    },
  }
})
