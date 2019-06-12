// pages/playListPage/playListPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playListId:'',
    songList:'',
    songListDetail:'',
    visible:false,
  },
  showModalEvent: function (e) {
    this.setData({
      visible: e.detail.rowState.modalvisible,
      currentSelectSongId:e.detail.rowState.id,
    })
    console.log(e.detail)
  },
  songListComment:function(e){
    let type = 'playlist';
    let imageUrl = encodeURIComponent(this.data.songListDetail.coverImgUrl)
    wx.navigateTo({
      url: '../comment/comment?id=' + this.data.playListId + '&type=' + type + '&name=' + this.data.songListDetail.name 
                                    + '&imageUrl=' + imageUrl,
    })
  },
  delSong(){
    wx.request({
      method:'post',
      url: 'http://localhost:3000/playlist/tracks?op=del&pid=' + this.data.songListDetail.id + '&tracks=' + this.data.currentSelectSongId +'&timestamp=1560308702',
      success:(res)=>{
        console.log(res.data);
        if(res.code===200){
          wx.showToast({
            title: '网易云音乐小程序：删除成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      playListId: options.id,
    })
    wx.request({
      url: 'http://localhost:3000/playlist/detail?id='+options.id,
      success:(res)=>{
        res.data.playlist.tracks.map(i=>{
          let arName = '';
          i.songName = i.tns ? i.name + '(' + i.tns +')' : i.name;
          for(let j=0;j<i.ar.length;j++){//对ar数组处理，提取其中的ar.name
            arName = arName + i.ar[j].name;
            if(j+1<i.ar.length){
              arName = arName + '/'
            }
          }
          i.authorName = arName + '-' + i.al.name;
          i.rowType = 'song';
        })
        console.log(res.data.playlist);
        this.setData({
          songList:res.data.playlist.tracks,
          songListDetail:res.data.playlist,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})