Component({
  properties:{},
  data: {
    songList:true,
    playList:'',
  },
  
  lifetimes:{
    attached:function(){
      wx.request({
        method: "get",
        url: 'http://localhost:3000/user/playlist' + '?uid=' + Number(wx.getStorageSync('uid')),
        success:(res)=>{
          this.setData({
            playList:res.data.playlist,
          })
          console.log(this.data.playList);
        },
      })
    }
  },
  methods: {
    showSongList(e) {
      this.setData({
        songList: !this.data.songList,
      })
    },
  },
})