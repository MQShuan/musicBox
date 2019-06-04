// pages/audioPlayer/audioPlayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataId:'',
    songName:'',
    authorName:'',
    currentMusicUrl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataId:options.id,
      songName:options.songName,
      authorName:options.authorName,
    })
    wx.request({
      url: 'http://localhost:3000/song/url?id='+options.id,
      success:(res)=>{
        console.log(res.data);
        this.setData({
          currentMusicUrl:res.data.data[0].url,
        })
      }
    })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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