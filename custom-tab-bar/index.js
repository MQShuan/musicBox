Component({
  data: {
    selected: 0,
    color: "gray",
    selectedColor: "#fff",
    list: [{
      pagePath: "/pages/main-index/main-index",
      text: "iconfont icon-shipin icon"
    }, {
        pagePath: "/pages/accountMusic/accountMusic",
        text: "iconfont icon-yinle icon"
    }]
  },
  
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})