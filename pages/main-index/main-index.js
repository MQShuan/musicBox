// pages/main-index/main-index.js
Component({
  lifetimes:{
    ready:function(){
      wx.request({
        url: 'http://localhost:3000/banner?type=1',
        success:(res)=>{
          this.setData({
            bannerData:res.data.banners,
          })
          console.log(this.data.bannerData)
        }
      })
    }
  },
  properties: {

  },

  
  data: {
    selectTab:0,
    bannerData:'',
  },

 
  methods: {
    bannerTap:function(e){
      console.log(e.target.dataset.url);
    },
    selectRecommend:function(event){
      this.setData({
        selectTab:0,
      })
    },
    selectFriend: function (event) {
      this.setData({
        selectTab: 1,
      })
    },
    selectFm: function (event) {
      this.setData({
        selectTab: 2,
      })
    }
  }
})
