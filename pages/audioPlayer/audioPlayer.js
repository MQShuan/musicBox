Page({
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
    playMode:'list',
    showSongList:false,
    songListHeight:'',
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
          songListHeight: res.windowHeight/2,
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
  changeSong:function(changeType){//切换歌曲处理
    let currentSongIndex = this.data.currentSongIndex;
    if(this.data.playMode === 'list'){
      if (changeType === 'pre') {
        currentSongIndex - 1 < 0 ? currentSongIndex = this.data.songList.length - 1 : currentSongIndex = currentSongIndex - 1;
        this.setData({
          currentSongIndex: currentSongIndex,
        })
      } else if (changeType === 'next') {
        currentSongIndex + 1 > this.data.songList.length ? currentSongIndex = 0 : currentSongIndex = currentSongIndex + 1;
        this.setData({
          currentSongIndex: currentSongIndex,
        })
      }
    }
    else if(this.data.playMode === 'random'){
      currentSongIndex = Math.floor(Math.random() * this.data.songList.length );
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
  createBackgroundAudio: function () {//创建播放实例，监控播放状态，获取歌词，播放进度，播放时间以及歌词，支持歌词滚动
    wx.playBackgroundAudio({
      dataUrl: this.data.currentMusicUrl,
    })
    wx.onBackgroundAudioStop(() => {
        this.nextSong()
    })
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        playState:true,
      })
    })
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        playState:false,
      })
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
  getSliderNow: function (audio) {//即时播放时间转换为slider进度
    let sliderNow = audio.currentTime / audio.duration * 200;
    this.setData({
      sliderDuration: sliderNow,
    });
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
  getLyric: function () {//获取歌词，存在歌词翻译时添加上歌词翻译
    let musiclyric = '';
    let musicTlyric = '';
    wx.request({
      url: 'http://localhost:3000/lyric?id=' + this.data.musicId,
      success: (res) => {
        if (res.data.lrc.lyric){
            musiclyric = this.handleLyric(res.data.lrc.lyric);
            if (res.data.tlyric.lyric) {
              musicTlyric = this.handleLyric(res.data.tlyric.lyric);
              for (let i = 0; i < musiclyric.length; i++) {
                for (let j = 0; j < musicTlyric.length; j++) {
                  if (musiclyric[i][0] == musicTlyric[j][0]) {
                    musiclyric[i][3] = musicTlyric[j][1];
                  }
                }
              }
            }
        }
        musiclyric[0] = '';
        this.setData({
          musiclyric:musiclyric,
        })
      }
    })
  },
  handleLyric: function (lyric) {//获取歌词对歌词进行正则处理
    lyric = lyric.split('[');
    for (let i = 0; i < lyric.length; i++) {
      lyric[i] = lyric[i].split(']');
      if (lyric[i].length > 1) {
        lyric[i][0] = lyric[i][0].substring(0, 5);
        lyric[i][1] = lyric[i][1].replace("↵", "");
        lyric[i][2] = i;
      }
    }
    return lyric;
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
  },
  changePlayMode: function () {//修改播放模式
    if(this.data.playMode === 'list'){
      this.setData({
        playMode:'random'
      })
    }else{
      this.setData({
        playMode:'list',
      })
    }
  },
  showSongListModal:function(){
    this.setData({
      showSongList:true,
    })
  },
  playSong:function(e){
    console.log(e);
    this.setData({
      musicId:e.currentTarget.dataset.id,
    })
    this.getMusicDetail();
    this.getLyric();
  },
})