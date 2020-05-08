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
    toIndex(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
})