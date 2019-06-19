// pages/videoPlayer/videoPlayer.js
const md5 = require('../../utils/md5.js')
const reg = /^[0-9]+.?[0-9]*$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoInfo:'',
    videoUrl:'',
    relatedVideo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (reg.test(options.vid)){
      this.getMvDetail(options);
    }else{
      this.getVideoDetail(options);
    }
  },

  mvComment:function(){
    let imageUrl = encodeURIComponent(this.data.videoInfo.cover)
    wx.navigateTo({
      url: '../comment/comment?type=mv&id=' + this.data.videoInfo.id + '&imageUrl=' + imageUrl + '&name=' +this.data.videoInfo.name,
    })
  },
  getMvDetail: function (options){
    wx.request({
      url: 'http://localhost:3000/mv/detail?mvid=' + options.vid,//获取MV详情
      success: (res) => {
        console.log(res.data);
        this.setData({
          videoInfo: res.data.data,
        })
      }
    });
    wx.request({
      url: 'http://localhost:3000/mv/url?id=' + options.vid,//获取MV播放URL
      success: (res) => {
        this.setData({
          videoUrl: res.data.data.url,
        })
      }
    })
    wx.request({//获取MV相关视频
      url: 'http://localhost:3000/related/allvideo?id=' + options.vid,
      success: (res) => {
        this.setData({
          relatedVideo:res.data.data,
        })
        console.log(res.data);
      }
    })
  },
  getVideoDetail: function (options){
    wx.request({
      url: 'http://localhost:3000/video/detail?id=' + options.vid,
      success:(res)=>{
        console.log(res.data);
        let video = this.handleVideoDetail(res.data.data)
        console.log(video);
        this.setData({
          videoInfo: video,
        })
      }
    })
    wx.request({
      url: 'http://localhost:3000/video/url?id=' + options.vid,
      success:(res)=>{
        console.log(res.data)
        this.setData({
          videoUrl: res.data.urls[0].url,
        })
      }
    })
    wx.request({
      url: 'http://localhost:3000/related/allvideo?id=' + options.vid,
      success:(res)=>{
        this.setData({
          relatedVideo: res.data.data,
        })
      }
    })
  },
  relatedVideo:function(e){
    console.log(e);
    wx.navigateTo({
      url: 'videoPlayer?vid=' + e.currentTarget.dataset.vid ,
    })
  },
  handleVideoDetail:function(data){//对视频详情获取的数据进行处理
    data.name = data.title;
    data.playCount = data.playTime;
    data.likeCount = data.praisedCount;
    data.subCount = data.subscribeCount;
    return data;
  },
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