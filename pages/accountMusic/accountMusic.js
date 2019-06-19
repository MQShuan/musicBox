Page({
  data: {
    songList:true,
    playList:'',
    userName:'',
    avatarUrl:'',
    visible:false,
  },
  onShow:function(){
    if(typeof this.getTabbar === 'function'&& this.getTabbar()){
      this.getTabbar().setData({
        selected:1,
      })
    }
  },
  onReady:function(){
    wx.request({
      url: 'http://localhost:3000/user/subcount',
      success:(res)=>{
        console.log(res.data);
      }
    })
    wx.request({
      method: "get",
      url: 'http://localhost:3000/user/playlist?uid=' + Number(wx.getStorageSync('uid')),
      success: (res) => {
        this.setData({
          playList: res.data.playlist,
        })
        console.log(this.data.playList);
      },
    });
    let userData = JSON.parse(wx.getStorageSync('userData'));
    console.log(userData);
    this.setData({
      userName: userData.profile.nickname,
      avatarUrl: userData.profile.avatarUrl,
    })
  },
  showSongList:function(e) {
    this.setData({
      songList: !this.data.songList,
    })
  },
  showModalEvent: function (e) {
    this.setData({
      visible: e.detail.rowState.modalvisible,
    })
    console.log(this.data.visible)
  },
  playRecordPage:function(){
    wx.navigateTo({
      url: '../playRecord/playRecord',
    })
  },
})