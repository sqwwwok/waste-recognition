Component({
  properties: {
    pageName: {type: String}
  },
  data: {
    _pageName: '',
  },
  lifetimes: {
    attached(){
      var _pageName = this.properties.pageName;
      if(_pageName) this.getTabBar().setData({_pageName});
    }
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