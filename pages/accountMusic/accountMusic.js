Component({
  properties:{},
  data: {
    songList:true,
    playList:'',
    userName:'',
    avatarUrl:'',
  },
  
  lifetimes:{
    attached:function(){
      wx.request({
        method: "get",
        url: 'http://localhost:3000/user/playlist?uid=' + Number(wx.getStorageSync('uid')),
        success:(res)=>{
          this.setData({
            playList:res.data.playlist,
          })
          console.log(this.data.playList);
        },
      });
      let userData = JSON.parse(wx.getStorageSync('userData'));
      console.log(userData);
      this.setData({
        userName:userData.profile.nickname,
        avatarUrl:userData.profile.avatarUrl,
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