Component({
  data: {
    _pageName: '',
  },
  methods: {
    toClassify(){
      wx.switchTab({
        url: '/pages/classify/classify',
      })
    },
    toTip(){
      wx.switchTab({
        url: '/pages/tip/tip',
      })
    },
    toIndex(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
})