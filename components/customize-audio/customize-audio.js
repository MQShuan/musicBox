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
    musicId:{
      type:Number,
      value:'',
    },
    coverImageUrl:{
      type:String,
      value:'',
    }
  },
  data: {
    playState: true,
    showLyric:false,
    sliderDuration: 0,
    currentMin: 0,
    currentSec: 0,
    duration: 0,
    musiclyric:'',
    scrollHeight:'',
    currentLyric:0,
    currentLyricScrollToRow:-1,
    coverImageUrl:'',
    widowWidth:'',
  },
  //生命周期
  lifetimes:{
    create:function(){
      
    },
    ready:function(){
      wx.getSystemInfo({
        success:(res)=>{
          this.setData({
            scrollHeight: res.windowHeight-150,
            windowWidth: res.windowWidth-100,
          })
        },
      })
      console.log(this.data.coverImageUrl);
      this.audioManage = wx.createInnerAudioContext();//创建audio实例
      this.audioManage.src = this.data.musicSrc;
      this.audioManage.autoplay = true;
      this.audioManage.onPlay(()=>{
        setTimeout(() => {//获取歌曲的总时长duration
          this.audioManage.duration;
          let durationMin, durationSec;//初始化显示duration
          durationMin = (this.audioManage.duration / 60 - this.audioManage.duration % 60 / 60).toFixed(0);
          durationSec = (this.audioManage.duration % 60).toFixed(0);
          this.setData({
            duration: durationMin + ':' + durationSec,
          })
          this.audioManage.currentTime;
          console.log(this.audioManage.duration);
          console.log(this.audioManage.currentTime);
        }, 100);
      });
      this.getLyric();
      this.audioManage.onTimeUpdate((res) => {//音乐播放进度改变时绑定的事件
        this.getCurrentDuration();
        this.getSliderNow();
        this.lyricScroll();
      });
    },
    detached: function () {
      this.audioManage.destroy();
    },
  },

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
    getSliderNow: function () {//即时播放时间转换为slider进度
        let sliderNow = this.audioManage.currentTime / this.audioManage.duration * 200;
        this.setData({
          sliderDuration: sliderNow,
        });
        console.log(sliderNow);
      
    },
    getCurrentDuration: function () {//转换currentTime为分秒显示
      let min;
      if (this.audioManage.currentTime > 60) {
        min = (this.audioManage.currentTime / 60 - this.audioManage.currentTime % 60 / 60).toFixed(0) < 10
          ? '0' + (this.audioManage.currentTime / 60 - this.audioManage.currentTime % 60 / 60).toFixed(0)
          : (this.audioManage.currentTime / 60 - this.audioManage.currentTime % 60 / 60).toFixed(0);
      } else {
        min = '00';
      }
      let sec = this.audioManage.currentTime % 60 < 10
        ? '0' + (this.audioManage.currentTime % 60).toFixed(0)
        : (this.audioManage.currentTime % 60).toFixed(0); 
      this.setData({
        currentMin: min,
        currentSec: sec,
      })
    },
    getLyric:function(){//获取歌词对歌词进行正则处理
      let musiclyric = '';
      wx.request({
        url: 'http://localhost:3000/lyric?id=' + this.data.musicId,
        success: (res) => {
          musiclyric = res.data.lrc.lyric.split('[');
          for(let i = 0;i<musiclyric.length;i++){
            musiclyric[i] = musiclyric[i].split(']');
            if (musiclyric[i].length>1){
              musiclyric[i][0] = musiclyric[i][0].substring(0,5);
              musiclyric[i][1] = musiclyric[i][1].replace("↵","");
              musiclyric[i][2] = i;
            }
          }
          this.setData({
            musiclyric:musiclyric,
          })
          console.log(musiclyric);
        }
      })
    },
    lyricScroll:function(){//歌词滚动
      let currentTime = this.data.currentMin + ':' + this.data.currentSec;
      for(let i = 0;i<this.data.musiclyric.length;i++){
        if (this.data.musiclyric[i][0] === currentTime){
          this.setData({
            currentLyric: this.data.musiclyric[i][2],
          })
        }
        let currentLyricScrollRow = this.data.currentLyric-4; 
        if (this.data.currentLyric > 4 && currentLyricScrollRow !== this.data.currentLyricScrollToRow){
          this.setData({
            currentLyricScrollToRow:currentLyricScrollRow
          })
        }
      }
    },
    changeDuration:function(e){
      let currentDuartion = e.detail.value/200 * this.audioManage.duration;
      this.setData({
        sliderDuration: e.detail.value,
      })
      this.audioManage.seek(currentDuartion);
      if(!this.data.playState){
        this.audioManage.play();
        this.setData({
          playState:true,
        })
      }
    },
    changeShowLyric:function(e){
      this.setData({
        showLyric:!this.data.showLyric,
      })
    }
  }
})
