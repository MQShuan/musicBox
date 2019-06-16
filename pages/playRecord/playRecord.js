// pages/playRecord/playRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:3000/user/record/?uid='+ wx.getStorageSync('uid') + '&type=0',
      success:(res)=>{
        res.data.allData.map(i => {
          let arName = '';
          i.songName = i.song.tns ? i.song.name + '(' + i.song.tns + ')' : i.song.name;
          for (let j = 0; j < i.song.ar.length; j++) {//对ar数组处理，提取其中的ar.name
            arName = arName + i.song.ar[j].name;
            if (j + 1 < i.song.ar.length) {
              arName = arName + '/'
            }
          }
          i.authorName = arName + '-' + i.song.al.name;
          i.rowType = 'song';
        })
        this.setData({
          songList:res.data.allData,
        })
        console.log(res.data);
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