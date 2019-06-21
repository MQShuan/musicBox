// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    hotSearch:'',
    showSearchResult:false,
    resultList:'',
    searchSuggestKeyword:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:3000/search/hot',
      success:(res)=>{
        this.setData({
          hotSearch:res.data.result.hots,
        })
        console.log(res.data);
      }
    })
  },


  onReady: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  search:function(e){
    wx.request({
      url: 'http://localhost:3000/search?keywords=' + this.data.inputValue,
      success:(res)=>{
        res.data.result.songs.map(i => {
          let arName = '';
          i.songName = i.name;
          for (let j = 0; j < i.artists.length; j++) {//对ar数组处理，提取其中的ar.name
            arName = arName + i.artists[j].name;
            if (j + 1 < i.artists.length) {
              arName = arName + '/'
            }
          }
          i.authorName = arName + '-' + i.album.name;
          i.rowType = 'song';
        });
        this.setData({
          resultList:res.data.result.songs,
          showSearchResult:true,
          showSuggest: false,
        })
        console.log(res.data)
      }
    })
  },
  inputKeywords:function(e){
    this.setData({
      inputValue:e.detail.value,
    });
    if(this.data.inputValue){
      wx.request({
        url: 'http://localhost:3000/search/suggest?keywords=' + this.data.inputValue + '&type=mobile',
        success: (res) => {
          console.log(res.data.result);
          if (res.data.result.allMatch){
            this.setData({
              searchSuggestKeyword: res.data.result.allMatch,
              showSuggest: true,
            })
          }else{
            this.setData({
              showSuggest: false,
            })
          }
        }
      })
    }else{
      this.setData({
        showSuggest:false,
      })
    }
  },
  inputButtonSearch:function(e){
    this.setData({
      inputValue:e.target.dataset.value,
    })
    this.search();
  },
  clear:function(){
    this.setData({
      inputValue:'',
      showSuggest:false,
    })
  }
})