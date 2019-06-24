Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId:'',
    songName:'',
    authorName:'',
    currentMusicUrl:'',
    playState: true,
    showLyric: false,
    sliderDuration: 0,
    currentMin: 0,
    currentSec: 0,
    formatDuration: 0,
    duration: 0,
    musiclyric: '',
    scrollHeight: '',
    currentLyric: 0,
    currentLyricScrollToRow: -1,
    coverImageUrl: '',
    widowWidth: '',
    currentSongIndex:'',
    songList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({//获取屏幕宽高动态设置歌词滚动框高度以及播放转盘宽高
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight - 150,
          windowWidth: res.windowWidth - 100,
        })
      },
    })
    this.setData({
      musicId:options.id,
      currentSongIndex:options.index,
      songList:wx.getStorageSync('songList'),
    })
    console.log(this.data.songList);
    this.getMusicDetail();
    this.getLyric();
    /* wx.request({
      url: 'http://localhost:3000/song/detail?ids=' + options.id,
      success: (res) => {
        console.log(res.data);
        this.setData({
          currentMusicUrl: res.data.data[0].url,
        })
      }
    }) */
  },
  back:function(e){
    wx.navigateBack({
      
    })
  },
  loadSong:function(){//通过Index加载歌曲
    this.setData({
      songList: wx.getStorageSync('songList'),
      musicId:this.data.songList[this.data.currentSongIndex].id,
    })
    this.getMusicDetail();
    this.getLyric();
  },
  changeSong:function(tapType){//切换歌曲处理
    let currentSongIndex = this.data.currentSongIndex;
    if(tapType === 'pre'){
      currentSongIndex - 1 < 0 ?currentSongIndex = this.data.songList.length - 1:currentSongIndex = currentSongIndex - 1;
      this.setData({
        currentSongIndex:currentSongIndex,
      })
    }else if(tapType === 'next'){
      currentSongIndex + 1 > this.data.songList.length ? currentSongIndex = 0:currentSongIndex = currentSongIndex + 1;
      this.setData({
        currentSongIndex:currentSongIndex,
      })
    }
  },
  nextSong:function(){//切换到下一首歌曲
    this.changeSong('next');
    this.loadSong();
  },
  preSong:function(){//切换到上一首歌曲
    this.changeSong('pre');
    this.loadSong();
  },
  getMusicDetail:function(){
    wx.request({
      url: 'http://localhost:3000/song/detail?ids=' + this.data.musicId,
      success:(res)=>{
        let songDetail = res.data.songs[0];
        let arName = '';
        songDetail.songName = songDetail.tns ? songDetail.name + '(' + songDetail.tns + ')' : songDetail.name;
        for (let j = 0; j < songDetail.ar.length; j++) {//对ar数组处理，提取其中的ar.name
          arName = arName + songDetail.ar[j].name;
          if (j + 1 < songDetail.ar.length) {
            arName = arName + '/'
          }
        }
        songDetail.authorName = arName + '-' + songDetail.al.name;
        console.log(songDetail);
        this.setData({
          coverImageUrl: songDetail.al.picUrl,
          songName: songDetail.songName,
          authorName: songDetail.authorName,
        })
      }
    })
    wx.request({
      url: 'http://localhost:3000/song/url?id=' + this.data.musicId,
      success: (res) => {
        this.setData({
          currentMusicUrl: res.data.data[0].url,
        })
        this.createBackgroundAudio();
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  createBackgroundAudio: function () {//创建播放实例，获取歌词，播放进度，播放时间以及歌词，支持歌词滚动
    console.log(this.data.currentMusicUrl);
    wx.playBackgroundAudio({
      dataUrl: this.data.currentMusicUrl,
    })
    this.audio = wx.getBackgroundAudioManager();
    this.audio.onTimeUpdate((res) => {
      this.getAudioDuration(this.audio);
      this.getCurrentDuration(this.audio);
      this.getSliderNow(this.audio);
      this.lyricScroll();
    })
  },
  getAudioDuration: function (audio) {
    let durationMin, durationSec;//初始化显示duration
    durationMin = (audio.duration / 60 - audio.duration % 60 / 60).toFixed(0);
    durationSec = (audio.duration % 60).toFixed(0);
    this.setData({
      formatDuration: durationMin + ':' + durationSec,
      duration: audio.duration,
    })
  },
  audioState: function () {
    if (this.data.playState) {
      this.audio.pause();
    }
    else {
      this.audio.play();
    }
    this.setData({
      playState: !this.data.playState,
    });
  },
  audioStop: function () {
    this.audio.stop();
    this.setData({
      playState: false,
    });
  },
  getSliderNow: function (audio) {//即时播放时间转换为slider进度
    let sliderNow = audio.currentTime / audio.duration * 200;
    this.setData({
      sliderDuration: sliderNow,
    });
    console.log(sliderNow);
  },
  getCurrentDuration: function (audio) {//转换currentTime为分秒显示
    let min;
    if (audio.currentTime > 60) {
      min = (audio.currentTime / 60 - audio.currentTime % 60 / 60).toFixed(0) < 10
        ? '0' + (audio.currentTime / 60 - audio.currentTime % 60 / 60).toFixed(0)
        : (audio.currentTime / 60 - audio.currentTime % 60 / 60).toFixed(0);
    } else {
      min = '00';
    }
    let sec = audio.currentTime % 60 < 10
      ? '0' + (audio.currentTime % 60).toFixed(0)
      : (audio.currentTime % 60).toFixed(0);
    this.setData({
      currentMin: min,
      currentSec: sec,
    })
  },
  getLyric: function () {//获取歌词对歌词进行正则处理
    let musiclyric = '';
    wx.request({
      url: 'http://localhost:3000/lyric?id=' + this.data.musicId,
      success: (res) => {
        musiclyric = res.data.lrc.lyric.split('[');
        for (let i = 0; i < musiclyric.length; i++) {
          musiclyric[i] = musiclyric[i].split(']');
          if (musiclyric[i].length > 1) {
            musiclyric[i][0] = musiclyric[i][0].substring(0, 5);
            musiclyric[i][1] = musiclyric[i][1].replace("↵", "");
            musiclyric[i][2] = i;
          }
        }
        this.setData({
          musiclyric: musiclyric,
        })
        console.log(musiclyric);
      }
    })
  },
  lyricScroll: function () {//歌词滚动
    let currentTime = this.data.currentMin + ':' + this.data.currentSec;
    for (let i = 0; i < this.data.musiclyric.length; i++) {
      if (this.data.musiclyric[i][0] === currentTime) {
        this.setData({
          currentLyric: this.data.musiclyric[i][2],
        })
      }
      let currentLyricScrollRow = this.data.currentLyric - 4;
      if (this.data.currentLyric > 4 && currentLyricScrollRow !== this.data.currentLyricScrollToRow) {
        this.setData({
          currentLyricScrollToRow: currentLyricScrollRow
        })
      }
    }
  },
  changeDuration: function (e) {//修改播放进度
    let currentDuartion = e.detail.value / 200 * this.data.duration;
    this.setData({
      sliderDuration: e.detail.value,
    })
    this.audio.seek(currentDuartion);
    if (!this.data.playState) {
      //this.audio.play();
      this.setData({
        playState: true,
      })
    }
  },
  changeShowLyric: function (e) {//歌词显示状态
    this.setData({
      showLyric: !this.data.showLyric,
    })
  }
})